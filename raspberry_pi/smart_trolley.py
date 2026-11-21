"""
ExpironGuard Smart Trolley System for Raspberry Pi 4
Compatible with:
- Raspberry Pi Camera Module (CSI) / USB Webcams
- Waveshare Displays (HDMI, DSI, or GPIO/SPI)
- ExpironGuard Cloud API: https://expironguard.onrender.com
"""

import sys
import time
import datetime
import requests
import json
import threading

# Try importing OpenCV and PyZbar for camera scanning
try:
    import cv2
    from pyzbar.pyzbar import decode as decode_qr
    CAMERA_AVAILABLE = True
except ImportError:
    CAMERA_AVAILABLE = False
    print("[WARN] OpenCV or pyzbar not installed. Running in manual/simulation mode.")

# Try importing pygame for the Waveshare display UI
try:
    import pygame
    PYGAME_AVAILABLE = True
except ImportError:
    PYGAME_AVAILABLE = False
    print("[WARN] pygame not installed. Will print output to console.")

API_BASE_URL = "https://expironguard.onrender.com"

class SmartTrolley:
    def __init__(self):
        self.cart_items = []
        self.last_scanned_code = None
        self.last_scan_time = 0
        self.current_product = None
        self.status_message = "Ready to scan product QR codes..."
        self.status_color = (16, 185, 129) # Emerald
        self.running = True

        # Initialize Pygame if available
        if PYGAME_AVAILABLE:
            pygame.init()
            pygame.font.init()
            # Try 800x480 (standard Waveshare resolution), or auto-detect
            self.screen_width = 800
            self.screen_height = 480
            self.screen = pygame.display.set_mode((self.screen_width, self.screen_height))
            pygame.display.set_caption("ExpironGuard Smart Trolley")
            self.clock = pygame.time.Clock()
            self.font_title = pygame.font.SysFont("Arial", 28, bold=True)
            self.font_body = pygame.font.SysFont("Arial", 20)
            self.font_small = pygame.font.SysFont("Arial", 14)

    def calculate_expiry_status(self, expiry_date_str):
        """Calculates freshness: SAFE, EXPIRING_SOON, or EXPIRED"""
        try:
            exp_date = datetime.datetime.strptime(expiry_date_str, "%Y-%m-%d").date()
            today = datetime.date.today()
            days_left = (exp_date - today).days

            if days_left < 0:
                return "EXPIRED", (239, 68, 68), f"Expired {abs(days_left)} days ago!"
            elif days_left <= 7:
                return "EXPIRING SOON", (245, 158, 11), f"Expiring in {days_left} days!"
            else:
                return "SAFE & FRESH", (16, 185, 129), f"Safe to consume ({days_left} days left)"
        except Exception:
            return "UNKNOWN", (148, 163, 184), "Date format unverified"

    def fetch_product_from_cloud(self, qr_code_id):
        """Calls the ExpironGuard API for product details"""
        url = f"{API_BASE_URL}/api/products/qr/{qr_code_id}"
        print(f"[API] Checking product: {qr_code_id} -> {url}")
        try:
            response = requests.get(url, timeout=5)
            if response.status_code == 200:
                product = response.json()
                status, color, message = self.calculate_expiry_status(product.get("expiryDate", ""))
                product["status"] = status
                product["status_color"] = color
                product["status_message"] = message
                return product
            else:
                print(f"[API] Product not found in database: {qr_code_id}")
                return None
        except Exception as e:
            print(f"[API Error] Could not reach server: {e}")
            return None

    def on_qr_scanned(self, code_str):
        """Triggered when a QR code is detected"""
        now = time.time()
        # Debounce: prevent duplicate scan within 2.5 seconds
        if code_str == self.last_scanned_code and (now - self.last_scan_time) < 2.5:
            return

        self.last_scanned_code = code_str
        self.last_scan_time = now
        print(f"\n[SCANNER] Scanned QR Code: {code_str}")

        product = self.fetch_product_from_cloud(code_str)
        if product:
            self.current_product = product
            if product["status"] == "EXPIRED":
                self.status_message = f"ALERT: {product['name']} is EXPIRED! Do not add to cart."
                self.status_color = (239, 68, 68)
            else:
                self.cart_items.append(product)
                self.status_message = f"Added {product['name']} to trolley ({product['status']})"
                self.status_color = (16, 185, 129)
        else:
            self.status_message = f"Unknown QR: {code_str}"
            self.status_color = (245, 158, 11)

    def draw_ui(self):
        """Draws the Smart Trolley dashboard on the Waveshare screen"""
        if not PYGAME_AVAILABLE:
            return

        self.screen.fill((15, 23, 42)) # Slate 900 background

        # Header bar
        pygame.draw.rect(self.screen, (5, 150, 105), (0, 0, self.screen_width, 60))
        title = self.font_title.render("ExpironGuard Smart Trolley", True, (255, 255, 255))
        self.screen.blit(title, (20, 14))

        # Status Banner
        pygame.draw.rect(self.screen, self.status_color, (0, 60, self.screen_width, 36))
        status_txt = self.font_body.render(self.status_message, True, (255, 255, 255))
        self.screen.blit(status_txt, (20, 66))

        # Left Column: Currently Scanned Item Details
        left_box = pygame.Rect(20, 110, 420, 350)
        pygame.draw.rect(self.screen, (30, 41, 59), left_box, border_radius=12)
        pygame.draw.rect(self.screen, (51, 65, 85), left_box, 2, border_radius=12)

        lbl = self.font_title.render("Scanned Item", True, (241, 245, 249))
        self.screen.blit(lbl, (35, 125))

        if self.current_product:
            p = self.current_product
            name_txt = self.font_title.render(p.get("name", "Unknown"), True, (52, 211, 153))
            self.screen.blit(name_txt, (35, 165))

            price_val = float(p.get("price", 0)) / 100.0
            price_txt = self.font_body.render(f"Price: Rs. {price_val:.2f}", True, (255, 255, 255))
            self.screen.blit(price_txt, (35, 210))

            mfg_txt = self.font_body.render(f"Mfg Date: {p.get('manufacturingDate', 'N/A')}", True, (203, 213, 225))
            self.screen.blit(mfg_txt, (35, 245))

            exp_txt = self.font_body.render(f"Exp Date: {p.get('expiryDate', 'N/A')}", True, p.get("status_color", (255, 255, 255)))
            self.screen.blit(exp_txt, (35, 280))

            badge_box = pygame.Rect(35, 330, 390, 45)
            pygame.draw.rect(self.screen, p.get("status_color", (100, 100, 100)), badge_box, border_radius=8)
            badge_txt = self.font_title.render(f"{p.get('status')} - {p.get('status_message')}", True, (255, 255, 255))
            self.screen.blit(badge_txt, (45, 338))
        else:
            hint = self.font_body.render("Point camera at any product QR code...", True, (148, 163, 184))
            self.screen.blit(hint, (35, 220))

        # Right Column: Cart Summary
        right_box = pygame.Rect(460, 110, 320, 350)
        pygame.draw.rect(self.screen, (30, 41, 59), right_box, border_radius=12)
        pygame.draw.rect(self.screen, (51, 65, 85), right_box, 2, border_radius=12)

        cart_title = self.font_title.render(f"Trolley ({len(self.cart_items)} items)", True, (241, 245, 249))
        self.screen.blit(cart_title, (475, 125))

        total_price = sum(float(item.get("price", 0)) / 100.0 for item in self.cart_items)

        # Show last 4 items in cart
        y_offset = 170
        for item in self.cart_items[-4:]:
            item_line = self.font_small.render(f"- {item.get('name')} (Rs. {float(item.get('price', 0))/100:.2f})", True, (226, 232, 240))
            self.screen.blit(item_line, (475, y_offset))
            y_offset += 26

        # Cart Total & Checkout
        tot_txt = self.font_title.render(f"Total: Rs. {total_price:.2f}", True, (52, 211, 153))
        self.screen.blit(tot_txt, (475, 330))

        checkout_box = pygame.Rect(475, 385, 290, 50)
        pygame.draw.rect(self.screen, (16, 185, 129), checkout_box, border_radius=10)
        chk_txt = self.font_body.render("Press 'C' to Checkout", True, (255, 255, 255))
        self.screen.blit(chk_txt, (515, 398))

        pygame.display.flip()

    def run_camera_loop(self):
        """Background thread scanning frames from the camera"""
        if not CAMERA_AVAILABLE:
            return

        print("[CAMERA] Starting camera feed...")
        cap = cv2.VideoCapture(0)
        cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

        while self.running:
            ret, frame = cap.read()
            if not ret:
                time.sleep(0.05)
                continue

            # Decode QR codes from camera frame
            decoded = decode_qr(frame)
            for obj in decoded:
                qr_data = obj.data.decode("utf-8")
                self.on_qr_scanned(qr_data)

            time.sleep(0.03)

        cap.release()

    def start(self):
        """Main Loop"""
        print("\n==========================================")
        print("  ExpironGuard Raspberry Pi 4 Smart Trolley")
        print("==========================================")
        print("Keyboard Controls (Testing without Camera):")
        print("  1 -> Scan 'prod_milk_001' (Safe Milk)")
        print("  2 -> Scan 'prod_bread_002' (Safe Bread)")
        print("  3 -> Scan 'prod_yogurt_003' (Expired Yogurt)")
        print("  C -> Checkout Trolley")
        print("  Q -> Quit\n")

        # Start camera thread
        if CAMERA_AVAILABLE:
            t = threading.Thread(target=self.run_camera_loop, daemon=True)
            t.start()

        while self.running:
            if PYGAME_AVAILABLE:
                for event in pygame.event.get():
                    if event.type == pygame.QUIT:
                        self.running = False
                    elif event.type == pygame.KEYDOWN:
                        if event.key == pygame.K_q:
                            self.running = False
                        elif event.key == pygame.K_1:
                            self.on_qr_scanned("prod_milk_001")
                        elif event.key == pygame.K_2:
                            self.on_qr_scanned("prod_bread_002")
                        elif event.key == pygame.K_3:
                            self.on_qr_scanned("prod_yogurt_003")
                        elif event.key == pygame.K_c:
                            self.checkout()

                self.draw_ui()
                self.clock.tick(30)
            else:
                time.sleep(0.1)

        if PYGAME_AVAILABLE:
            pygame.quit()

    def checkout(self):
        """Simulates checking out trolley items"""
        if not self.cart_items:
            self.status_message = "Trolley is empty! Scan items first."
            self.status_color = (245, 158, 11)
            return

        print(f"\n[CHECKOUT] Checking out {len(self.cart_items)} items...")
        self.status_message = f"Checkout Successful! {len(self.cart_items)} items saved."
        self.status_color = (16, 185, 129)
        self.cart_items = []
        self.current_product = None

if __name__ == "__main__":
    trolley = SmartTrolley()
    trolley.start()

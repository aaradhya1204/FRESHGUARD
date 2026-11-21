# ExpironGuard — Raspberry Pi 4 Smart Trolley Guide

This folder contains the complete code to run ExpironGuard as a physical Smart Trolley system using:
- **Raspberry Pi 4 Model B**
- **Waveshare Display** (DSI, HDMI, or GPIO LCD)
- **Raspberry Pi Camera / USB Webcam**
- **ExpironGuard Cloud:** `https://expironguard.onrender.com`

---

## 1. What Happens on Monday (Step-by-Step)

### Step 1: Fix the MicroSD Boot at School
* Since both Red and Green LEDs are solid, the SD card is not currently booting.
* At school, insert the SD card into a computer using an SD card reader.
* Open **Raspberry Pi Imager** and flash **Raspberry Pi OS (64-bit)** with Wi-Fi and SSH enabled.

### Step 2: Connect the Hardware
1. Connect the **Waveshare Display** to the Raspberry Pi (DSI ribbon or HDMI).
2. Connect the **Camera module** to the CSI camera port (blue ribbon facing the ethernet port).
3. Plug in the USB-C power supply.

### Step 3: Run the Setup Script
Open Terminal on the Raspberry Pi and run:
```bash
git clone https://github.com/aaradhya1204/ExpironGuard.git
cd ExpironGuard/raspberry_pi
chmod +x setup.sh
./setup.sh
```

### Step 4: Run the Smart Trolley
```bash
python3 smart_trolley.py
```

---

## 2. Features in `smart_trolley.py`
1. **Live Camera Scanner:** Scans product QR codes automatically.
2. **Cloud API Sync:** Fetches product details live from `https://expironguard.onrender.com/api/products/qr/<qrCodeId>`.
3. **Instant Expiry Warning:**
   - **Green Badge:** Safe to consume.
   - **Amber Badge:** Expiring within 7 days.
   - **Red Alert:** Expired product — flags warning and prevents accidental purchase.
4. **Waveshare Graphical Dashboard:** Beautiful 800x480 resolution interface showing product information, running total, and cart contents.
5. **Keyboard Simulation (Testing Mode):**
   - Press `1`: Test Safe Milk (`prod_milk_001`)
   - Press `2`: Test Safe Bread (`prod_bread_002`)
   - Press `3`: Test Expired Yogurt (`prod_yogurt_003`)
   - Press `C`: Checkout Cart
   - Press `Q`: Quit

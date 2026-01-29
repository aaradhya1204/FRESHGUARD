
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api, errorSchemas } from "@shared/routes";
import { z } from "zod";
import session from "express-session";
import { products, type Product } from "@shared/schema";
import { differenceInDays } from "date-fns";
import MemoryStore from "memorystore";

const SessionStore = MemoryStore(session);

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Session setup
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "smart-label-secret",
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 86400000 }, // 1 day
      store: new SessionStore({
        checkPeriod: 86400000 // prune expired entries every 24h
      }),
    })
  );

  // Authentication Middleware
  const isAuthenticated = (req: any, res: any, next: any) => {
    if (req.session.userId) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  };

  const isAdmin = (req: any, res: any, next: any) => {
    if (req.session.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Forbidden: Admin access required" });
    }
  };

  // === AUTH ROUTES ===

  app.post(api.auth.login.path, async (req, res) => {
    try {
      const { username, password, customId, role } = api.auth.login.input.parse(req.body);

      if (role === 'admin') {
        // Hardcoded admin check as per requirements
        if (username === 'admin@gmail.com' && password === 'admin') {
          // Find or create the admin user in DB for consistency
          let admin = await storage.getUserByUsername('admin@gmail.com');
          if (!admin) {
            admin = await storage.createUser({
              username: 'admin@gmail.com',
              password: 'admin', // In a real app, hash this!
              role: 'admin',
              customId: null,
            });
          }
          req.session.userId = admin.id;
          req.session.role = 'admin';
          return res.json(admin);
        } else {
          return res.status(401).json({ message: "Invalid admin credentials" });
        }
      } else {
        // User login via Custom ID
        if (!customId) return res.status(400).json({ message: "User ID required" });
        
        let user = await storage.getUserByCustomId(customId);
        if (!user) {
          // Auto-create user for demo simplicity if they don't exist
          user = await storage.createUser({
            username: `user_${customId}`,
            password: 'user', // Dummy password
            role: 'user',
            customId: customId,
          });
        }
        req.session.userId = user.id;
        req.session.role = 'user';
        return res.json(user);
      }
    } catch (err) {
       res.status(400).json({ message: "Invalid request" });
    }
  });

  app.post(api.auth.logout.path, (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Logged out" });
    });
  });

  app.get(api.auth.me.path, async (req, res) => {
    if (!req.session.userId) return res.status(401).send();
    const user = await storage.getUser(req.session.userId);
    if (!user) return res.status(401).send();
    res.json(user);
  });

  // === PRODUCT ROUTES ===

  app.get(api.products.list.path, async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  });

  app.get(api.products.getByQr.path, async (req, res) => {
    const product = await storage.getProductByQr(req.params.qrCodeId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  });

  app.post(api.products.create.path, isAdmin, async (req, res) => {
    try {
      const input = api.products.create.input.parse(req.body);
      
      // Ensure date objects are valid dates from string inputs if needed (zod handles coerse usually but good to be safe)
      const product = await storage.createProduct({
        ...input,
        manufacturingDate: new Date(input.manufacturingDate),
        expiryDate: new Date(input.expiryDate)
      });
      res.status(201).json(product);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.put(api.products.update.path, isAdmin, async (req, res) => {
    try {
      const input = api.products.update.input.parse(req.body);
      const updated = await storage.updateProduct(Number(req.params.id), input);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ message: "Invalid update data" });
    }
  });

  app.delete(api.products.delete.path, isAdmin, async (req, res) => {
    await storage.deleteProduct(Number(req.params.id));
    res.status(204).send();
  });

  // === PURCHASE ROUTES ===

  app.get(api.purchases.list.path, isAuthenticated, async (req, res) => {
    const purchases = await storage.getPurchases(req.session.userId!);
    res.json(purchases);
  });

  app.post(api.purchases.create.path, isAuthenticated, async (req, res) => {
    try {
      const { productIds } = api.purchases.create.input.parse(req.body);
      
      for (const productId of productIds) {
        await storage.createPurchase({
          userId: req.session.userId!,
          productId: productId,
        });
      }
      
      res.status(201).json({ message: "Purchases recorded" });
    } catch (err) {
      res.status(400).json({ message: "Invalid purchase data" });
    }
  });

  // === SEED DATA ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const products = await storage.getProducts();
  if (products.length === 0) {
    console.log("Seeding database...");
    
    // Create Admin if not exists (handled in login but good to have)
    let admin = await storage.getUserByUsername('admin@gmail.com');
    if (!admin) {
        await storage.createUser({
            username: 'admin@gmail.com',
            password: 'admin',
            role: 'admin',
            customId: null,
        });
    }

    // Seed Products
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    const nextMonth = new Date(today);
    nextMonth.setDate(today.getDate() + 30);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    await storage.createProduct({
      name: "Fresh Milk",
      price: 250, // $2.50
      manufacturingDate: new Date("2023-10-25"),
      expiryDate: nextWeek,
      nutritionalInfo: "Calories: 150, Fat: 8g, Protein: 8g",
      ingredients: ["Whole Milk", "Vitamin D3"],
      qrCodeId: "prod_milk_001"
    });

    await storage.createProduct({
      name: "Organic Bread",
      price: 400, // $4.00
      manufacturingDate: new Date("2023-10-26"),
      expiryDate: nextWeek,
      nutritionalInfo: "Calories: 100, Carbs: 20g",
      ingredients: ["Wheat Flour", "Water", "Salt", "Yeast"],
      qrCodeId: "prod_bread_002"
    });

    await storage.createProduct({
      name: "Expired Yogurt",
      price: 150, // $1.50
      manufacturingDate: new Date("2023-09-01"),
      expiryDate: yesterday, // EXPIRED!
      nutritionalInfo: "Calories: 90, Sugar: 12g",
      ingredients: ["Milk", "Live Cultures", "Strawberry"],
      qrCodeId: "prod_yogurt_003"
    });
    
    console.log("Database seeded!");
  }
}

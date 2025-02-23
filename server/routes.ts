import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Portfolio routes
  app.get("/api/portfolio", async (_req, res) => {
    const items = await storage.getPortfolioItems();
    res.json(items);
  });

  app.get("/api/portfolio/:id", async (req, res) => {
    const item = await storage.getPortfolioItem(Number(req.params.id));
    if (!item) {
      res.status(404).json({ message: "Portfolio item not found" });
      return;
    }
    res.json(item);
  });

  // Blog routes
  app.get("/api/blog", async (_req, res) => {
    const posts = await storage.getBlogPosts();
    res.json(posts);
  });

  app.get("/api/blog/:id", async (req, res) => {
    const post = await storage.getBlogPost(Number(req.params.id));
    if (!post) {
      res.status(404).json({ message: "Blog post not found" });
      return;
    }
    res.json(post);
  });

  // Resume route
  app.get("/api/resume", async (_req, res) => {
    try {
      const resume = await storage.getResume();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${resume.fileName}`);
      const buffer = Buffer.from(resume.fileContent, 'base64');
      res.send(buffer);
    } catch (error) {
      console.error('Error serving resume:', error);
      res.status(500).json({ message: "Error fetching resume" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
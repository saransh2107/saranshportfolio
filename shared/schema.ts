import { pgTable, text, serial, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  tags: text("tags").array().notNull(),
  link: text("link"),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  summary: text("summary").notNull(),
  imageUrl: text("image_url").notNull(),
  publishedAt: timestamp("published_at").notNull(),
  salesforceId: text("salesforce_id").notNull(),
});

// Schema for Resume from Salesforce
export const resumeSchema = z.object({
  fileName: z.string(),
  fileContent: z.string(), // Base64 encoded PDF
  lastModified: z.date()
});

export const insertPortfolioItemSchema = createInsertSchema(portfolioItems).omit({ id: true });
export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true });

export type InsertPortfolioItem = z.infer<typeof insertPortfolioItemSchema>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type Resume = z.infer<typeof resumeSchema>;
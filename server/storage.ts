import { type PortfolioItem, type BlogPost, type InsertPortfolioItem, type InsertBlogPost, type Resume } from "@shared/schema";
import { salesforce } from "./salesforce";

export interface IStorage {
  // Portfolio
  getPortfolioItems(): Promise<PortfolioItem[]>;
  getPortfolioItem(id: number): Promise<PortfolioItem | undefined>;
  createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;

  // Blog
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;

  // Resume
  getResume(): Promise<Resume>;
}

export class Storage implements IStorage {
  private portfolioItems: Map<number, PortfolioItem>;
  private currentPortfolioId: number;

  constructor() {
    this.portfolioItems = new Map();
    this.currentPortfolioId = 1;

    // Initialize with mock portfolio data
    this.initializeMockPortfolio();
  }

  private initializeMockPortfolio() {
    const portfolioImages = [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
      "https://images.unsplash.com/photo-1472289065668-ce650ac443d2",
      "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64",
      "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8"
    ];

    portfolioImages.forEach((imageUrl, index) => {
      this.createPortfolioItem({
        title: `Project ${index + 1}`,
        description: `Description for project ${index + 1}`,
        imageUrl,
        tags: ["Web", "Design", "Development"],
        link: `https://example.com/project-${index + 1}`
      });
    });
  }

  // Portfolio methods
  async getPortfolioItems(): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values());
  }

  async getPortfolioItem(id: number): Promise<PortfolioItem | undefined> {
    return this.portfolioItems.get(id);
  }

  async createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem> {
    const id = this.currentPortfolioId++;
    const portfolioItem = { ...item, id };
    this.portfolioItems.set(id, portfolioItem);
    return portfolioItem;
  }

  // Blog methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return salesforce.getBlogPosts();
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    try {
      return await salesforce.getBlogPost(id.toString());
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return undefined;
    }
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    throw new Error('Blog posts can only be created in Salesforce');
  }

  // Resume method
  async getResume(): Promise<Resume> {
    return salesforce.getResume();
  }
}

export const storage = new Storage();
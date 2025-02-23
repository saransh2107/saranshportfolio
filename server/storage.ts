import { type PortfolioItem, type BlogPost, type InsertPortfolioItem, type InsertBlogPost } from "@shared/schema";

export interface IStorage {
  // Portfolio
  getPortfolioItems(): Promise<PortfolioItem[]>;
  getPortfolioItem(id: number): Promise<PortfolioItem | undefined>;
  createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;
  
  // Blog
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
}

export class MemStorage implements IStorage {
  private portfolioItems: Map<number, PortfolioItem>;
  private blogPosts: Map<number, BlogPost>;
  private currentPortfolioId: number;
  private currentBlogId: number;

  constructor() {
    this.portfolioItems = new Map();
    this.blogPosts = new Map();
    this.currentPortfolioId = 1;
    this.currentBlogId = 1;
    
    // Initialize with mock data
    this.initializeMockData();
  }

  private initializeMockData() {
    const portfolioImages = [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
      "https://images.unsplash.com/photo-1472289065668-ce650ac443d2",
      "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64",
      "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8"
    ];

    const blogImages = [
      "https://images.unsplash.com/photo-1472289065668-ce650ac443d2",
      "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c",
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634",
      "https://images.unsplash.com/photo-1513151233558-d860c5398176",
      "https://images.unsplash.com/photo-1436262513933-a0b06755c784",
      "https://images.unsplash.com/photo-1487088678257-3a541e6e3922"
    ];

    // Mock portfolio items
    portfolioImages.forEach((imageUrl, index) => {
      this.createPortfolioItem({
        title: `Project ${index + 1}`,
        description: `Description for project ${index + 1}`,
        imageUrl,
        tags: ["Web", "Design", "Development"],
        link: `https://example.com/project-${index + 1}`
      });
    });

    // Mock blog posts
    blogImages.forEach((imageUrl, index) => {
      this.createBlogPost({
        title: `Blog Post ${index + 1}`,
        content: `Content for blog post ${index + 1}...`,
        summary: `Summary for blog post ${index + 1}`,
        imageUrl,
        publishedAt: new Date(),
        salesforceId: `SF-${index + 1}`
      });
    });
  }

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

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogId++;
    const blogPost = { ...post, id };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }
}

export const storage = new MemStorage();

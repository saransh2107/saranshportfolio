import jsforce from 'jsforce';
import { type BlogPost, type InsertBlogPost } from '@shared/schema';

class SalesforceClient {
  private conn: jsforce.Connection;

  constructor() {
    this.conn = new jsforce.Connection({
      loginUrl: 'https://login.salesforce.com'
    });
  }

  async connect() {
    if (!process.env.SALESFORCE_USERNAME || !process.env.SALESFORCE_PASSWORD || !process.env.SALESFORCE_SECURITY_TOKEN) {
      throw new Error('Missing Salesforce credentials');
    }

    await this.conn.login(
      process.env.SALESFORCE_USERNAME,
      process.env.SALESFORCE_PASSWORD + process.env.SALESFORCE_SECURITY_TOKEN
    );
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    try {
      await this.connect();
      
      const result = await this.conn.query(
        'SELECT Id, Title__c, Content__c, Summary__c, Image_URL__c, Published_Date__c FROM Blog_Post__c ORDER BY Published_Date__c DESC'
      );

      return result.records.map((record: any) => ({
        id: parseInt(record.Id),
        title: record.Title__c,
        content: record.Content__c,
        summary: record.Summary__c,
        imageUrl: record.Image_URL__c,
        publishedAt: new Date(record.Published_Date__c),
        salesforceId: record.Id
      }));
    } catch (error) {
      console.error('Error fetching blog posts from Salesforce:', error);
      throw error;
    }
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    try {
      await this.connect();
      
      const result = await this.conn.query(
        'SELECT Id, Title__c, Content__c, Summary__c, Image_URL__c, Published_Date__c FROM Blog_Post__c WHERE Id = $1',
        [id]
      );

      if (result.records.length === 0) {
        return undefined;
      }

      const record = result.records[0];
      return {
        id: parseInt(record.Id),
        title: record.Title__c,
        content: record.Content__c,
        summary: record.Summary__c,
        imageUrl: record.Image_URL__c,
        publishedAt: new Date(record.Published_Date__c),
        salesforceId: record.Id
      };
    } catch (error) {
      console.error('Error fetching blog post from Salesforce:', error);
      throw error;
    }
  }
}

export const salesforce = new SalesforceClient();

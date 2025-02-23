import { useQuery } from "@tanstack/react-query";
import { type BlogPost } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Link } from "wouter";

interface BlogListProps {
  limit?: number;
}

export default function BlogList({ limit }: BlogListProps) {
  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const displayPosts = limit ? posts.slice(0, limit) : posts;

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(limit || 6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="w-full h-48 bg-muted rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayPosts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={`/blog/${post.id}`}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-4 space-y-4">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <CardHeader className="p-0">
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <time className="text-sm text-muted-foreground">
                    {format(new Date(post.publishedAt), "MMMM d, yyyy")}
                  </time>
                </CardHeader>
                <p className="text-muted-foreground line-clamp-3">{post.summary}</p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

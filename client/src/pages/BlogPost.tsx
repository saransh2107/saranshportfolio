import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { type BlogPost } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function BlogPost() {
  const { id } = useParams();
  
  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: ["/api/blog", id],
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  if (!post) return <div>Post not found</div>;

  return (
    <article className="prose prose-lg max-w-none">
      <h1>{post.title}</h1>
      <time className="text-muted-foreground">
        {format(new Date(post.publishedAt), "MMMM d, yyyy")}
      </time>
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-[400px] object-cover rounded-lg my-8"
      />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

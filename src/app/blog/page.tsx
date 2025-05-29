import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Calendar, Clock } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    id: "scalable-apis-nodejs-postgresql",
    title: "Building Scalable APIs with Node.js and PostgreSQL",
    description: "Learn best practices for designing and implementing scalable REST APIs using Node.js, Express, and PostgreSQL. We'll cover database design, caching strategies, and performance optimization.",
    date: "March 15, 2024",
    readTime: "8 min read",
    tags: ["Node.js", "PostgreSQL", "API Design", "Backend"],
    slug: "scalable-apis-nodejs-postgresql"
  },
  {
    id: "game-development-idea-to-prototype",
    title: "Game Development: From Idea to Prototype",
    description: "A complete guide to taking your game idea from concept to working prototype. Covering ideation, planning, development workflow, and testing strategies.",
    date: "March 8, 2024",
    readTime: "6 min read",
    tags: ["Game Development", "Unity", "Prototyping", "Design"],
    slug: "game-development-idea-to-prototype"
  },
  {
    id: "microservices-architecture-lessons",
    title: "Microservices Architecture: Lessons Learned",
    description: "Real-world experiences and lessons learned from implementing microservices architecture. What worked, what didn't, and key takeaways for your next project.",
    date: "February 28, 2024",
    readTime: "10 min read",
    tags: ["Microservices", "Architecture", "Backend", "DevOps"],
    slug: "microservices-architecture-lessons"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
            Naufal Hafizh
          </Link>
          <div className="flex space-x-6">
            <Link href="/#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
            <Link href="/#projects" className="text-gray-600 hover:text-gray-900 transition-colors">Projects</Link>
            <Link href="/#skills" className="text-gray-600 hover:text-gray-900 transition-colors">Skills</Link>
            <Link href="/blog" className="text-gray-900 font-medium">Blog</Link>
            <Link href="/resume.html" target="_blank" className="text-gray-600 hover:text-gray-900 transition-colors">Resume</Link>
            <Link href="/#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-xl text-gray-600">
              Thoughts on backend development, game development, and technology
            </p>
          </div>

          {/* Blog Posts */}
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{post.title}</CardTitle>
                  <CardDescription className="text-base">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <Button variant="outline" asChild>
                    <Link href={`/blog/${post.slug}`}>
                      Read More
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
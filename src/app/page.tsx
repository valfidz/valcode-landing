import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail, ExternalLink, Code, Database } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ResumeSection } from "@/components/ResumeSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/logo.png" alt="VALCODE Logo" className="h-8 w-auto mr-2" />
            <h1 className="text-xl font-bold text-gray-900">VALCODE</h1>
          </div>
          <div className="flex space-x-6">
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
            <a href="#projects" className="text-gray-600 hover:text-gray-900 transition-colors">Projects</a>
            <a href="#skills" className="text-gray-600 hover:text-gray-900 transition-colors">Skills</a>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</Link>
            <a href="/resume.html" target="_blank" className="text-gray-600 hover:text-gray-900 transition-colors" rel="noreferrer">Resume</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Naufal Hafizh Nugraha
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {`Backend Developer & Game Development Enthusiast`}
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-gray-900 hover:bg-gray-800" asChild>
              <a href="#projects">
                <Github className="mr-2 h-4 w-4" />
                View Work
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#contact">
                <Mail className="mr-2 h-4 w-4" />
                Get in Touch
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-justify">
              <p className="text-gray-600 mb-4">
                {`I'm a passionate backend developer with a strong foundation in building scalable,
                efficient systems. My expertise lies in creating robust APIs, designing database
                architectures, and implementing complex business logic.`}
              </p>
              <p className="text-gray-600 mb-4">
                {`Beyond backend development, I have a deep interest in game development, where I
                enjoy bringing creative ideas to life through code. This dual passion allows me
                to approach problems from both technical and creative perspectives.`}
              </p>
              <p className="text-gray-600">
                {`I'm always eager to learn new technologies and take on challenging projects that
                push the boundaries of what's possible.`}
              </p>
            </div>
            <div className="flex justify-center">
              {/* <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center">
                <Code className="h-20 w-20 text-gray-400" />
              </div> */}
              <div>
                <Image src="/photo_cropped.png" alt="photo" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Projects</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {/* Project Card 1 */}
              <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm">
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Database className="h-8 w-8 text-gray-600" />
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                    <CardTitle>Pipopa Company Profile</CardTitle>
                    <CardDescription>
                      Scalable REST API and responsive UI for company profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">Node.js</Badge>
                      <Badge variant="secondary">Express.js</Badge>
                      <Badge variant="secondary">PostgreSQL</Badge>
                      <Badge variant="secondary">React.js</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {`Built a comprehensive API and UI handling user authentication and post management with high performance and security.`}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Project Card 2 */}
              {/* <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm">
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Gamepad2 className="h-8 w-8 text-gray-600" />
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                    <CardTitle>Indie Puzzle Game</CardTitle>
                    <CardDescription>
                      2D puzzle game with unique mechanics and engaging gameplay
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">Unity</Badge>
                      <Badge variant="secondary">C#</Badge>
                      <Badge variant="secondary">Game Design</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Developed a complete puzzle game featuring custom mechanics, level progression,
                      and polished user experience from concept to release.
                    </p>
                  </CardContent>
                </Card>
              </div> */}

              {/* Project Card 3 */}
              <div className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm">
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Code className="h-8 w-8 text-gray-600" />
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                    <CardTitle>E-Meterai</CardTitle>
                    <CardDescription>
                      Distributed system design for high-traffic applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">Node.js</Badge>
                      <Badge variant="secondary">PostgreSQL</Badge>
                      <Badge variant="secondary">Docker</Badge>
                      <Badge variant="secondary">Redis</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Maintained a microservices architecture handling millions of requests with fault tolerance and horizontal scaling capabilities.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technical Skills</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Backend Development</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge>Node.js</Badge>
                <Badge>PostgreSQL</Badge>
                <Badge>MongoDB</Badge>
                <Badge>Redis</Badge>
                <Badge>Docker</Badge>
                <Badge>Supabase</Badge>
                <Badge>Google Cloud Platform</Badge>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Game Development</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>Unity</Badge>
                <Badge>C#</Badge>
                <Badge>Game Design</Badge>
                <Badge>2D/3D Graphics</Badge>
                <Badge>Physics Systems</Badge>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge>Git</Badge>
                <Badge>Linux</Badge>
                <Badge>CI/CD</Badge>
                <Badge>Microservices</Badge>
                <Badge>REST APIs</Badge>
                <Badge>Testing</Badge>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>Problem Solving</Badge>
                <Badge>Team Collaboration</Badge>
                <Badge>Code Review</Badge>
                <Badge>Agile Development</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Latest Blog Posts</h2>
          <div className="space-y-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Building Scalable APIs with Node.js and PostgreSQL</CardTitle>
                <CardDescription>March 15, 2025 • 8 min read</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {`Learn best practices for designing and implementing scalable REST APIs using Node.js,
                  Express, and PostgreSQL. We'll cover database design, caching strategies, and performance optimization.`}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/blog/scalable-apis-nodejs-postgresql">
                    Read More
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Game Development: From Idea to Prototype</CardTitle>
                <CardDescription>March 8, 2025 • 6 min read</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {`A complete guide to taking your game idea from concept to working prototype.
                  Covering ideation, planning, development workflow, and testing strategies.`}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/blog/game-development-idea-to-prototype">
                    Read More
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Microservices Architecture: Lessons Learned</CardTitle>
                <CardDescription>February 28, 2025 • 10 min read</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Real-world experiences and lessons learned from implementing microservices architecture.
                  What worked, what didn't, and key takeaways for your next project.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/blog/microservices-architecture-lessons">
                    Read More
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Get In Touch</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-center">
            {`I'm always interested in discussing new opportunities, collaborating on projects,
            or simply talking about technology and game development.`}
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Contact Methods */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{`Let's Connect`}</h3>
              <div className="space-y-3">
                <Button size="lg" className="bg-gray-900 hover:bg-gray-800 w-full" asChild>
                  <a href="mailto:nugrahanaufalhafizh@gmail.com">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Me
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <a href="https://github.com/valfidz" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <a href="https://linkedin.com/in/nhafizh" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>

            {/* Resume Section */}
            <div>
              <ResumeSection />
            </div>
          </div>

          <Separator className="my-8" />

          <p className="text-gray-500 text-center">
            nugrahanaufalhafizh@gmail.com • Available for freelance and full-time opportunities
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center text-gray-500">
          <p>&copy; 2025 Naufal Hafizh Nugraha. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
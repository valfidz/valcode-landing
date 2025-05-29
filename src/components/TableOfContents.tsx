"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { List } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headings from content
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const items: TOCItem[] = [];
    let match: RegExpExecArray | null;
    let headingCounter = 1;

    // biome-ignore lint/suspicious/noAssignInExpressions: Required for regex execution
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = `heading-${headingCounter}`;

      items.push({
        id,
        text,
        level,
      });

      headingCounter++;
    }

    setTocItems(items);
  }, [content]);

  useEffect(() => {
    // Create intersection observer to track active heading
    const observerOptions = {
      rootMargin: "-100px 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all headings
    for (const item of tocItems) {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <>
      {/* Mobile TOC */}
      <div className="lg:hidden mb-6">
        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <List className="h-4 w-4" />
              Table of Contents
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <nav className="space-y-1 max-h-48 overflow-auto">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToHeading(item.id)}
                  className={`
                    block w-full text-left text-sm py-1.5 px-2 rounded transition-colors
                    ${item.level === 1 ? "font-medium" : ""}
                    ${item.level === 2 ? "ml-2" : ""}
                    ${item.level === 3 ? "ml-4" : ""}
                    ${item.level >= 4 ? "ml-6" : ""}
                    ${
                      activeId === item.id
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }
                  `}
                >
                  {item.text}
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>
      </div>

      {/* Desktop TOC */}
      <div className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-auto">
        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <List className="h-4 w-4" />
              Table of Contents
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <nav className="space-y-1">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToHeading(item.id)}
                  className={`
                    block w-full text-left text-sm py-1.5 px-2 rounded transition-colors
                    ${item.level === 1 ? "font-medium" : ""}
                    ${item.level === 2 ? "ml-3" : ""}
                    ${item.level === 3 ? "ml-6" : ""}
                    ${item.level >= 4 ? "ml-9" : ""}
                    ${
                      activeId === item.id
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }
                  `}
                >
                  {item.text}
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
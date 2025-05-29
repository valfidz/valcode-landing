"use client";

import { useMemo } from "react";

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  const processedContent = useMemo(() => {
    let headingCounter = 1;

    // Split content into lines for better processing
    const lines = content.split('\n');
    const processedLines: string[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLanguage = '';
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Handle code blocks
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          // Starting code block
          inCodeBlock = true;
          codeBlockLanguage = line.replace('```', '').trim();
          codeBlockContent = [];
        } else {
          // Ending code block
          inCodeBlock = false;
          const codeContent = codeBlockContent.join('\n');
          processedLines.push(
            `<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-6 border text-sm"><code class="language-${codeBlockLanguage}">${codeContent}</code></pre>`
          );
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }

      // Process headings
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        if (inList) {
          processedLines.push('</ul>');
          inList = false;
        }

        const level = headingMatch[1].length;
        const text = headingMatch[2].trim();
        const id = `heading-${headingCounter}`;
        headingCounter++;

        const headingClasses = {
          1: 'text-3xl font-bold mt-8 mb-4 text-gray-900',
          2: 'text-2xl font-semibold mt-6 mb-3 text-gray-900',
          3: 'text-xl font-semibold mt-5 mb-3 text-gray-900',
          4: 'text-lg font-semibold mt-4 mb-2 text-gray-900',
          5: 'text-base font-semibold mt-3 mb-2 text-gray-900',
          6: 'text-sm font-semibold mt-2 mb-2 text-gray-900',
        };

        processedLines.push(
          `<h${level} id="${id}" class="scroll-mt-24 ${headingClasses[level as keyof typeof headingClasses]}">${text}</h${level}>`
        );
        continue;
      }

      // Process lists
      const listMatch = line.match(/^\s*- (.+)$/);
      if (listMatch) {
        if (!inList) {
          processedLines.push('<ul class="list-disc ml-6 space-y-1 my-4">');
          inList = true;
        }
        const listItem = listMatch[1];
        const processedItem = listItem
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
          .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>');
        processedLines.push(`<li class="mb-1 text-gray-700">${processedItem}</li>`);
        continue;
      }

      if (inList && line.trim() === '') {
        // Empty line in list - continue list
        continue;
      }

      if (inList) {
        // End of list
        processedLines.push('</ul>');
        inList = false;
      }

      // Process empty lines
      if (line.trim() === '') {
        processedLines.push('<br class="my-2">');
        continue;
      }

      // Process regular text lines
      let processedLine = line
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>');

      // Only wrap in paragraph if it's not already HTML
      if (!processedLine.startsWith('<')) {
        processedLine = `<p class="mb-4 leading-relaxed text-gray-700">${processedLine}</p>`;
      }

      processedLines.push(processedLine);
    }

    // Close any remaining list
    if (inList) {
      processedLines.push('</ul>');
    }

    return processedLines.join('\n');
  }, [content]);

  return (
    <div
      className="prose prose-gray max-w-none"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for processed markdown content
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}
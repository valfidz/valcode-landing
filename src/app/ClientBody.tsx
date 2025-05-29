"use client";

import { useEffect } from "react";

export function ClientBody({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = `${className} antialiased`.trim();
  }, [className]);

  return <body className={`${className} antialiased`.trim()} suppressHydrationWarning>{children}</body>;
}
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, Eye, FileText } from "lucide-react";
import { useState } from "react";

export function ResumeSection() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/resume.html';
    link.download = 'Naufal_Hafizh_Nugraha_Resume.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  return (
    <div className="bg-gray-100 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="h-6 w-6 text-gray-600" />
        <h3 className="text-xl font-semibold text-gray-900">Resume / CV</h3>
      </div>

      <p className="text-gray-600 mb-6">
        Download my complete resume with detailed experience, projects, and technical skills.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleDownload}
          className="bg-gray-900 hover:bg-gray-800 flex-1"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Resume
        </Button>

        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              onClick={handlePreview}
              className="flex-1"
            >
              <Eye className="mr-2 h-4 w-4" />
              Quick Preview
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle>Resume Preview</DialogTitle>
              <DialogDescription>
                Naufal Hafizh Nugraha - Backend Developer & Game Developer
              </DialogDescription>
            </DialogHeader>
            <div className="overflow-auto flex-1">
              <iframe
                src="/resume.html"
                className="w-full h-[600px] border-0"
                title="Resume Preview"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                Close
              </Button>
              <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Last updated: June 2025 • Available in HTML format
      </div>
    </div>
  );
}
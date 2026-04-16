"use client";

import { Headphones, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { usePostHog } from "posthog-js/react";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const posthog = usePostHog(); // 1. Initialize PostHog

  // 2. Create the click handler
  const handleFeedbackClick = () => {
    posthog.capture("top_nav_feedback_clicked");
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between border-b px-4 py-4",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        {/* 3. Removed 'asChild' and 'Link', added onClick */}
        <Button variant="outline" size="sm" onClick={handleFeedbackClick}>
          <ThumbsUp />
          <span className="hidden lg:block">Feedback</span>
        </Button>
        
        <Button variant="outline" size="sm" asChild>
          <Link href="/help-support">
            <Headphones />
            <span className="hidden lg:block">Need help?</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
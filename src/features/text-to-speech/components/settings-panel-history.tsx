"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  AudioLines,
  AudioWaveform,
  Clock,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { VoiceAvatar } from "@/components/voice-avatar/voice-avatar";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

// Infer the type from your TRPC router, similar to VoiceItem
export type GenerationItem =
  inferRouterOutputs<AppRouter>["generations"]["getAll"][number];

function HistoryItem({ generation }: { generation: GenerationItem }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    trpc.generations.delete.mutationOptions({
      onSuccess: () => {
        toast.success("Generation deleted successfully");
        queryClient.invalidateQueries({
          queryKey: trpc.generations.getAll.queryKey(),
        });
        setShowDeleteDialog(false);
      },
      onError: (error) => {
        toast.error(error.message ?? "Failed to delete generation");
      },
    }),
  );

  return (
    <div className="group flex items-center justify-between gap-1 rounded-lg transition-colors hover:bg-muted">
      <Link
        href={`/text-to-speech/${generation.id}`}
        className="flex min-w-0 flex-1 flex-col gap-0.5 p-3"
      >
        <p className="truncate text-sm font-medium text-foreground">
          {generation.text}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <VoiceAvatar
            seed={generation.voiceId ?? generation.voiceName}
            name={generation.voiceName}
            className="shrink-0"
          />
          <span>{generation.voiceName}</span>
          <span>&middot;</span>
          <span>
            {formatDistanceToNow(new Date(generation.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </Link>

      <div className="pr-3 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="rounded-full">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => setShowDeleteDialog(true)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="size-4 text-destructive" />
              <span className="font-medium">Delete generation</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete generation</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this audio generation? This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleteMutation.isPending}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                disabled={deleteMutation.isPending}
                onClick={(e) => {
                  e.preventDefault();
                  deleteMutation.mutate({ id: generation.id });
                }}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export function SettingsPanelHistory() {
  const trpc = useTRPC();

  const { data: generations } = useSuspenseQuery(
    trpc.generations.getAll.queryOptions(),
  );

  if (!generations.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-8">
        <div className="relative flex w-25 items-center justify-center">
          <div className="absolute left-0 -rotate-30 rounded-full bg-muted p-3">
            <AudioLines className="size-4 text-muted-foreground" />
          </div>
          <div className="relative z-10 rounded-full bg-foreground p-3">
            <AudioWaveform className="size-4 text-background" />
          </div>
          <div className="absolute right-0 rotate-30 rounded-full bg-muted p-3">
            <Clock className="size-4 text-muted-foreground" />
          </div>
        </div>
        <p className="font-semibold tracking-tight text-foreground">
          No generations yet
        </p>
        <p className="max-w-48 text-center text-xs text-muted-foreground">
          Generate some audio and it will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 p-2">
      {generations.map((generation) => (
        <HistoryItem key={generation.id} generation={generation} />
      ))}
    </div>
  );
}

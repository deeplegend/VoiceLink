"use client";

import { useState } from "react";
import {
    Mic,
    Square,
    RotateCcw,
    X,
    FileAudio,
    Play,
    Pause,
} from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { cn, formatFileSize } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAudioPlayback } from "@/hooks/use-audio-playback";
import { useAudioRecorder } from "@/features/voices/hooks/use-audio-recorder";
import { MIN_AUDIO_DURATION_SECONDS } from "@/app/api/voices/constants";

function formatTime(seconds: number) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function VoiceRecorder({
    file,
    onFileChange,
    isInvalid,
}: {
    file: File | null;
    onFileChange: (file: File | null) => void;
    isInvalid?: boolean;
}) {
    const { isPlaying, togglePlay } = useAudioPlayback(file);
    const [isScriptOpen, setIsScriptOpen] = useState(false);

    const {
        isRecording,
        elapsedTime,
        audioBlob,
        containerRef,
        error,
        startRecording,
        stopRecording,
        resetRecording,
    } = useAudioRecorder();

    const handleStop = () => {
        stopRecording((blob) => {
            const recordedFile = new File([blob], "recording.wav", {
                type: "audio/wav",
            });
            onFileChange(recordedFile);
        });
    };

    const handleReRecord = () => {
        onFileChange(null);
        resetRecording();
    };

    if (error) {
        return (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-destructive/50 bg-destructive/5 px-6 py-10">
                <p className="text-center text-sm text-destructive">{error}</p>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={resetRecording}
                >
                    Try again
                </Button>
            </div>
        );
    }

    if (file) {
        
        return (
            <div className="flex items-center gap-3 rounded-xl border p-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                    <FileAudio className="size-5 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                        {audioBlob && elapsedTime > 0 && (
                            <>&nbsp;&middot;&nbsp;{formatTime(elapsedTime)}</>
                        )}
                    </p>
                </div>
                <Button type="button" variant="ghost" size="icon-sm" onClick={togglePlay}>
                    {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                </Button>
                <Button type="button" variant="ghost" size="icon-sm" onClick={handleReRecord}>
                    <RotateCcw className="size-4" />
                </Button>
                <Button type="button" variant="ghost" size="icon-sm" onClick={handleReRecord}>
                    <X className="size-4" />
                </Button>
            </div>
        );
    }

    return (
        <Collapsible
            open={isScriptOpen}
            onOpenChange={setIsScriptOpen}
            className={cn(
                "flex flex-col overflow-hidden rounded-2xl border transition-all",
                isInvalid ? "border-destructive" : "border-border"
            )}
        >
            {isRecording ? (
                <div className="flex flex-col">
                    <div ref={containerRef} className="w-full" />
                    <div className="flex items-center justify-between p-4">
                        <p className="text-[28px] font-semibold leading-[1.2] tracking-tight">
                            {formatTime(elapsedTime)}
                        </p>
                        <Button type="button" variant="destructive" onClick={handleStop}>
                            <Square className="size-3" />
                            Stop
                        </Button>
                    </div>
                </div>
            ) : (

                <div className="flex flex-col items-center justify-center gap-4 px-6 py-8">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
                        <Mic className="size-5 text-muted-foreground" />
                    </div>

                    <div className="flex flex-col items-center gap-1.5">
                        <p className="text-base font-semibold tracking-tight">
                            Record your voice
                        </p>
                        <p className="text-center text-sm text-muted-foreground">
                            {`Click record to start capturing audio (min ${MIN_AUDIO_DURATION_SECONDS} seconds)`}
                        </p>
                    </div>

                    <Button type="button" variant="outline" size="sm" onClick={startRecording}>
                        <Mic className="size-3.5" />
                        Record
                    </Button>

                    <CollapsibleTrigger asChild>
                        <Button
                            variant="link"
                            className="mt-2 h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                        >
                            {isScriptOpen ? "Hide reading script" : "Don't know what to say?"}
                        </Button>
                    </CollapsibleTrigger>
                </div>
            )}

            <CollapsibleContent>
                <div className="border-t bg-muted/30 px-6 py-5">
                    <p className="mb-3 text-xs font-medium text-muted-foreground">
                        Read this paragraph at your normal speaking pace:
                    </p>
                    <blockquote className="rounded-r-lg border-l-2 border-primary/50 bg-muted/50 py-2 pl-4 pr-3 text-sm italic leading-relaxed text-foreground">
                        "When the sunlight strikes raindrops in the air, they act like a
                        prism and form a rainbow. The rainbow is a division of white
                        light into many beautiful colors. These take the shape of a long
                        round arch, with its path high above, and its two ends apparently
                        beyond the horizon."
                    </blockquote>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}
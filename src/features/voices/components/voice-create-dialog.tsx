"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { VoiceCreateForm } from "./voice-create-form";
import { Button } from "@/components/ui/button";

interface VoiceCreateDialogProps {
    children?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function VoiceCreateDialog({
    children,
    open,
    onOpenChange,
}: VoiceCreateDialogProps) {
    const isMobile = useIsMobile();
    const [internalOpen, setInternalOpen] = useState(false);
    const isOpen = open !== undefined ? open : internalOpen;

    const handleOpenChange = (newOpen: boolean) => {
        setInternalOpen(newOpen);
        onOpenChange?.(newOpen);
    };

    if (isMobile) {
        return (
            <Drawer open={isOpen} onOpenChange={handleOpenChange}>
                {children && <DrawerTrigger asChild>{children}</DrawerTrigger>}
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Create custom voice</DrawerTitle>
                        <DrawerDescription>
                            Upload or record an audio sample to add a new voice to your
                            library.
                        </DrawerDescription>
                    </DrawerHeader>
                    {}
                    <VoiceCreateForm
                        scrollable
                        onSuccess={() => handleOpenChange(false)}
                        footer={(submit) => (
                            <DrawerFooter>
                                {submit}
                                <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        )}
                    />
                </DrawerContent>
            </Drawer>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            {children && <DialogTrigger asChild>{children}</DialogTrigger>}
            <DialogContent>
                <DialogHeader className="text-left">
                    <DialogTitle>Create custom voice</DialogTitle>
                    <DialogDescription>
                        Upload or record an audio sample to add a new voice to your library.
                    </DialogDescription>
                </DialogHeader>
                {}
                <VoiceCreateForm onSuccess={() => handleOpenChange(false)} />
            </DialogContent>
        </Dialog>
    );
};
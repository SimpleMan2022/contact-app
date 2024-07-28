// DialogMessage.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface DialogMessageProps {
    children?: React.ReactNode;
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => Promise<void>; // Ensure onClick returns a promise
}

const DialogMessage: React.FC<DialogMessageProps> = ({ children, icon, description, title, onClick }) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = async () => {
        try {
            await onClick();
            handleClose();
        } catch (error) {
            console.log('Failed to execute action');
        }
        };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="text-xs bg-transparent hover:text-lg hover:bg-transparent border-none"
                >
                    {icon}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                {children}
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                    <Button type="button" onClick={handleClick}>Yes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DialogMessage;

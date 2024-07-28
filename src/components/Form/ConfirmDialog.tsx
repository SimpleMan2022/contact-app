import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import { RiInformation2Line } from "react-icons/ri";
import { Button } from "@/components/ui/button.tsx";
import { useDarkMode } from "@/context/useDarkMode.tsx"; // Import the dark mode hook

const ConfirmationDialog: React.FC<{ isDialogOpen: boolean; setIsDialogOpen: (open: boolean) => void; confirmSubmit: () => void }> = ({ isDialogOpen, setIsDialogOpen, confirmSubmit }) => {
    const { isDarkMode } = useDarkMode(); // Get the dark mode state

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className={`sm:max-w-[425px] ${isDarkMode ? 'dark text-white' : 'bg-white text-black'}`}>
                <DialogHeader className="flex justify-center items-center">
                    <DialogTitle>
                        <RiInformation2Line size={50} className={`${isDarkMode ? 'text-white' : 'text-black'}`} />
                    </DialogTitle>
                    <DialogDescription className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <b className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Notice</b>: By clicking "Send Message," you acknowledge that your
                        message may be visible to other users.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant={"neo"} onClick={confirmSubmit}>
                        Send
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmationDialog;

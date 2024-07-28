import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {RiCheckLine, RiCloseLine} from "react-icons/ri";

const SubmitStatusDialog: React.FC<{ isSubmitSuccess: boolean | null; messageAPI: string; setIsSubmitSuccess: (success: boolean | null) => void }> = ({ isSubmitSuccess, messageAPI, setIsSubmitSuccess }) => (
    isSubmitSuccess !== null && (
        <Dialog open={true} onOpenChange={() => setIsSubmitSuccess(null)}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="flex justify-center items-center">
                    <DialogTitle>
                        {isSubmitSuccess ? (
                            <RiCheckLine size={50} className="text-green-500" />
                        ) : (
                            <RiCloseLine size={50} className="text-red-500" />
                        )}
                    </DialogTitle>
                    <DialogDescription>
                        {messageAPI}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant={"neo"} onClick={() => setIsSubmitSuccess(null)}>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
);

export default SubmitStatusDialog;
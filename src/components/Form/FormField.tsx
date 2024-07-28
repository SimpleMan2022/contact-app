import { Label } from "../ui/label";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useDarkMode } from "@/context/useDarkMode.tsx"; // Import the dark mode hook

const FormFields: React.FC<{ register: any; formState: any; isAnonymous: boolean }> = ({ register, formState, isAnonymous }) => {
    const { isDarkMode } = useDarkMode(); // Get the dark mode state

    return (
        <>
            <div className={`mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                <Label htmlFor="username" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Username
                </Label>
                <Input
                    type="text"
                    id="username"
                    disabled={isAnonymous}
                    {...register("username")}
                    placeholder={isAnonymous ? "Anonymous" : "Budiono Siregar"}
                    className={`mt-1 ${isDarkMode ? 'dark text-white placeholder-gray-400' : 'bg-white text-black placeholder-gray-600'} border ${isDarkMode ? 'border-gray-700 shadow-custom' : 'border-gray-300'}`}
                />
                {formState.errors.username && (
                    <p className="text-red-500 text-sm font-medium mt-2">{formState.errors.username.message}</p>
                )}
            </div>
            <div className={`mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                <Label htmlFor="message" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Message
                </Label>
                <Textarea
                    rows={8}
                    id="message"
                    {...register("message")}
                    placeholder="Type your message here."
                    className={`mt-1 ${isDarkMode ? 'dark text-white placeholder-gray-400' : 'bg-white text-black placeholder-gray-600'} border ${isDarkMode ? 'border-gray-700 shadow-custom' : 'border-gray-300'}`}
                />
                {formState.errors.message && (
                    <p className="text-red-500 text-sm font-medium mt-2">{formState.errors.message?.message}</p>
                )}
            </div>
        </>
    );
};

export default FormFields;

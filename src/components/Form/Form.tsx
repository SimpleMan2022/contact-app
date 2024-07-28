import { Button } from "@/components/ui/button.tsx";
import { RiSendPlane2Line } from "react-icons/ri";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { useCallback, useState } from "react";
import { avatarList } from "@/data/avatar.ts";
import useLoading from "@/hooks/useLoading.ts";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendMessage } from "@/services/message.service.ts";
import { SendMessageFailureResponse, SendMessageSuccessResponse } from "@/types/api.ts";
import LoadingSkeleton from "@/components/Form/LoadingSkeleton.tsx";
import AvatarSelector from "@/components/Form/AvatarSelector.tsx";
import FormFields from "@/components/Form/FormField.tsx";
import ConfirmationDialog from "@/components/Form/ConfirmDialog.tsx";
import SubmitStatusDialog from "@/components/Form/SubmitStatusDialog.tsx";
import { useDarkMode } from "@/context/useDarkMode.tsx";

const formInputSchema = z.object({
  username: z.string().nullable().refine((val) => {
    if (val === null || val === "") return true;
    return val.length >= 3 && val.length <= 12;
  }, {
    message: "Username must be between 3 and 12 characters"
  }),
  message: z.string()
      .min(3, "Message must be at least 3 characters")
      .max(300, "Message must be less than 100 characters"),
  avatarSrc: z.string(),
});

const FormInput: React.FC = () => {
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [currentAvatarIdx, setCurrentAvatarIdx] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState<boolean | null>(null);
  const [messageAPI, setMessageAPI] = useState<string>("");
  const isLoading = useLoading();
  const { isDarkMode } = useDarkMode();

  type FormInput = z.infer<typeof formInputSchema>;
  const form = useForm<FormInput>({
    resolver: zodResolver(formInputSchema)
  });

  const { register, handleSubmit, formState, reset, setValue } = form;

  const handleNextAvatar = useCallback(() => {
    setCurrentAvatarIdx((prevIndex: number) => {
      const nextIndex = (prevIndex + 1) % avatarList.length;
      setValue("avatarSrc", avatarList[nextIndex].src); // Update avatarSrc when avatar changes
      return nextIndex;
    });
  }, [setValue]);

  const handlePreviousAvatar = useCallback(() => {
    const prevIndex = currentAvatarIdx === 0 ? avatarList.length - 1 : currentAvatarIdx - 1;
    setCurrentAvatarIdx(prevIndex);
    setValue("avatarSrc", avatarList[prevIndex].src); // Update avatarSrc when avatar changes
  }, [currentAvatarIdx, setValue]);

  const toggleAnonymous = useCallback(() => {
    setIsAnonymous((prev) => {
      const newIsAnonymous = !prev;
      if (newIsAnonymous) {
        reset({
          username: null,
          avatarSrc: avatarList[currentAvatarIdx].src // Reset avatarSrc when toggling anonymous
        });
      }
      return newIsAnonymous;
    });
  }, [reset, currentAvatarIdx]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await sendMessage(values.username || "Anonymous", values.message, values.avatarSrc);
      if ((response as SendMessageSuccessResponse).status === 'success') {
        setIsSubmitSuccess(true);
        setMessageAPI((response as SendMessageSuccessResponse).message);
      } else {
        setIsSubmitSuccess(false);
        setMessageAPI((response as SendMessageFailureResponse).message);
      }
      reset({
        username: isAnonymous ? null : "",
        message: "",
        avatarSrc: avatarList[0].src // Reset avatarSrc after submit
      });
    } catch (error) {
      setIsSubmitSuccess(false);
      setMessageAPI('An unexpected error occurred.');
    } finally {
      setIsDialogOpen(false);
    }
  });

  const handleFormSubmit = () => {
    setIsDialogOpen(true);
  };

  const confirmSubmit = () => {
    onSubmit();
  };

  return (
      <div className={`mt-20 flex justify-center items-center ${isDarkMode ? 'dark' : 'bg-white'}`}>
        <div className={`w-full md:w-1/2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          {isLoading ? (
              <LoadingSkeleton/>
          ) : (
              <>
                <form onSubmit={handleFormSubmit} className={`p-4 ${isDarkMode ? 'dark' : ''}  rounded-md`}>
                  <AvatarSelector
                      currentAvatarIdx={currentAvatarIdx}
                      handleNextAvatar={handleNextAvatar}
                      handlePreviousAvatar={handlePreviousAvatar}
                  />
                  <FormFields register={register} formState={formState} isAnonymous={isAnonymous} />
                  <input type="hidden" {...register("avatarSrc")} value={avatarList[currentAvatarIdx].src} /> {/* Hidden input for avatarSrc */}
                  <div className="flex items-center space-x-2 mb-3">
                    <Checkbox id="terms" onClick={toggleAnonymous} className={`${isDarkMode ? 'border-white' : ''}`} />
                    <label
                        htmlFor="terms"
                        className={`text-sm font-medium leading-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                    >
                      Send as anonymous
                    </label>
                  </div>
                  <div className="mb-3">
                    <Button type="button" variant={"neo"} className="w-full" onClick={handleFormSubmit}>
                      Send Message <RiSendPlane2Line size={22} />
                    </Button>
                  </div>
                </form>
                <ConfirmationDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} confirmSubmit={confirmSubmit} />
                {isSubmitSuccess !== null && (
                    <SubmitStatusDialog isSubmitSuccess={isSubmitSuccess} messageAPI={messageAPI} setIsSubmitSuccess={setIsSubmitSuccess} />
                )}
              </>
          )}
        </div>
      </div>
  );
};

export default FormInput;

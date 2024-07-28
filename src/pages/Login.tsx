import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { otpVerification } from "@/services/auth.service";
import { useAuthenticate } from "@/context/useAuthenticate";

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
});

const LoginPages = () => {
    const {setToken } = useAuthenticate();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    });
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const response = await otpVerification(data.pin);
        if (response.status === "success") {
            setToken(response.data);
            sessionStorage.setItem("token", response.data)
            window.location.href = "/messages";
        } else {
            form.setError("pin", {
                type: "manual",
                message: response.message,
            });
        }
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center p-4">
            <div className="w-full max-w-sm">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="pin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>One-Time Password</FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={9} {...field} className="w-full">
                                            <InputOTPGroup className="flex flex-wrap gap-1">
                                                <InputOTPSlot index={0} className="flex-1 min-w-[2rem]" />
                                                <InputOTPSlot index={1} className="flex-1 min-w-[2rem]" />
                                                <InputOTPSlot index={2} className="flex-1 min-w-[2rem]" />
                                                <InputOTPSeparator className="hidden sm:block" />
                                                <InputOTPSlot index={3} className="flex-1 min-w-[2rem]" />
                                                <InputOTPSlot index={4} className="flex-1 min-w-[2rem]" />
                                                <InputOTPSlot index={5} className="flex-1 min-w-[2rem]" />
                                                <InputOTPSeparator className="hidden sm:block" />
                                                <InputOTPSlot index={6} className="flex-1 min-w-[2rem]" />
                                                <InputOTPSlot index={7} className="flex-1 min-w-[2rem]" />
                                                <InputOTPSlot index={8} className="flex-1 min-w-[2rem]" />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormDescription>
                                        Please enter the one-time password to access admin.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full sm:w-auto">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default LoginPages;

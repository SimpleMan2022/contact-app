import {GetTokenSuccessResponse, SendMessageFailureResponse} from "@/types/api.ts";
import axios from "axios";

export const otpVerification = async (otp: string): Promise<GetTokenSuccessResponse | SendMessageFailureResponse> => {
    try {
        const response = await axios.post<GetTokenSuccessResponse>("https://contact.aditnugroho.my.id/backend/auth/login", {
            otp,
        });

        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            return {
                status: 'failed',
                status_code: response.status,
                message: 'Unexpected error occurred.',
            };
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data || {
                status: 'failed',
                status_code: 500,
                message: 'An error occurred while sending the message.',
            };
        } else {
            return {
                status: 'failed',
                status_code: 500,
                message: 'An unexpected error occurred.',
            };
        }
    }
}
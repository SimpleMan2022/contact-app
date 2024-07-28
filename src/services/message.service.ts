import axios, { AxiosResponse } from 'axios';
import {
    GetMessagesFailureResponse,
    GetMessagesSuccessResponse,
    SendMessageFailureResponse,
    SendMessageSuccessResponse
} from "@/types/api.ts";

const BASE_URL = "https://contact.aditnugroho.my.id/backend/messages";

interface ApiErrorResponse {
    status: 'failed';
    status_code: number;
    message: string;
}

const isErrorResponse = (data: any): data is ApiErrorResponse => {
    return data && typeof data.status === 'string' && typeof data.status_code === 'number' && typeof data.message === 'string';
}

const handleResponse = <T>(response: AxiosResponse<T>): T | ApiErrorResponse => {
    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        const message = isErrorResponse(response.data) ? response.data.message : 'Unexpected error occurred.';
        return {
            status: 'failed',
            status_code: response.status,
            message: message,
        };
    }
};

const handleError = (error: unknown): ApiErrorResponse => {
    if (axios.isAxiosError(error)) {
        return error.response?.data || {
            status: 'failed',
            status_code: 500,
            message: 'An error occurred while processing the request.',
        };
    } else {
        return {
            status: 'failed',
            status_code: 500,
            message: 'An unexpected error occurred.',
        };
    }
};

export const sendMessage = async (username: string, content: string, avatar: string): Promise<SendMessageSuccessResponse | SendMessageFailureResponse> => {
    try {
        const response = await axios.post<SendMessageSuccessResponse>(BASE_URL, { username, avatar, content });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const getAllMessage = async (): Promise<GetMessagesSuccessResponse | GetMessagesFailureResponse> => {
    try {
        const response = await axios.get<GetMessagesSuccessResponse>(BASE_URL);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const likeMessage = async (id: number): Promise<GetMessagesSuccessResponse | GetMessagesFailureResponse> => {
    try {
        const response = await axios.put<GetMessagesSuccessResponse>(`${BASE_URL}/${id}/like`);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const disLikeMessage = async (id: number): Promise<GetMessagesSuccessResponse | GetMessagesFailureResponse> => {
    try {
        const response = await axios.put<GetMessagesSuccessResponse>(`${BASE_URL}/${id}/dislike`);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const deleteMessage = async (id: number): Promise<GetMessagesSuccessResponse | GetMessagesFailureResponse> => {
    try {
        const response = await axios.delete<GetMessagesSuccessResponse>(`${BASE_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            }
        });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const createReply = async (id: number, content: string): Promise<GetMessagesSuccessResponse | GetMessagesFailureResponse> => {
    try {
        const response = await axios.post<GetMessagesSuccessResponse>(`${BASE_URL}/${id}/reply`, { content }, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            }
        });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

export const deleteReply = async (id: number): Promise<GetMessagesSuccessResponse | GetMessagesFailureResponse> => {
    try {
        const response = await axios.delete<GetMessagesSuccessResponse>(`${BASE_URL}/reply/${id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            }
        });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

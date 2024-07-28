export type SendMessageSuccessResponse = {
    status: 'success';
    status_code: number;
    message: string;
}

export type SendMessageFailureResponse = {
    status: 'failed';
    status_code: number;
    message: string;
}

export interface Sender {
    id: number;
    username: string;
    avatar: string;
    content: string;
    likes: number;
    created_at: string;
}

export interface Reply {
    id: number;
    content: string;
    created_at: string;
}

export interface Message {
    sender: Sender;
    reply: Reply | null;
}

export interface GetMessagesSuccessResponse {
    status: "success";
    status_code: 200;
    message: string;
    data: Message[];
}

export interface GetMessagesFailureResponse {
    status: "failed";
    status_code: number;
    message: string;
}

export interface WebSocketMessage {
    id: number;
    content: string;
    createdAt: string;
    messageId?: number; // Optional if it's a reply
}

export interface GetTokenSuccessResponse {
    status: "success";
    status_code: 200;
    message: string;
    data: string;
}
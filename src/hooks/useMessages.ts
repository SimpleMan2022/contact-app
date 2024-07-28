import { useState, useEffect, useCallback } from 'react';
import { getAllMessage } from '@/services/message.service'; // Import service API
import { GetMessagesSuccessResponse } from '@/types/api';
import useWebSocket from '@/hooks/useWebsocket.ts';

const useMessages = () => {
    const [data, setData] = useState<GetMessagesSuccessResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            try {
                const response = await getAllMessage();
                if (response.status === 'success') {
                    setData(response);
                } else {
                    setError(response.message);
                }
            } catch (error) {
                setError('An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    const handleWebSocketMessage = useCallback((messageData: any) => {
        // Ignore empty data
        if (
            (!messageData.sender || Object.keys(messageData.sender).length === 0) &&
            (!messageData.reply || Object.keys(messageData.reply).length === 0)
        ) {
            return;
        }

        setData(prevData => {
            if (!prevData) return { status: 'success', status_code: 200, message: 'Data updated', data: [] };

            let updatedData = [...prevData.data];

            // Handle reply update
            if (messageData.reply && messageData.reply.messageId) {
                updatedData = updatedData.map(message => {
                    if (message.sender.id === messageData.reply.messageId) {
                        return {
                            ...message,
                            reply: {
                                id: messageData.reply.id,
                                content: messageData.reply.content,
                                created_at: messageData.reply.createdAt
                            }
                        };
                    }
                    return message;
                });
            }

            // Handle new sender message or update existing sender message
            if (messageData.sender) {
                const existingSenderIndex = updatedData.findIndex(message => message.sender.id === messageData.sender.id);
                if (existingSenderIndex !== -1) {
                    // Update existing sender message
                    updatedData[existingSenderIndex] = {
                        ...updatedData[existingSenderIndex],
                        sender: {
                            ...updatedData[existingSenderIndex].sender,
                            username: messageData.sender.username,
                            avatar: messageData.sender.avatar,
                            content: messageData.sender.content,
                            likes: messageData.sender.likes,
                            created_at: messageData.sender.createdAt,
                        },
                        reply: messageData.reply ? {
                            id: messageData.reply.id,
                            content: messageData.reply.content,
                            created_at: messageData.reply.createdAt
                        } : updatedData[existingSenderIndex].reply
                    };
                } else {
                    // Add new sender message
                    updatedData.unshift({
                        sender: {
                            id: messageData.sender.id,
                            username: messageData.sender.username,
                            avatar: messageData.sender.avatar,
                            content: messageData.sender.content,
                            likes: messageData.sender.likes,
                            created_at: messageData.sender.createdAt,
                        },
                        reply: messageData.reply ? {
                            id: messageData.reply.id,
                            content: messageData.reply.content,
                            created_at: messageData.reply.createdAt
                        } : null
                    });
                }
            }

            return {
                ...prevData,
                data: updatedData,
            };
        });
    }, []);

    useWebSocket('wss://contact.aditnugroho.my.id/backend/ws', handleWebSocketMessage);
    return { data, loading, error };
};

export default useMessages;

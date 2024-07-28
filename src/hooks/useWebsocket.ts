import {useEffect, useState} from 'react';
import { WebSocketMessage } from '@/types/api'; // Import WebSocketMessage type

const useWebSocket = (url: string, onMessage: (data: WebSocketMessage) => void) => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    useEffect(() => {
        const newWs = new WebSocket(url);

        newWs.onopen = () => {
            console.log('WebSocket connection established');
        };

        newWs.onmessage = (event) => {
            // Convert data to string if necessary
            const data = typeof event.data === 'string' ? event.data : new TextDecoder().decode(event.data);
            try {
                const parsedData: WebSocketMessage = JSON.parse(data);
                onMessage(parsedData);
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        newWs.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        newWs.onclose = (event) => {
            console.log('WebSocket connection closed:', event.code, event.reason);
        };

        setWs(newWs)
        return () => {
            if (newWs.readyState === WebSocket.OPEN) {
                newWs.close();
            }
        };
    }, [url, onMessage]);
    return ws
};

export default useWebSocket;

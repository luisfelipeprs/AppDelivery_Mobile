import { useEffect, useRef, useState } from 'react';

type WebSocketMessageHandler = (data: any) => void;
type WebSocketErrorHandler = (error: string) => void;
type WebSocketCloseHandler = (event: CloseEvent) => void;

export const useWebSocketTracking = (
    onMessage: WebSocketMessageHandler,
    onError: WebSocketErrorHandler,
    onClose: WebSocketCloseHandler
) => {
    const [connectionStatus, setConnectionStatus] = useState<string>('Disconnected');
    const webSocketRef = useRef<WebSocket | null>(null);

    // Função para conectar ao WebSocket
    const connect = (orderId: string) => {
        if (webSocketRef.current) {
            console.warn('Já existe uma conexão WebSocket aberta.');
            return; // Não tenta conectar se já houver uma conexão
        }

        const wsUrl = `wss://8552-187-108-255-14.ngrok-free.app/WebSocketTrackingDelivery/ws/${orderId}`;
        console.log("wsUrl > ", wsUrl);
        
        const webSocket = new WebSocket(wsUrl);
        webSocketRef.current = webSocket;

        webSocket.onopen = () => {
            console.log(`Connected to WebSocket for order ${orderId}`);
            setConnectionStatus('Connected');
        };

        webSocket.onmessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            console.log('Data received from WebSocket:', data);
            onMessage(data); // Chama o callback para tratar os dados recebidos
        };

        webSocket.onerror = (error: Event) => {
            console.error('WebSocket error:', error);
            onError(error.toString());
            setConnectionStatus('Error');
        };

        webSocket.onclose = (event: CloseEvent) => {
            console.log('WebSocket closed:', event.reason);
            setConnectionStatus('Disconnected');
            onClose(event); // Callback para tratar o fechamento
            webSocketRef.current = null; // Limpa a referência quando a conexão é fechada
        };
    };

    // Função para fechar a conexão WebSocket
    const closeConnection = () => {
        if (webSocketRef.current) {
            webSocketRef.current.close();
        }
    };

    return { connect, closeConnection, connectionStatus };
};

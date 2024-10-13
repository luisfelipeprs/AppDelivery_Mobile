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

    const connect = (orderId: string) => {
        if (webSocketRef.current) {
            console.warn('Já existe uma conexão WebSocket aberta.');
            return;
        }

        const wsUrl = `wss://9904-187-108-255-14.ngrok-free.app/WebSocketTrackingDelivery/ws/${orderId}`;
        console.log("Tentando conectar ao WebSocket com URL:", wsUrl);
        
        const webSocket = new WebSocket(wsUrl);
        webSocketRef.current = webSocket;

        webSocket.onopen = () => {
            console.log(`Conexão WebSocket estabelecida para a ordem ${orderId}`);
            setConnectionStatus('Connected');
        };

        webSocket.onmessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            console.log('Dados recebidos do WebSocket:', data);
            onMessage(data);
        };

        webSocket.onerror = (error: Event) => {
            console.error('Erro no WebSocket:', error);
            onError(error.toString());
            setConnectionStatus('Error');
        };

        webSocket.onclose = (event: CloseEvent) => {
            console.log('Conexão WebSocket fechada:', event.reason);
            setConnectionStatus('Disconnected');
            onClose(event);
            webSocketRef.current = null; // Limpa a referência após o fechamento
        };
    };

    const closeConnection = (orderId: string) => {
        console.log('Tentando fechar a conexão WebSocket...');
    
        if (webSocketRef.current) {
            // Prepare a mensagem de encerramento
            const closeMessage = JSON.stringify({ action: 'close', orderId: orderId });
    
            // Envie a mensagem de encerramento
            webSocketRef.current.send(closeMessage);
            console.log('Mensagem de encerramento enviada:', closeMessage);
    
            // Fechar a conexão
            webSocketRef.current.close(); // Fechando a conexão WebSocket
            webSocketRef.current = null; // Limpa a referência
            setConnectionStatus('Disconnected');
        } else {
            console.warn('Não há conexão WebSocket para fechar.');
        }
    };
    
    

    const sendMessage = (message: string) => {
        console.log("webSocketRef > ", webSocketRef.current);
        
        if (webSocketRef.current) {
            webSocketRef.current.send(message);
            console.log('Mensagem enviada:', message);
        } else {
            console.warn('Não é possível enviar a mensagem. Verifique se a conexão está aberta.');
        }
    };

    const sendLocationUpdate = (orderId: string, latitude: number, longitude: number) => {
        const message = {
            type: 'LOCATION_UPDATE', // Define o tipo da mensagem
            orderId,
            latitude,
            longitude,
        };

        sendMessage(JSON.stringify(message)); // Envie a mensagem formatada como JSON
    };

    return { connect, closeConnection, sendMessage, sendLocationUpdate, connectionStatus };
};

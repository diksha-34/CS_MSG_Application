package com.example.CS_MsgApp.Websockets;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Component
public class MessageWebSocketHandler extends TextWebSocketHandler {

    // Store connected sessions in a synchronized Set
    private  Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<>());

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        synchronized (sessions) {
            sessions.add(session);
        }
        System.out.println("New WebSocket sessions are: " + sessions);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) throws Exception {
        synchronized (sessions) {
            sessions.remove(session);
        }
        System.out.println("WebSocket connection closed: " + session.getId());
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // You can handle incoming messages here if needed
    }

    // Method to broadcast message to all sessions in a synchronized manner

    public void broadcast(String message) throws IOException {
        synchronized (sessions) {
            System.out.println("There are " + sessions.size() + " sessions"); // Corrected
            for (WebSocketSession session : sessions) {
                if (session.isOpen()) {
                    session.sendMessage(new TextMessage(message));
                    System.out.println("Message sent to session: " + session.getId());
                }
            }
        }
    }

}

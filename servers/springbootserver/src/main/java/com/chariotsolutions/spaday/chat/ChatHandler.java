package com.chariotsolutions.spaday.chat;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

@Component
public class ChatHandler extends TextWebSocketHandler {
    private static Logger logger = Logger.getLogger(ChatHandler.class.getName());

    private static String botName = "SpaBot";

    private Map<WebSocketSession, String> sessionMap = new HashMap<>();

    private List<ChatProtocol> history = new ArrayList<>();

    private Gson gson = new Gson();

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message)  {
        try {

            ChatProtocol chatProtocol = gson.fromJson(message.getPayload(), ChatProtocol.class);

            if (chatProtocol.name != null && chatProtocol.message == null) {
                handleChatRegistrationRequest(session, chatProtocol);
            } else if (chatProtocol.message != null) {
                handleChatMessage(session, chatProtocol);
            }

        } catch(JsonParseException | IOException parseException) {
            logger.log(Level.INFO, "unable to parse message: " + message.getPayload());
        }
    }

    private void handleChatRegistrationRequest(WebSocketSession session, ChatProtocol registrationRequest) throws IOException {
        sessionMap.put(session, registrationRequest.name);
        session.sendMessage(new TextMessage(gson.toJson(registrationResponse())));

        ChatProtocol response = systemMessage(registrationRequest.name + " has entered the chat");
        history.add(response);
        broadcast(response);
    }

    private void handleChatMessage(WebSocketSession session, ChatProtocol chatMessage) throws IOException {
        String name = sessionMap.get(session);
        ChatProtocol response = chatMessage(name, chatMessage.message);
        history.add(response);
        broadcast(response);
    }

    private void broadcast(ChatProtocol protocol) throws IOException {
        String json = gson.toJson(protocol);
        for (WebSocketSession webSocketSession : sessionMap.keySet()) {
            webSocketSession.sendMessage(new TextMessage(json));
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession closedSession, CloseStatus status) throws Exception {
        String name = sessionMap.get(closedSession);
        sessionMap.remove(closedSession);

        ChatProtocol response = systemMessage(name + " has left the chat");
        history.add(response);
        broadcast(response);
    }

    private ChatProtocol chatMessage(String name, String message) {
        ChatProtocol result = new ChatProtocol();
        result.name = name;
        result.message = message;
        return result;
    }

    private ChatProtocol systemMessage(String message) {
        return chatMessage(botName, message);
    }

    private ChatProtocol registrationResponse() {
        ChatProtocol result = new ChatProtocol();
        result.name = botName;
        result.messages = history;
        return result;
    }

    public static class ChatProtocol {
        String name;
        String message;
        List<ChatProtocol> messages;
    }
}

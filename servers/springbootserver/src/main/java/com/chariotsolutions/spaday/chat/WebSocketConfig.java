package com.chariotsolutions.spaday.chat;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        System.out.println("!!!!!!!!!!! Configuring Websocket");
        registry.addHandler(new ChatHandler(), "/chat").setAllowedOrigins("*");
    }
}

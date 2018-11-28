export interface ChatMessage {
  name: string;
  message: string;
}

export interface ChatRegistrationRequest {
  name: string;
}

export interface ChatRegistrationResponse {
  name: string;
  messages: ChatMessage[];
}

export type ChatProtocol = ChatMessage | ChatRegistrationRequest | ChatRegistrationResponse;


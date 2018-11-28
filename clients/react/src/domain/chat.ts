export interface ChatMessage {
    name: string,
    message: string,
}

export interface ChatRegistrationRequest {
    name: string,
}

export interface ChatRegistrationSuccess {
    name: string,
    registered: true
}

export interface ChatError {
    error: string,
}

export type ChatProtocol = ChatMessage | ChatRegistrationRequest | ChatRegistrationSuccess | ChatError

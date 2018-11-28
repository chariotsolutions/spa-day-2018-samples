export interface Registration {
    sessionId: number,
    name: string;
    email: string;
    treatment: string;
}

export interface ApiRegistration {
    name: string;
    email: string;
    treatment: string;
}

export const registrationToApi: (registration: Registration) => ApiRegistration =
    ({ name, email, treatment }) => ({ name, email, treatment })

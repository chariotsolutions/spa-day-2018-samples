import { Registration } from './registration';

export interface Session {
    id: number;
    name: string;
    date: Date;
    registrations: Registration[],
}

/**
 * the session we get from the API doesn't match what we want in our internal model,
 * because it doesn't associate the list of registrations.
 */
export interface ApiSession {
    id: number;
    name: string;
    date: Date;
}

export const apiToSession: (session: ApiSession, registrations: Registration[]) => Session =
  (session, registrations) => ({ ...session, registrations })

export interface User {
    displayName: string | null;
    email: string | null;
    emailVerified: boolean;
    uid: string;

    creationTime: string;
    lastSignInTime: string;
}
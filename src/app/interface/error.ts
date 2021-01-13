export interface Error {
    timestamp: string;
    status: number;
    error: Array<any>;
    message: string;
    path: string;
}

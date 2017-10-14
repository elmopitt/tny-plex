export declare class PlexClient {
    private readonly serverAddress;
    private readonly token;
    constructor(serverAddress: string, token: string);
    fetchPlaylists(): Promise<string>;
    get(urlSegment: string): Promise<string>;
}

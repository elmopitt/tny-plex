/// <reference types="node" />
import { Playlist } from './models/playlist';
export declare class PlexClient {
    private readonly serverAddress;
    private readonly token;
    constructor(serverAddress: string, token: string);
    fetchPlaylists(): Promise<Playlist[]>;
    fetchThumbnail(urlOrModel: string | Playlist): Promise<Buffer>;
    /**
     * Returns a promise to the parsed XML response for the given url segment.
     */
    getXml(urlSegment: string): Promise<any>;
}

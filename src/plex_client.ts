import * as http from 'http';

export class PlexClient {
    constructor(private readonly serverAddress: string, private readonly token: string) {}

    fetchPlaylists(): Promise<string> {
        return this.get('/playlists/all');
    }

    get(urlSegment: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const url = `${this.serverAddress}${urlSegment}?X-Plex-Token=${this.token}`;
            let error: Error|null = null;
            http.get(url, (response: http.IncomingMessage) => {
                if (response.statusCode != 200) {
                    error = Error(`${response.statusCode}: ${response.statusMessage}`);
                }
                if (error) {
                    response.resume();
                    reject(error);
                    return;
                }
                response.setEncoding('utf8');

                let dataString = '';
                response.on('data', (chunk) => {
                    dataString += chunk;
                }).on('end', () => {
                    if (!error) {
                        resolve(dataString);
                    }
                }).on('error', (dataError) => {
                    error = dataError;
                    reject(error);
                });
            }).on('error', (getError) => {
                error = getError;
                reject(error);
            });;
        })
    }
}

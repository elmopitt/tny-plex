"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
class PlexClient {
    constructor(serverAddress, token) {
        this.serverAddress = serverAddress;
        this.token = token;
    }
    fetchPlaylists() {
        return this.get('/playlists/all');
    }
    get(urlSegment) {
        return new Promise((resolve, reject) => {
            const url = `${this.serverAddress}${urlSegment}?X-Plex-Token=${this.token}`;
            let error = null;
            http.get(url, (response) => {
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
            });
            ;
        });
    }
}
exports.PlexClient = PlexClient;
//# sourceMappingURL=plex_client.js.map
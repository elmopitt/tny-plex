"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const xml2js = require("xml2js");
const playlist_1 = require("./models/playlist");
const xml_1 = require("./xml");
const thumbnailParams = 'width=100&height=100&rows=2&cols=2&border=0&media=thumb&repeat=1';
class PlexClient {
    constructor(serverAddress, token) {
        this.serverAddress = serverAddress;
        this.token = token;
    }
    fetchPlaylists() {
        return this.getXml('/playlists/all').then((parsedXml) => {
            return xml_1.populateElements(parsedXml, 'Playlist')
                .map(xmlElement => new playlist_1.Playlist(xmlElement));
        });
    }
    fetchThumbnail(urlOrModel) {
        let compositeSegment;
        if (typeof urlOrModel === 'string') {
            compositeSegment = urlOrModel;
        }
        else if (urlOrModel instanceof playlist_1.Playlist) {
            compositeSegment = urlOrModel.composite;
        }
        else {
            throw Error(`Unsupported fetchThumbnail type: ${typeof urlOrModel}`);
        }
        const url = `${this.serverAddress}${compositeSegment}?${thumbnailParams}&X-Plex-Token=${this.token}`;
        return new Promise((resolve, reject) => {
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
                let dataBuffer;
                response.on('data', (chunk) => {
                    if (!(chunk instanceof Buffer)) {
                        error = Error(`Received non-buffer when fetching thumbnail: ${typeof chunk}`);
                        reject(error);
                        return;
                    }
                    if (!dataBuffer) {
                        dataBuffer = Buffer.from(chunk);
                    }
                    else {
                        dataBuffer = Buffer.concat([dataBuffer, chunk]);
                    }
                }).on('end', () => {
                    if (!error) {
                        resolve(dataBuffer);
                    }
                }).on('error', (dataError) => {
                    error = dataError;
                    reject(error);
                });
            }).on('error', (getError) => {
                error = getError;
                reject(error);
            });
        });
    }
    /**
     * Returns a promise to the parsed XML response for the given url segment.
     */
    getXml(urlSegment) {
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
                        xml2js.parseString(dataString, (xmlError, xml) => {
                            if (xmlError) {
                                error = xmlError;
                                reject(error);
                            }
                            else {
                                resolve(xml);
                            }
                        });
                    }
                }).on('error', (dataError) => {
                    error = dataError;
                    reject(error);
                });
            }).on('error', (getError) => {
                error = getError;
                reject(error);
            });
        });
    }
}
exports.PlexClient = PlexClient;
//# sourceMappingURL=plex_client.js.map
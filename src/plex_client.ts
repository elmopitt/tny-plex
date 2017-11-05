import * as http from 'http';
import * as xml2js from 'xml2js';

import {Playlist} from './models/playlist';
import {populateElements} from './xml';

const thumbnailParams = 'width=100&height=100&rows=2&cols=2&border=0&media=thumb&repeat=1'
export class PlexClient {
    constructor(private readonly serverAddress: string, private readonly token: string) {}

    fetchPlaylists(): Promise<Playlist[]> {
        return this.getXml('/playlists/all').then((parsedXml) => {
            return populateElements(parsedXml, 'Playlist')
                .map(xmlElement => new Playlist(xmlElement));
        });
    }
    
    fetchThumbnail(urlOrModel: string|Playlist): Promise<Buffer> {
        let compositeSegment;
        if (typeof urlOrModel === 'string') {
            compositeSegment = urlOrModel;
        } else if (urlOrModel instanceof Playlist) {
            compositeSegment = urlOrModel.composite;
        } else {
            throw Error(`Unsupported fetchThumbnail type: ${typeof urlOrModel}`);
        }
        const url =
            `${this.serverAddress}${compositeSegment}?${thumbnailParams}&X-Plex-Token=${this.token}`;
        return new Promise((resolve, reject) => {
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
                let dataBuffer: Buffer;
                response.on('data', (chunk) => {
                    if (!(chunk instanceof Buffer)) {
                        error = Error(`Received non-buffer when fetching thumbnail: ${
                            typeof chunk}`);
                        reject(error);
                        return;
                    }
                    if (!dataBuffer) {
                        dataBuffer = Buffer.from(chunk);
                    } else {
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
    getXml(urlSegment: string): Promise<any> {
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
                        xml2js.parseString(dataString, (xmlError, xml) => {
                            if (xmlError) {
                                error = xmlError;
                                reject(error);
                            } else {
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
        })
    }
}

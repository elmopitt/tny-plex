"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plex_client_1 = require("./plex_client");
const testServerAddress = 'http://<host>:<port>';
const testToken = 'This is the value X-Plex-Token seen in network traffic';
describe('PlexClient', () => {
    let client;
    beforeEach(() => {
        client = new plex_client_1.PlexClient(testServerAddress, testToken);
    });
    it('should fetch playlists', (done) => {
        client.fetchPlaylists().then((dataString) => {
            expect(dataString).toBeTruthy();
            console.log(dataString);
            done();
        }, (error) => {
            fail(error);
            done();
        });
    });
});
//# sourceMappingURL=plex_client_test.js.map
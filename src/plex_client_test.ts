import {PlexClient} from './plex_client';

const testServerAddress = 'http://<host>:<port>';
const testToken = 'This is the value X-Plex-Token seen in network traffic';

describe('PlexClient', () => {
    let client: PlexClient;

    beforeEach(() => {
        client = new PlexClient(testServerAddress, testToken);
    })
    it('should fetch playlists', (done) => {
        client.fetchPlaylists().then(
            (dataString) => {
                expect(dataString).toBeTruthy();
                console.log(dataString);
                done();
            },
            (error) => {
                fail(error);
                done();
            });
    });
});
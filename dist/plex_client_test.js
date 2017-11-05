"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plex_client_1 = require("./plex_client");
const nock = require("nock");
const testServerAddress = 'http://sever-ip-address-and-port.com';
const testToken = 'token-from-network-console';
const playlistXml = `<?xml version="1.0" encoding="UTF-8"?>
<MediaContainer size="9">
<Playlist ratingKey="31114" key="/playlists/31114/items" guid="com.plexapp.agents.none://e2cd9e44-4414-4eab-8edd-615a19c062bf" type="playlist" title="Alexander Movies" summary="" smart="0" playlistType="video" composite="/playlists/31114/composite/1504566632" viewCount="158" lastViewedAt="1504560983" duration="149286000" leafCount="27" addedAt="1434858034" updatedAt="1504566632">
</Playlist>
<Playlist ratingKey="30866" key="/playlists/30866/items" guid="com.plexapp.agents.none://eeb0fffd-d61f-429c-a2bd-d82f313e97a8" type="playlist" title="Alexander Music" summary="" smart="0" playlistType="audio" composite="/playlists/30866/composite/1505058988" viewCount="10" lastViewedAt="1483155342" duration="8591000" leafCount="42" addedAt="1432265146" updatedAt="1505058988">
</Playlist>
<Playlist ratingKey="32299" key="/playlists/32299/items" guid="com.plexapp.agents.none://67b4c5e4-5de0-41a7-a5a6-4a96d2afb453" type="playlist" title="Christmas Music" summary="" smart="0" playlistType="audio" composite="/playlists/32299/composite/1482771293" viewCount="55" lastViewedAt="1482771300" duration="70928000" leafCount="375" addedAt="1448751385" updatedAt="1482771293">
</Playlist>
<Playlist ratingKey="121608" key="/playlists/121608/items" guid="com.plexapp.agents.none://fa2e8483-6ceb-42e2-89ad-a0c2a3f2a8e3" type="playlist" title="Classical-ish" summary="" smart="0" playlistType="audio" composite="/playlists/121608/composite/1500219819" viewCount="8" lastViewedAt="1483593662" duration="10141000" leafCount="23" addedAt="1473090128" updatedAt="1500219819">
</Playlist>
<Playlist ratingKey="122382" key="/playlists/122382/items" guid="com.plexapp.agents.none://d2ff7ddb-c2c7-4d2a-ba4a-46b3bc4591cd" type="playlist" title="DM-in-progress" summary="" smart="0" playlistType="audio" composite="/playlists/122382/composite/1483593485" viewCount="3" lastViewedAt="1483593576" duration="3048000" leafCount="14" addedAt="1482689580" updatedAt="1483593485">
</Playlist>
<Playlist ratingKey="83183" key="/playlists/83183/items" guid="com.plexapp.agents.none://b043a5f1-0cdd-45fe-aa2f-08f3714451de" type="playlist" title="Driving Music" summary="" smart="0" playlistType="audio" composite="/playlists/83183/composite/1482689988" viewCount="18" lastViewedAt="1482689957" duration="93142000" leafCount="411" addedAt="1464489244" updatedAt="1482689988">
</Playlist>
<Playlist ratingKey="122505" key="/playlists/122505/items" guid="com.plexapp.agents.none://941499ae-8da3-4d0f-96ee-6fde5fe93671" type="playlist" title="Jason albums" summary="" smart="0" playlistType="audio" composite="/playlists/122505/composite/1483593292" duration="2980000" leafCount="14" addedAt="1483592208" updatedAt="1483593292">
</Playlist>
<Playlist ratingKey="31337" key="/playlists/31337/items" guid="com.plexapp.agents.none://7c5cb452-6a69-475e-8034-e7173dc456be" type="playlist" title="Jason&#39;s watchlist" summary="" smart="0" playlistType="video" composite="/playlists/31337/composite/1479365410" viewCount="9" lastViewedAt="1479359639" duration="98745000" leafCount="15" addedAt="1437495861" updatedAt="1479365410">
</Playlist>
<Playlist ratingKey="51996" key="/playlists/51996/items" guid="com.plexapp.agents.none://ba87199b-2c64-4b81-8d24-9ff3f482732d" type="playlist" title="Work Movies" summary="" smart="0" playlistType="video" composite="/playlists/51996/composite/1507939026" viewCount="265" lastViewedAt="1507907424" duration="356603000" leafCount="56" addedAt="1460325971" updatedAt="1507939026">
</Playlist>
</MediaContainer>
`;
describe('PlexClient', () => {
    let client;
    const mockServer = nock(testServerAddress);
    beforeEach(() => {
        mockServer.get('/playlists/all')
            .query({ 'X-Plex-Token': testToken })
            .reply(200, playlistXml);
        client = new plex_client_1.PlexClient(testServerAddress, testToken);
    });
    it('should fetch playlists', (done) => {
        client.fetchPlaylists().then((playlists) => {
            expect(playlists.length).toBe(9);
            expect(playlists[0].key).toBe('/playlists/31114/items');
            done();
        }, (error) => {
            fail(error);
            done();
        });
    });
});
//# sourceMappingURL=plex_client_test.js.map
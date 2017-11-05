"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Playlist {
    constructor(xmlElement) {
        this.xmlElement = xmlElement;
        this.attributes = xmlElement['$'];
        console.log(xmlElement);
    }
    get title() {
        return this.attributes.title;
    }
    get type() {
        return this.attributes.playlisttype;
    }
    get key() {
        return this.attributes.key;
    }
    get composite() {
        return this.attributes.composite;
    }
    get duration() {
        return this.attributes.duration ? Number(this.attributes.duration) : undefined;
    }
}
exports.Playlist = Playlist;
//# sourceMappingURL=playlist.js.map
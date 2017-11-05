import {Attributes} from '../xml';

export class Playlist {
    private readonly attributes: Attributes;

    constructor(private readonly xmlElement: any) {
        this.attributes = xmlElement['$'];
        console.log(xmlElement);        
    }

    get title(): string|undefined {
        return this.attributes.title;
    }

    get playlistType(): string|undefined {
        return this.attributes.playlistType;
    }

    get key(): string|undefined {
        return this.attributes.key;
    }

    get composite(): string|undefined {
        return this.attributes.composite;
    }

    get duration(): number|undefined {
        return this.attributes.duration ? Number(this.attributes.duration) : undefined;
    }
}
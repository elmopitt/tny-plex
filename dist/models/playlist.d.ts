export declare class Playlist {
    private readonly xmlElement;
    private readonly attributes;
    constructor(xmlElement: any);
    readonly title: string | undefined;
    readonly type: string | undefined;
    readonly key: string | undefined;
    readonly composite: string | undefined;
    readonly duration: number | undefined;
}

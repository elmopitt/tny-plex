export interface Attributes {
    [key: string]: string;
}
/**
 * Returns a list of all XML elements with the given name that are contained in the
 * given element.
 */
export declare function populateElements(parentElement: any, elementName: string): any[];

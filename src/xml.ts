export interface Attributes {
    [key: string]: string;
}

/**
 * Returns a list of all XML elements with the given name that are contained in the
 * given element.
 */
export function populateElements(parentElement: any, elementName: string): any[] {
    const objectsToProcess = [parentElement];
    const matchingObjects = [];
    do {
        const currentObject = objectsToProcess.shift();
        for (let name in currentObject) {
            if (name == '$') {
                // Skip attributes.
                continue;
            }
            const value: any = currentObject[name];
            const valueArray: any[] = Array.isArray(value) ? value : [value];
            if (name == elementName) {
                matchingObjects.push(...valueArray);
            } else {
                objectsToProcess.push(...valueArray);
            }
        }
    } while (objectsToProcess.length);
    return matchingObjects;
}

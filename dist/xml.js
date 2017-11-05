"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns a list of all XML elements with the given name that are contained in the
 * given element.
 */
function populateElements(parentElement, elementName) {
    const objectsToProcess = [parentElement];
    const matchingObjects = [];
    do {
        const currentObject = objectsToProcess.shift();
        for (let name in currentObject) {
            if (name == '$') {
                // Skip attributes.
                continue;
            }
            const value = currentObject[name];
            const valueArray = Array.isArray(value) ? value : [value];
            if (name == elementName) {
                matchingObjects.push(...valueArray);
            }
            else {
                objectsToProcess.push(...valueArray);
            }
        }
    } while (objectsToProcess.length);
    return matchingObjects;
}
exports.populateElements = populateElements;
//# sourceMappingURL=xml.js.map
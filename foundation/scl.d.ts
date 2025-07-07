interface CreateElementNSOptions {
    namespaceURI?: string;
    elementPrefix?: string;
}
export declare function createElementNS(doc: XMLDocument, tagname: string, attributes: {
    [key: string]: string;
}, options: CreateElementNSOptions): Element;
export declare function createPowerSystemRelationElement(doc: XMLDocument, relation: string): Element;
/**
 * Traces the path from an element up to the substation and concatenation of each parents name attribute
 * @param element Starting element, must be part of the substation section
 * @returns Concatenation of all parent element's names joined with "/", e.g. "substationName/voltageLevelName/bayName/elementName"
 */
export declare function getProcessPath(element: Element): string;
export {};

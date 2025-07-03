import { createElement } from '@openenergytools/scl-lib/dist/foundation/utils';
import { prefix6100, uri6100, privateType6100 } from './6-100-consts.js';

interface CreateElementNSOptions {
  namespaceURI?: string;
  elementPrefix?: string;
}

export function createElementNS(
  doc: XMLDocument,
  tagname: string,
  attributes: { [key: string]: string },
  options: CreateElementNSOptions
): Element {
  const namespaceURI = options.namespaceURI ?? doc.documentElement.namespaceURI;
  const finalTagname = options.elementPrefix
    ? `${options.elementPrefix}:${tagname}`
    : tagname;

  const element = doc.createElementNS(namespaceURI, finalTagname);

  Object.entries(attributes)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => typeof value === 'string')
    .forEach(([name, value]) => element.setAttribute(name, value));

  return element;
}

export function createPowerSystemRelationElement(
  doc: XMLDocument,
  relation: string
): Element {
  const powerSystemRelations = createElementNS(
    doc,
    'PowerSystemRelations',
    {},
    { elementPrefix: prefix6100, namespaceURI: uri6100 }
  );

  const powerSystemRelation = createElementNS(
    doc,
    'PowerSystemRelation',
    { relation },
    { elementPrefix: prefix6100, namespaceURI: uri6100 }
  );

  const privateElement = createElement(doc, 'Private', {
    type: privateType6100,
  });

  powerSystemRelations.appendChild(powerSystemRelation);
  privateElement.appendChild(powerSystemRelations);

  return privateElement;
}

/**
 * Traces the path from an element up to the substation and concatenation of each parents name attribute
 * @param element Starting element, must be part of the substation section
 * @returns Concatenation of all parent element's names joined with "/", e.g. "substationName/voltageLevelName/bayName/elementName"
 */
export function getProcessPath(element: Element): string {
  const startingElementName = element.getAttribute('name') ?? '';
  const pathParts: string[] = [startingElementName];

  let currentElement = element;
  while (currentElement.parentElement) {
    currentElement = currentElement.parentElement;

    const elementName = currentElement.getAttribute('name') ?? '';
    pathParts.push(elementName);

    if (currentElement.tagName === 'Substation') {
      break;
    }
  }

  return pathParts.reverse().join('/');
}

import { expect } from '@open-wc/testing';

import { testScl } from '../scl-bay-template.testfiles';
import {
  createElementNS,
  createPowerSystemRelationElement,
  getProcessPath,
} from './scl.js';
import { privateType6100 } from './6-100-consts.js';

describe('scl', () => {
  let doc: XMLDocument;

  beforeEach(() => {
    doc = new DOMParser().parseFromString(testScl, 'application/xml');
  });

  describe('getProcessPath', () => {
    const testCases = [
      {
        title: 'ConductingEquipment',
        selector: 'ConductingEquipment[name="QCE1"]',
        expectedPath: 'TEMPLATE/TEMPLATE/TEMPLATE/QCE1',
      },
      {
        title: 'Bay',
        selector: 'Bay[name="TEMPLATE"]',
        expectedPath: 'TEMPLATE/TEMPLATE/TEMPLATE',
      },
    ];

    testCases.forEach(tc => {
      it(`should calculate correct process path for ${tc.title}`, () => {
        const element = doc.querySelector(tc.selector)!;
        const processPath = getProcessPath(element);

        expect(processPath).to.equal(tc.expectedPath);
      });
    });
  });

  describe('createElementNS', () => {
    const testNameSpaceURI = 'http://test.de/2000';
    const testNameSpacePrefix = 'test_2000';

    it('should create element include namespace and prefix', () => {
      const tagname = 'TestElement';

      const element = createElementNS(
        doc,
        tagname,
        {
          name: 'test1',
          height: '200',
        },
        {
          namespaceURI: testNameSpaceURI,
          elementPrefix: testNameSpacePrefix,
        }
      );

      expect(element.tagName).to.equal(`${testNameSpacePrefix}:${tagname}`);
      expect(element.getAttribute('name')).to.equal('test1');
      expect(element.getAttribute('height')).to.equal('200');
      expect(element.namespaceURI).to.equal(testNameSpaceURI);
    });

    it('should use default namespace if non is provided', () => {
      const tagname = 'TestElement';

      const element = createElementNS(doc, tagname, {}, {});

      expect(element.namespaceURI).to.equal(doc.documentElement.namespaceURI);
      expect(element.tagName).to.equal(tagname);
    });
  });

  describe('createPowerSystemRelationElement', () => {
    it('should create power system relations element', () => {
      const relationPath = 'Sub1/VL1/Bay1/SomeElement';

      const privateElement = createPowerSystemRelationElement(
        doc,
        relationPath
      );

      expect(privateElement.getAttribute('type')).to.equal(privateType6100);

      const powerSystemRelationsElement = privateElement.querySelector(
        'PowerSystemRelations'
      )!;
      const powerSystemRelationElement =
        powerSystemRelationsElement.querySelector('PowerSystemRelation')!;

      // eslint-disable-next-line no-unused-expressions
      expect(powerSystemRelationsElement).to.not.be.null;
      // eslint-disable-next-line no-unused-expressions
      expect(powerSystemRelationElement).to.not.be.null;
      expect(powerSystemRelationElement.getAttribute('relation')).to.equal(
        relationPath
      );
    });
  });
});

/* eslint-disable no-unused-expressions */
import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import { restore, spy } from 'sinon';

import SclBayTemplate from './scl-bay-template.js';
import { testScl } from './scl-bay-template.testfiles.js';

describe('SclBayTemplate Plugin', () => {
  customElements.define('scl-bay-template', SclBayTemplate);

  let element: SclBayTemplate;
  let doc: XMLDocument;
  let compasApiMock: any;

  beforeEach(async () => {
    doc = new DOMParser().parseFromString(testScl, 'application/xml');
    compasApiMock = {
      lNodeLibrary: {
        loadLNodeLibrary: async () => {},
        lNodeLibrary: () => undefined,
      },
    };
    element = await fixture(
      html`<scl-bay-template
        .doc=${doc}
        .compasApi=${compasApiMock}
      ></scl-bay-template>`
    );
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('calls compasApi.lNodeLibrary.loadLNodeLibrary on connectedCallback', async () => {
    const loadSpy = spy(compasApiMock.lNodeLibrary, 'loadLNodeLibrary');
    element.connectedCallback();
    expect(loadSpy.calledOnce).to.be.true;
    restore();
  });

  it('should open LNodeType library info dialog when info button is clicked and show name, version, and date', async () => {
    const ssdXml = `<?xml version="1.0" encoding="UTF-8"?>
    <SCL xmlns="http://www.iec.ch/61850/2003/SCL">
      <Header id="Dummy-SSD" version="1.2.3">
        <History>
          <Hitem version="1.2.3" when="2024-06-05T12:34:56Z" who="test.user@example.com" what="Initial"/>
        </History>
        <ToolID>DummyTool</ToolID>
        <Text>Dummy SSD for test</Text>
        <Revision>1.2.3</Revision>
        <Version>1.2.3</Version>
      </Header>
    </SCL>`;
    const ssdDoc = new DOMParser().parseFromString(ssdXml, 'application/xml');
    compasApiMock.lNodeLibrary.lNodeLibrary = () => ssdDoc;
    element.requestUpdate();
    await element.updateComplete;

    expect(element.lnodeLibDialog?.open).to.be.false;
    const button = element.shadowRoot?.querySelector(
      '.btn-group mwc-icon-button'
    ) as HTMLButtonElement;
    button?.click();
    await waitUntil(() => element.lnodeLibDialog?.open);
    await element.lnodeLibDialog?.updateComplete;

    expect(element.lnodeLibDialog?.open).to.be.true;
    const slot =
      element.lnodeLibDialog?.shadowRoot?.querySelector('slot#contentSlot');
    const assignedNodes =
      (slot instanceof HTMLSlotElement
        ? slot.assignedNodes({ flatten: true })
        : []) ?? [];
    const infoDiv = assignedNodes.find(
      node =>
        node.nodeType === Node.ELEMENT_NODE &&
        (node as HTMLElement).querySelector('b')
    ) as HTMLElement | undefined;
    const valueDivs = infoDiv?.querySelectorAll('div') ?? [];
    const fileNameText = valueDivs[0]?.textContent ?? '';
    const versionText = valueDivs[1]?.textContent ?? '';
    const lastUpdateText = valueDivs[2]?.textContent ?? '';

    expect(fileNameText).to.include('Dummy-SSD');
    expect(versionText).to.include('1.2.3');
    expect(lastUpdateText).to.include('05-06-2024');
  });
});

/* eslint-disable no-unused-expressions */
import { html, fixture, expect } from '@open-wc/testing';
import './function-editor.js';
import { testScl } from './scl-bay-template.testfiles.js';

describe('FunctionEditor', () => {
  let element: any;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = new DOMParser().parseFromString(testScl, 'application/xml');
    const func = doc.querySelector('Function');
    element = await fixture(
      html`<compas-function-editor-a1b2c3d4
        .doc=${doc}
        .function=${func}
      ></compas-function-editor-a1b2c3d4>`
    );
    await element.updateComplete;
  });

  it('renders the add subfunction dialog and fields', async () => {
    const addButton = element.shadowRoot.querySelector(
      '[data-testid="add-subfunction-btn"]'
    );
    addButton.click();
    await element.updateComplete;
    const dialog = element.shadowRoot.querySelector('function-element-dialog');
    dialog.open = true;
    await dialog.updateComplete;

    expect(dialog.open).to.be.true;
    const nameField = dialog.shadowRoot.querySelector('#name');
    const descField = dialog.shadowRoot.querySelector('#desc');
    const typeField = dialog.shadowRoot.querySelector('#type');
    expect(nameField).to.exist;
    expect(descField).to.exist;
    expect(typeField).to.exist;
  });

  it('enforces unique subfunction names', async () => {
    const parent = doc.querySelector('Function');
    element.subFunctionDialogParent = parent;

    const addButton = element.shadowRoot.querySelector(
      '[data-testid="add-subfunction-btn"]'
    );
    addButton.click();
    await element.updateComplete;
    const dialog = element.shadowRoot.querySelector('function-element-dialog');
    dialog.open = true;
    await dialog.updateComplete;

    element.subFunctionNameField.value = 'General';
    element.saveSubFunction();
    await element.updateComplete;
    expect(element.subFunctionNameField.validationMessage).to.match(
      /Name must be unique/i
    );
  });
});

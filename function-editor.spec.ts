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

  it('renders the add subfunction dialog and fields', () => {
    element.addSubFunctionDialog.show();
    expect(element.addSubFunctionDialog.open).to.be.true;
    expect(element.subFunctionNameField).to.exist;
    expect(element.subFunctionDescField).to.exist;
    expect(element.subFunctionTypeField).to.exist;
  });

  it('enforces unique subfunction names', async () => {
    const parent = doc.querySelector('Function');
    element.subFunctionDialogParent = parent;

    element.addSubFunctionDialog.show();
    element.subFunctionNameField.value = 'General';
    element.saveSubFunction();
    await element.updateComplete;
    expect(element.subFunctionNameField.validationMessage).to.match(
      /Name must be unique/i
    );
  });
});

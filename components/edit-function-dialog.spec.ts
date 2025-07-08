import { expect, fixture, html } from '@open-wc/testing';
import { testScl } from '../scl-bay-template.testfiles.js';
import './edit-function-dialog.js';
import type EditFunctionDialog from './edit-function-dialog.js';

describe('EditFunctionDialog', () => {
  let dialog: EditFunctionDialog;
  let doc: XMLDocument;
  let parent: Element;
  let saveButton: HTMLButtonElement;

  beforeEach(async () => {
    doc = new DOMParser().parseFromString(testScl, 'application/xml');
    parent = doc.querySelector('Function')!;

    dialog = await fixture(
      html`<edit-function-dialog-e4d2f8b7></edit-function-dialog-e4d2f8b7>`
    );
    dialog.parent = parent;
    dialog.elTagName = 'SubFunction';
    saveButton = dialog.shadowRoot?.querySelector(
      '[data-testid="add-subfunction-btn"]'
    ) as HTMLButtonElement;
  });

  it('should reset fields on dialog close', () => {
    dialog.nameTextField.value = 'CBR';
    dialog.descTextField.value = 'CBR Description';
    dialog.typeTextField.value = 'CBR Type';
    (dialog as any).onDialogClosed();
    expect(dialog.nameTextField.value).to.equal('');
    expect(dialog.descTextField.value).to.equal(null);
    expect(dialog.typeTextField.value).to.equal(null);
  });

  it('should validate name as required', () => {
    saveButton.click();
    const mdField = dialog.nameTextField.shadowRoot?.querySelector(
      'md-filled-text-field'
    ) as HTMLInputElement;
    expect(mdField.validationMessage).to.equal('Name is required.');
  });

  it('should validate name as unique', () => {
    dialog.requireUniqueName = true;
    dialog.siblings = Array.from(parent.querySelectorAll('SubFunction'));
    dialog.nameTextField.value = 'General';

    saveButton.click();

    const mdField = dialog.nameTextField.shadowRoot?.querySelector(
      'md-filled-text-field'
    ) as HTMLInputElement;
    expect(mdField.validationMessage).to.match(/Name must be unique/i);
  });

  describe('Add mode', () => {
    beforeEach(() => {
      dialog.element = undefined;
      dialog.open = true;
    });

    it('should render dialog with correct heading', () => {
      const mwcDialog = dialog.shadowRoot?.querySelector('mwc-dialog');
      expect((mwcDialog as any).heading).to.equal('Add SubFunction');
    });

    it('should dispatch insert event on save', () => {
      dialog.nameTextField.value = 'ETH';
      dialog.descTextField.value = 'Description of ETH';
      dialog.typeTextField.value = 'Type of ETH';
      dialog.addEventListener('oscd-edit', e => {
        const insert = (e as CustomEvent).detail;
        expect(insert.parent).to.equal(parent);
        expect(insert.node.getAttribute('name')).to.equal('ETH');
        expect(insert.node.getAttribute('desc')).to.equal('Description of ETH');
        expect(insert.node.getAttribute('type')).to.equal('Type of ETH');
      });
      (dialog as any).onSave();
    });
  });

  describe('Edit mode', () => {
    beforeEach(async () => {
      dialog.element = parent.querySelector('SubFunction') as Element;
      dialog.open = true;
    });

    it('should render dialog with correct heading', () => {
      const mwcDialog = dialog.shadowRoot?.querySelector('mwc-dialog');
      expect((mwcDialog as any).heading).to.equal('Edit SubFunction');
    });

    it('should populate fields with existing values', () => {
      expect(dialog.nameTextField.value).to.equal('General');
      expect(dialog.descTextField.value).to.equal(null);
      expect(dialog.typeTextField.value).to.equal(null);
    });

    it('should dispatch update event on save', () => {
      dialog.nameTextField.value = 'General Edited';
      dialog.descTextField.value = 'Edited Description';
      dialog.typeTextField.value = 'Edited Type';
      dialog.addEventListener('oscd-edit', e => {
        const update = (e as CustomEvent).detail;
        expect(update.element).to.equal(dialog.element);
        expect(update.attributes.name).to.equal('General Edited');
        expect(update.attributes.desc).to.equal('Edited Description');
        expect(update.attributes.type).to.equal('Edited Type');
      });
      (dialog as any).onSave();
    });
  });
});

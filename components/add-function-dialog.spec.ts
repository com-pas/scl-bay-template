import { expect, fixture, html } from '@open-wc/testing';
import { Insert } from '@openscd/open-scd-core';
import AddFunctionDialog, { DialogMode } from './add-function-dialog.js';
import { addFunctionTestfile } from '../testfiles/add-function.testfile.js';

describe('AddFunctionDialog', () => {
  let element: AddFunctionDialog;

  let doc: XMLDocument;
  let voltageLevel: Element;
  let bay: Element;
  let conductingEquipment: Element;
  let powerTransformer: Element;

  beforeEach(async () => {
    doc = new DOMParser().parseFromString(
      addFunctionTestfile,
      'application/xml'
    );
    voltageLevel = doc.querySelector('VoltageLevel[name="vl1"]')!;
    bay = doc.querySelector('Bay[name="bay1"]')!;
    conductingEquipment = doc.querySelector('ConductingEquipment[name="CE1"]')!;
    powerTransformer = doc.querySelector('PowerTransformer[name="PT1"]')!;

    element = await fixture(
      html`<add-function-dialog-632c87ac></add-function-dialog-632c87ac>`
    );

    await element.updateComplete;
  });

  it('should add function to parent bay for conducting equipment and add powersystemrelation', () => {
    let insert: Insert;
    element.addEventListener('oscd-edit', e => {
      insert = e.detail as Insert;
    });

    element.show(conductingEquipment, DialogMode.ConductingEquipment);

    const name = 'func1';
    const desc = 'desc1';
    const type = 'type1';
    element.nameTextField.value = name;
    element.descTextField.value = desc;
    element.typeTextField.value = type;

    (element as any).onSave();

    // eslint-disable-next-line no-unused-expressions
    expect(insert!).to.not.be.null;

    const { parent, node: functionElement } = insert!;
    expect(parent).to.equal(bay);
    expect((functionElement as Element).getAttribute('name')).to.equal(name);
    expect((functionElement as Element).getAttribute('desc')).to.equal(desc);
    expect((functionElement as Element).getAttribute('type')).to.equal(type);

    const powerSystemRelation = (functionElement as Element).querySelector(
      'PowerSystemRelation'
    );

    // eslint-disable-next-line no-unused-expressions
    expect(powerSystemRelation).to.not.be.null;
    expect(powerSystemRelation?.getAttribute('relation')).to.equal(
      'sub1/vl1/bay1/CE1'
    );
  });

  it('should add function to parent bay, voltagelevel or substation for powertransformer and add powersystemrelation', () => {
    let insert: Insert;
    element.addEventListener('oscd-edit', e => {
      insert = e.detail as Insert;
    });

    element.show(powerTransformer, DialogMode.PowerTransformer);

    const name = 'func1';
    const desc = 'desc1';
    const type = 'type1';
    element.nameTextField.value = name;
    element.descTextField.value = desc;
    element.typeTextField.value = type;

    (element as any).onSave();

    // eslint-disable-next-line no-unused-expressions
    expect(insert!).to.not.be.null;

    const { parent, node: functionElement } = insert!;
    expect(parent).to.equal(voltageLevel);
    expect((functionElement as Element).getAttribute('name')).to.equal(name);
    expect((functionElement as Element).getAttribute('desc')).to.equal(desc);
    expect((functionElement as Element).getAttribute('type')).to.equal(type);

    const powerSystemRelation = (functionElement as Element).querySelector(
      'PowerSystemRelation'
    );

    // eslint-disable-next-line no-unused-expressions
    expect(powerSystemRelation).to.not.be.null;
    expect(powerSystemRelation?.getAttribute('relation')).to.equal(
      'sub1/vl1/PT1'
    );
  });
});

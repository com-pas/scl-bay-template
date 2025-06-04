/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-return-assign */
/* eslint-disable lit-a11y/click-events-have-key-events */
import { css, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import { classMap } from 'lit/directives/class-map.js';

import '@material/mwc-dialog';
import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@material/mwc-icon';
import '@material/mwc-switch';
import '@material/mwc-formfield';
import '@material/mwc-textfield';

import type { Dialog } from '@material/mwc-dialog';
import type { TextField } from '@material/mwc-textfield';

import { Edit, Insert, newEditEvent, Remove } from '@openscd/open-scd-core';

import '@openscd/oscd-tree-grid';
import type { Path, TreeGrid } from '@openscd/oscd-tree-grid';

import '@openenergytools/filterable-lists/dist/action-list.js';
import type { ActionItem } from '@openenergytools/filterable-lists/dist/action-list.js';

import '@openenergytools/filterable-lists/dist/selection-list.js';
import type {
  SelectionList,
  SelectItem,
} from '@openenergytools/filterable-lists/dist/selection-list.js';

import {
  getReference,
  identity,
  importLNodeType,
  lnInstGenerator,
} from '@openenergytools/scl-lib';
import { createElement } from '@openenergytools/scl-lib/dist/foundation/utils.js';

import {
  inputCirclePath,
  listAddPath,
  outputCirclePath,
  switchAddPath,
} from './foundation/sldIcons.js';
import {
  dataAttributeTree,
  getSourceDef,
} from './foundation/dataAttributePicker.js';
import { newCreateWizardEvent, newEditWizardEvent } from './foundation.js';

const uri6100 = 'http://www.iec.ch/61850/2019/SCL/6-100';
const xmlnsNs = 'http://www.w3.org/2000/xmlns/';
const prefix6100 = 'eTr_6-100';
const svgNs = 'http://www.w3.org/2000/svg';

type Input = {
  source: string;
  srcRefs: Element[];
};

type Output = {
  controlled: string;
  ctrlRefs: Element[];
};

function compareSrcRef(a: Element, b: Element): number {
  const as = `${a.getAttribute('input')}${a.getAttribute(
    'inputInst'
  )}${a.getAttribute('source')}`;

  const bs = `${b.getAttribute('input')}${b.getAttribute(
    'inputInst'
  )}${b.getAttribute('source')}`;

  if (as > bs) return 1;
  return -1;
}

function compareCtrlRef(a: Element, b: Element): number {
  const as = `${a.getAttribute('output')}${a.getAttribute(
    'outputInst'
  )}${a.getAttribute('controlled')}`;

  const bs = `${b.getAttribute('output')}${b.getAttribute(
    'outputInst'
  )}${b.getAttribute('controlled')}`;

  if (as > bs) return 1;
  return -1;
}

function groupedSourceRefs(func: Element): Input[] {
  const uniqueSrcRefs: string[] = [];
  const inputs: Input[] = [];

  function siblingSrcRefs(source: string): Element[] {
    return Array.from(
      func.querySelectorAll(
        `:scope LNode > Private[type="eIEC61850-6-100"] > LNodeInputs > SourceRef[source="${source}"]`
      )
    );
  }

  Array.from(
    func.querySelectorAll(
      ':scope LNode > Private[type="eIEC61850-6-100"] > LNodeInputs > SourceRef'
    )
  )
    .sort(compareSrcRef)
    .forEach(srcRef => {
      const source = srcRef.getAttribute('source');
      if (!source) return;

      if (!uniqueSrcRefs.includes(source)) {
        inputs.push({ source, srcRefs: siblingSrcRefs(source) });
        uniqueSrcRefs.push(source);
      }
    });

  return inputs;
}

function groupedControlRefs(func: Element): Output[] {
  const uniqueCtrlRefs: string[] = [];
  const outputs: Output[] = [];

  function siblingSrcRefs(source: string): Element[] {
    return Array.from(
      func.querySelectorAll(
        `:scope LNode > Private[type="eIEC61850-6-100"] > LNodeOutputs > ControlRef[controlled="${source}"]`
      )
    );
  }

  Array.from(
    func.querySelectorAll(
      ':scope LNode > Private[type="eIEC61850-6-100"] > LNodeOutputs > ControlRef'
    )
  )
    .sort(compareCtrlRef)
    .forEach(ctrlRef => {
      const controlled = ctrlRef.getAttribute('controlled');
      if (!controlled) return;

      if (!uniqueCtrlRefs.includes(controlled)) {
        outputs.push({
          controlled,
          ctrlRefs: siblingSrcRefs(controlled),
        });
        uniqueCtrlRefs.push(controlled);
      }
    });

  return outputs;
}

function parentDepth(lNode: Element): number {
  const validParent = [
    'Function',
    'SubFunction',
    'EqFunction',
    'EqSubFunction',
  ];

  let parent = lNode.parentElement;
  let i = 1;
  while (parent && validParent.includes(parent?.tagName)) {
    parent = parent.parentElement;
    i += 1;
  }

  return i;
}

function createSingleLNode(parent: Element, ln: Element): Insert[] {
  const inserts: Insert[] = [];

  const lnClass = ln.getAttribute('lnClass');
  if (!lnClass) return [];
  const lnType = ln.getAttribute('id');
  const lnInst = lnInstGenerator(parent, 'LNode')(lnClass);
  if (!lnInst) return [];

  const node = createElement(parent.ownerDocument, 'LNode', {
    iedName: 'None',
    lnClass,
    lnInst,
    lnType,
  });
  inserts.push({
    parent,
    node,
    reference: getReference(parent, 'LNode'),
  });

  const private6100 = parent.ownerDocument.createElementNS(
    parent.ownerDocument.documentElement.namespaceURI,
    'Private'
  );
  private6100.setAttribute('type', 'eIEC61850-6-100');

  inserts.push({
    parent: node,
    node: private6100,
    reference: null,
  });

  const lNodeSpec = parent.ownerDocument.createElementNS(
    uri6100,
    `${prefix6100}:LNodeSpecNaming`
  );

  const attrs: Record<string, string> = {
    iedName: 'sIedName',
    ldInst: 'sLdInst',
    prefix: 'sPrefix',
    lnClass: 'sLnClass',
    lnInst: 'sLnInst',
  };

  Object.entries(attrs).forEach(([attr, sAttr]) => {
    const value = node.getAttribute(attr);
    if (value) lNodeSpec!.setAttribute(sAttr, value);
  });

  inserts.push({ parent: private6100, node: lNodeSpec, reference: null });

  return inserts;
}

type CreateSourceRefOptions = {
  paths?: Path[];
  service: string;
  resourceName?: string;
  numberOfInstances?: number;
};

type UpdateSourceRefOptions = {
  paths?: Path[];
};

type CreateControlRefOptions = {
  paths?: Path[];
  resourceName?: string;
  srcRef?: Element;
};

type CreateProcessResourceOptions = {
  name: string;
  selector: string | null;
  cardinality: string | null;
  max: string | null;
};

function updateSourceRef(
  srcRef: Element,
  options: UpdateSourceRefOptions
): Edit[] {
  const edits: Edit[] = [];

  const { paths } = options;
  const sources = paths ? getSourceDef(paths) : [];

  const resourceName = srcRef.getAttribute('resourceName');
  const service = srcRef.getAttribute('service');

  const lNodeInputs = srcRef.parentElement;
  if (!lNodeInputs) return [];

  // there is a first SourceRef and we need to add other SourceRefs
  const input = srcRef.getAttribute('input')!;

  if (sources.length > 0)
    edits.push({
      element: srcRef,
      attributes: { source: sources[0] },
    });

  sources.slice(1).forEach((source, i) => {
    const sourceRef = lNodeInputs.ownerDocument.createElementNS(
      uri6100,
      `${prefix6100}:SourceRef`
    );

    const inst =
      (lNodeInputs.querySelectorAll('SourceRef').length ?? 0) + i + 1;

    sourceRef.setAttribute('source', source);
    sourceRef.setAttribute('input', input);
    sourceRef.setAttribute('inputInst', `${inst}`);
    if (service) sourceRef.setAttribute('service', service);
    if (resourceName) sourceRef.setAttribute('resourceName', resourceName);

    edits.push({
      parent: lNodeInputs,
      node: sourceRef,
      reference: null,
    });
  });

  return edits;
}

function createSourceRef(
  lNode: Element,
  options: CreateSourceRefOptions
): Edit[] {
  const doc = lNode.ownerDocument;

  const { paths } = options;
  const sources = paths ? getSourceDef(paths) : [];

  const { service } = options;
  const { resourceName } = options;

  const { numberOfInstances } = options;

  const sourceRefEdits: Edit[] = [];

  let lNodeInputs = lNode.querySelector(
    ':scope > Private[type="eIEC61850-6-100"] > LNodeInputs'
  );
  let private6100 = lNode.querySelector(
    ':scope > Private[type="eIEC61850-6-100"]'
  );
  let lNodeSpec = lNode.querySelector(
    ':scope > Private[type="eIEC61850-6-100"] > LNodeSpecNaming'
  );

  const addPrivate = (): void => {
    private6100 = doc.createElementNS(
      doc.documentElement.namespaceURI,
      'Private'
    );
    private6100.setAttribute('type', 'eIEC61850-6-100');

    sourceRefEdits.push({
      parent: lNode,
      node: private6100,
      reference: null,
    });
  };

  const addLNodeSpecNaming = (parent: Element): void => {
    if (!lNodeSpec) {
      lNodeSpec = doc.createElementNS(uri6100, `${prefix6100}:LNodeSpecNaming`);

      const attrs: Record<string, string> = {
        iedName: 'sIedName',
        ldInst: 'sLdInst',
        prefix: 'sPrefix',
        lnClass: 'sLnClass',
        lnInst: 'sLnInst',
      };

      Object.entries(attrs).forEach(([attr, sAttr]) => {
        const value = lNode.getAttribute(attr);
        if (value) lNodeSpec!.setAttribute(sAttr, value);
      });
    }

    sourceRefEdits.push({ parent, node: lNodeSpec, reference: null });
  };

  const addLNodeInputs = (parent: Element): void => {
    lNodeInputs = doc.createElementNS(uri6100, `${prefix6100}:LNodeInputs`);

    sourceRefEdits.push({
      parent,
      node: lNodeInputs,
      reference: null,
    });
  };

  if (!private6100) addPrivate();
  if (!lNodeSpec) addLNodeSpecNaming(private6100!);
  if (!lNodeInputs) addLNodeInputs(private6100!);

  if (resourceName && sources.length === 0) {
    Array.from(Array(numberOfInstances).keys()).forEach(i => {
      const sourceRef = doc.createElementNS(uri6100, `${prefix6100}:SourceRef`);
      sourceRef.setAttribute('input', 'resourceRefInput');
      const inst = (lNode.querySelectorAll('SourceRef').length ?? 0) + 1 + i;
      sourceRef.setAttribute('inputInst', `${inst}`);
      sourceRef.setAttribute('resourceName', resourceName);
      sourceRef.setAttribute('service', service);

      sourceRefEdits.push({
        parent: lNodeInputs!,
        node: sourceRef,
        reference: null,
      });
    });
  } else {
    sources.forEach((source, i) => {
      const sourceRef = doc.createElementNS(uri6100, `${prefix6100}:SourceRef`);

      const path = source.split('/');
      const input = path[path.length - 2];

      const inst = (lNode.querySelectorAll('SourceRef').length ?? 0) + i + 1;

      sourceRef.setAttribute('source', source);
      sourceRef.setAttribute('input', input);
      sourceRef.setAttribute('inputInst', `${inst}`);
      sourceRef.setAttribute('service', service);
      if (resourceName) sourceRef.setAttribute('resourceName', resourceName);

      sourceRefEdits.push({
        parent: lNodeInputs!,
        node: sourceRef,
        reference: null,
      });
    });
  }

  return sourceRefEdits;
}

function createControlRef(
  lNode: Element,
  options: CreateControlRefOptions
): Edit[] {
  const doc = lNode.ownerDocument;

  const { paths } = options;
  const controlleds = paths ? getSourceDef(paths) : [];

  const { resourceName } = options;

  const { srcRef: ctrlRef } = options;

  const controlRefEdits: Edit[] = [];

  let lNodeOutputs = lNode.querySelector(
    ':scope > Private[type="eIEC61850-6-100"] > LNodeOutputs'
  );
  let private6100 = lNode.querySelector(
    ':scope > Private[type="eIEC61850-6-100"]'
  );
  let lNodeSpec = lNode.querySelector(
    ':scope > Private[type="eIEC61850-6-100"] > LNodeSpecNaming'
  );

  const addPrivate = (): void => {
    private6100 = doc.createElementNS(
      doc.documentElement.namespaceURI,
      'Private'
    );
    private6100.setAttribute('type', 'eIEC61850-6-100');

    controlRefEdits.push({
      parent: lNode,
      node: private6100,
      reference: null,
    });
  };

  const addLNodeSpecNaming = (parent: Element): void => {
    if (!lNodeSpec) {
      lNodeSpec = doc.createElementNS(uri6100, `${prefix6100}:LNodeSpecNaming`);

      const attrs: Record<string, string> = {
        iedName: 'sIedName',
        ldInst: 'sLdInst',
        prefix: 'sPrefix',
        lnClass: 'sLnClass',
        lnInst: 'sLnInst',
      };

      Object.entries(attrs).forEach(([attr, sAttr]) => {
        const value = lNode.getAttribute(attr);
        if (value) lNodeSpec!.setAttribute(sAttr, value);
      });
    }

    controlRefEdits.push({ parent, node: lNodeSpec, reference: null });
  };

  const addLNodeOutputs = (parent: Element): void => {
    lNodeOutputs = doc.createElementNS(uri6100, `${prefix6100}:LNodeOutputs`);

    controlRefEdits.push({
      parent,
      node: lNodeOutputs,
      reference: null,
    });
  };

  if (!private6100) addPrivate();
  if (!lNodeSpec) addLNodeSpecNaming(private6100!);
  if (!lNodeOutputs) addLNodeOutputs(private6100!);

  if (resourceName && !ctrlRef) {
    // Add a single ControlRef with missing controlled
    const sourceRef = doc.createElementNS(uri6100, `${prefix6100}:ControlRef`);

    const output = 'resourceRefOutput';
    const inst = (lNode.querySelectorAll('ControlRef').length ?? 0) + 1;

    sourceRef.setAttribute('output', output);
    sourceRef.setAttribute('outputInst', `${inst}`);
    sourceRef.setAttribute('resourceName', resourceName);
    controlRefEdits.push({
      parent: lNodeOutputs!,
      node: sourceRef,
      reference: null,
    });
  } else if (ctrlRef && resourceName) {
    // There is a first ControlRef and we need to add other ControlRefs
    const output = ctrlRef.getAttribute('input')!;

    controlRefEdits.push({
      element: ctrlRef,
      attributes: { controlled: controlleds[0] },
    });

    controlleds.slice(1).forEach((controlled, i) => {
      const controlRef = doc.createElementNS(
        uri6100,
        `${prefix6100}:ControlRef`
      );

      const inst = (lNode.querySelectorAll('ControlRef').length ?? 0) + i + 1;

      controlRef.setAttribute('controlled', controlled);
      controlRef.setAttribute('output', output);
      controlRef.setAttribute('outputInst', `${inst}`);
      controlRef.setAttribute('resourceName', resourceName);

      controlRefEdits.push({
        parent: lNodeOutputs!,
        node: controlRef,
        reference: null,
      });
    });
  } else {
    // Add multiple ControlRef(s) without a resourceName
    controlleds.forEach((controlled, i) => {
      const controlRef = doc.createElementNS(
        uri6100,
        `${prefix6100}:ControlRef`
      );

      const path = controlled.split('/');
      const output = path[path.length - 2];

      const inst = (lNode.querySelectorAll('ControlRef').length ?? 0) + i + 1;

      controlRef.setAttribute('controlled', controlled);
      controlRef.setAttribute('output', output);
      controlRef.setAttribute('outputInst', `${inst}`);

      controlRefEdits.push({
        parent: lNodeOutputs!,
        node: controlRef,
        reference: null,
      });
    });
  }

  return controlRefEdits;
}

function singleton(parent: Element, leaf: Element): boolean {
  const { children } = parent;

  if (parent === leaf && children.length <= 1) return true;
  if (children.length > 1) return false;
  return singleton(parent.children[0], leaf);
}

function remove9030Element(element: Element): Remove[] {
  const priv = element.closest('Private[type="eIEC61850-6-100"]');

  if (priv && singleton(priv, element)) return [{ node: priv }];

  return [{ node: element }];
}

function createProcessResource(
  parent: Element,
  options: CreateProcessResourceOptions
): Edit[] {
  const doc = parent.ownerDocument;

  const { name } = options;
  const { selector } = options;
  const { cardinality } = options;
  const { max } = options;

  const edits: Insert[] = [];

  let private6100 = parent.querySelector(
    ':scope > Private[type="eIEC61850-6-100"]'
  );

  const addPrivate = (): void => {
    private6100 = doc.createElementNS(
      doc.documentElement.namespaceURI,
      'Private'
    );
    private6100.setAttribute('type', 'eIEC61850-6-100');

    edits.push({
      parent,
      node: private6100,
      reference: getReference(parent, 'Private'),
    });
  };

  if (!private6100) addPrivate();

  const proResRef = doc.createElementNS(
    uri6100,
    `${prefix6100}:ProcessResource`
  );

  proResRef.setAttribute('name', name);
  if (selector) proResRef.setAttribute('selector', selector);
  if (cardinality) proResRef.setAttribute('cardinality', cardinality);
  if (max) proResRef.setAttribute('max', max);
  edits.push({
    parent: private6100!,
    node: proResRef,
    reference: null,
  });

  return edits;
}

function isInPath(parent: Element, lNode: Element): boolean {
  return parent.contains(lNode);
}

function findProcessResourceParent(
  lNode: Element,
  name: string
): Element | null {
  const oldProcRes = lNode.ownerDocument.querySelector(
    `ProcessResource[name="${name}"]`
  );

  if (!oldProcRes) return lNode.closest('Function,EqFunction');

  let newParent = oldProcRes.parentElement?.parentElement; // not the private
  while (newParent) {
    if (isInPath(newParent, lNode)) return newParent;
    newParent = newParent.parentElement;
  }

  return null;
}

function moveProcessResource(lNode: Element, resourceName: string): Edit[] {
  const oldProcessResource = lNode.ownerDocument.querySelector(
    `ProcessResource[name="${resourceName}"]`
  );
  if (!oldProcessResource) return [];

  const oldParent = oldProcessResource?.closest(
    'Private[type="eIEC61850-6-100"]'
  )?.parentElement;

  const newParent = findProcessResourceParent(lNode, resourceName);
  if (oldParent === newParent) return [];

  if (!newParent) return [];

  const edits: Edit[] = [];

  const selector = oldProcessResource.getAttribute('selector');
  const cardinality = oldProcessResource.getAttribute('cardinality');
  const max = oldProcessResource.getAttribute('max');

  edits.push(
    ...remove9030Element(oldProcessResource),
    createProcessResource(newParent, {
      name: resourceName,
      selector,
      cardinality,
      max,
    })
  );

  return edits;
}

function extRefAddress(extRef: Element, sourceRef: Element): string {
  // is ExtRef and SourceRef in Same LN?
  const srcRefIedName = sourceRef.closest('LNode')?.getAttribute('iedName');
  const srcRefLdInst = sourceRef.closest('LNode')?.getAttribute('ldInst');
  const srcRefPrefix = sourceRef.closest('LNode')?.getAttribute('prefix') ?? '';
  const srcRefLnClass =
    sourceRef.closest('LNode')?.getAttribute('lnClass') ?? '';
  const srcLnInst = sourceRef.closest('LNode')?.getAttribute('lnInst') ?? '';

  const iedName = extRef.closest('IED')?.getAttribute('name');
  const ldInst = extRef.closest('LDevice')?.getAttribute('inst');
  const prefix = extRef.closest('LN0,LN')?.getAttribute('prefix');
  const lnClass = extRef.closest('LN0,LN')?.getAttribute('lnClass');
  const lnInst = extRef.closest('LN0,LN')?.getAttribute('inst');

  const intAddr = extRef.getAttribute('intAddr');

  const isSameLNode =
    srcRefIedName === iedName &&
    srcRefLdInst === ldInst &&
    (srcRefPrefix ?? '') === (prefix ?? '') &&
    srcRefLnClass === lnClass &&
    (srcLnInst ?? '') === (lnInst ?? '');

  if (isSameLNode) return `@${intAddr}`;

  return `${iedName}/${ldInst}/${prefix ?? ''}${lnClass}${lnInst}/${intAddr}`;
}

@customElement('compas-function-editor-a1b2c3d4')
export default class FunctionEditor9030 extends LitElement {
  @property({ attribute: false })
  function!: Element;

  @property()
  docs: Record<string, XMLDocument> = {};

  @property()
  libDoc?: XMLDocument;

  @property({ type: Number })
  editCount = -1;

  @state()
  lNodeTypeSrc: { name: string; src: XMLDocument }[] = [];

  @state()
  gridSize = 32;

  @state()
  parent?: Element;

  @state()
  selectedFunc?: Element;

  @state()
  lNodeForDetail?: Element;

  @state()
  lNodeForCalculation?: Element;

  @state()
  lnodeparent?: Element;

  @state()
  selectedSourceRef?: Element;

  @state()
  selectedResourceName?: Element;

  @state()
  sldWidth: number = 300;

  @state()
  selectedLibName?: string;

  inputs: Input[] = [];

  @state()
  outputs: Output[] = [];

  @state()
  isControlRef = false;

  @state()
  isSrcRefUpdate = false;

  @state()
  linkProcRes = false;

  @state()
  lNodeDetail: 'inputs' | 'outputs' | 'settings' = 'inputs';

  @state()
  userLibDoc?: XMLDocument;

  items: SelectItem[] = [];

  @query('#lnode-dialog') dialog!: Dialog;

  @query('#dapicker') daPickerDialog!: Dialog;

  @query('#extRefPicker') extRefPicker!: Dialog;

  @query('#processrecource') processResourceDiag!: Dialog;

  @query('#dapicker oscd-tree-grid') daPicker!: TreeGrid;

  @query('#service') serviceSelector?: HTMLSelectElement;

  @query('input') libInput!: HTMLInputElement;

  @query('#procResSel1') proResNameSel!: HTMLSelectElement;

  @query('#proresname') proResName!: TextField;

  @query('#proresname2') proResName2?: TextField;

  @query('#procResSel2') proResSel2?: HTMLSelectElement;

  @query('#proresselector') proResSelector!: TextField;

  @query('#prorescardinality') proResCardinality!: TextField;

  @query('#proresmax') proResMax!: TextField;

  @query('#proresservice') proResService!: TextField;

  @query('#sldWidthDialog') sldWidthDiag?: Dialog;

  @query('#lnlist') lnList!: SelectionList;

  private openCreateWizard(tagName: string): void {
    if (this.parent)
      this.dispatchEvent(newCreateWizardEvent(this.parent, tagName));
  }

  private openEditWizard(element: Element): void {
    this.dispatchEvent(newEditWizardEvent(element));
  }

  private removeFunction(func: Element): void {
    this.dispatchEvent(newEditEvent({ node: func }));
  }

  private removeElement(srcRef: Element): void {
    this.dispatchEvent(newEditEvent({ node: srcRef }));
  }

  addFunction(): void {
    if (
      (this.parent && this.parent?.tagName === 'Bay') ||
      this.parent?.tagName === 'VoltageLevel'
    ) {
      this.openCreateWizard('Function');
      return;
    }

    this.openCreateWizard('EqFunction');
  }

  addSubFunction(parent: Element): void {
    if (parent.tagName === 'Function' || parent.tagName === 'SubFunction') {
      this.dispatchEvent(newCreateWizardEvent(parent, 'SubFunction'));
      return;
    }

    this.dispatchEvent(newCreateWizardEvent(parent, 'EqSubFunction'));
  }

  createNewLNodeElements(): void {
    if (!this.lnodeparent) return;

    const selectedLNs = this.lnList.selectedElements ?? [];

    if (selectedLNs.length === 0) return;

    const edits = selectedLNs.flatMap(ln =>
      createSingleLNode(this.lnodeparent!, ln)
    );

    this.items = this.lnList.items;

    edits.push(
      ...selectedLNs.flatMap(lNodeType =>
        importLNodeType(lNodeType, this.function.ownerDocument)
      )
    );

    this.dispatchEvent(newEditEvent(edits));
  }

  openLNodeDialog(func: Element): void {
    this.dialog.show();
    this.lnodeparent = func;
  }

  private createSourceRefs(addProcRef: boolean, isNewProcRef: boolean): void {
    const { paths } = this.daPicker;
    const service = this.serviceSelector?.value ?? 'Internal';

    const resourceName = this.proResName2?.value;

    let edits: Edit[] = [];
    if (this.isSrcRefUpdate) {
      edits = updateSourceRef(this.selectedResourceName!, {
        paths,
      });
    } else {
      edits = createSourceRef(this.lNodeForCalculation!, {
        paths,
        service,
        resourceName:
          this.selectedResourceName?.getAttribute('resourceName') ??
          resourceName,
      });
    }

    if (addProcRef) {
      if (isNewProcRef) {
        const newParent = findProcessResourceParent(
          this.lNodeForCalculation!,
          resourceName!
        );

        if (newParent) {
          edits.push(
            ...createProcessResource(
              this.lNodeForCalculation!.closest('Function,EqFunction')!,
              {
                name: resourceName!,
                selector: null,
                cardinality: null,
                max: paths.length.toString(),
              }
            )
          );
        }
      } else {
        edits.push(
          ...moveProcessResource(this.lNodeForCalculation!, resourceName!)
        );
      }
    }

    this.dispatchEvent(newEditEvent(edits));
    this.daPickerDialog.close();
  }

  private createControlRefs(): void {
    const { paths } = this.daPicker;

    const controlRefEdits = createControlRef(this.lNodeForCalculation!, {
      paths,
    });

    this.dispatchEvent(newEditEvent(controlRefEdits));
    this.daPickerDialog.close();
  }

  private saveProcessRef(isNew: boolean): void {
    const resourceName = this.proResName.value;
    const selector = this.proResSelector.value;
    const cardinality = this.proResCardinality.value;
    const max = this.proResMax.value;
    const service = this.proResService.value;

    const sourceRefEdits = createSourceRef(this.lNodeForCalculation!, {
      service,
      resourceName,
      numberOfInstances: parseInt(max, 10),
    });

    const processResourceEdits: Edit[] = [];

    if (isNew) {
      const newParent = findProcessResourceParent(
        this.lNodeForCalculation!,
        resourceName
      );

      if (newParent) {
        processResourceEdits.push(
          ...createProcessResource(
            this.lNodeForCalculation!.closest('Function,EqFunction')!,
            {
              name: resourceName,
              selector,
              cardinality,
              max,
            }
          )
        );
      }
    } else {
      processResourceEdits.push(
        ...moveProcessResource(this.lNodeForCalculation!, resourceName)
      );
    }

    this.dispatchEvent(
      newEditEvent([...sourceRefEdits, ...processResourceEdits])
    );
  }

  async openDoc(event: Event): Promise<void> {
    const file = (<HTMLInputElement | null>event.target)?.files?.item(0);
    if (!file) return;

    const text = await file.text();
    const doc = new DOMParser().parseFromString(text, 'application/xml');

    this.userLibDoc = doc;
    this.requestUpdate();
  }

  async resetSelectionList(): Promise<void> {
    // Force a full re-render of the selection-list to ensure all checkboxes are visually deselected/reset.
    // Directly updating `items` wasn't triggering checkbox state updates.
    // This workaround clears the list first, waits for the DOM to update, then reassigns the deselected items.
    const deselectedItems = this.lnList.items.map(item => ({
      ...item,
      selected: false,
    }));

    // Clear search input manually via shadow DOM access.
    // This simulates user clearing the search field and triggers filtering.
    const searchField = this.lnList.renderRoot.querySelector(
      'md-outlined-text-field'
    );
    if (searchField) {
      searchField.value = '';
      searchField.dispatchEvent(
        new Event('input', { bubbles: true, composed: true })
      );
    }
    this.lnList.items = [];
    await this.lnList.updateComplete;

    this.lnList.items = deselectedItems;
  }

  updated(changedProperties: Map<string, any>) {
    // make sure to put the 6-100 on the SCL element as defined by the IEC 61850-6
    if (!changedProperties.has('doc')) return;
    const sldNsPrefix =
      this.function.ownerDocument.documentElement.lookupPrefix(uri6100);
    if (!sldNsPrefix) {
      this.function.ownerDocument.documentElement.setAttributeNS(
        xmlnsNs,
        `xmlns:${prefix6100}`,
        uri6100
      );
    }
  }

  private renderProcessResourcePicker(): TemplateResult {
    const isNew = this.proResNameSel && this.proResNameSel.value === 'new';
    const name = isNew ? 'NewInput' : this.proResNameSel?.value ?? '';

    const processResource = this.function.ownerDocument.querySelector(
      `Private[type="eIEC61850-6-100"] ProcessResource[name="${name}"]`
    );
    const selector = processResource?.getAttribute('selector') ?? '';
    const cardinality = processResource?.getAttribute('cardinality') ?? '';
    const max = processResource?.getAttribute('max') ?? '';

    return html` <mwc-dialog id="processrecource" heading="Add ProcessResource">
      <div class="content prores">
        <mwc-select
          name="existing resource"
          id="procResSel1"
          @click="${() => this.requestUpdate()}"
          value="new"
        >
          <mwc-list-item value="new">Add new ProcessResource</mwc-list-item>
          ${Array.from(
            this.function.ownerDocument.querySelectorAll(
              'Private[type="eIEC61850-6-100"] ProcessResource'
            )
            // eslint-disable-next-line array-callback-return
          ).map(
            proRes =>
              html`<mwc-list-item value="${proRes.getAttribute('name')!}">
                ${proRes.getAttribute('name')!}
              </mwc-list-item>`
          )}
        </mwc-select>
        <mwc-textfield
          id="proresname"
          label="name"
          ?disabled=${!isNew}
          .value="${name}"
        ></mwc-textfield>
        <mwc-textfield
          id="proresselector"
          label="selector"
          ?disabled=${!isNew}
          .value="${selector}"
        ></mwc-textfield>
        <mwc-select
          id="prorescardinality"
          label="cardinality"
          ?disabled=${!isNew}
          .value="${cardinality}"
          >${['0..1', '1..1', '0..n', '1..n'].map(
            card => html`<mwc-list-item value="${card}">${card}</mwc-list-item>`
          )}</mwc-select
        >
        <mwc-textfield
          id="proresmax"
          label="number of instances"
          ?disabled=${!isNew}
          .value="${max}"
          type="number"
        ></mwc-textfield>
        <mwc-select
          id="proresservice"
          label="service"
          ?disabled=${!isNew}
          value="GOOSE"
          >${['GOOSE', 'SMV', 'Report', 'Poll', 'Wired', 'Internal'].map(
            service =>
              html`<mwc-list-item value="${service}">${service}</mwc-list-item>`
          )}</mwc-select
        >
      </div>
      <mwc-button
        slot="secondaryAction"
        label="close"
        @click=${() => this.processResourceDiag?.close()}
      ></mwc-button>
      <mwc-button
        slot="primaryAction"
        label="save"
        icon="save"
        @click="${() => this.saveProcessRef(isNew)}"
      ></mwc-button>
    </mwc-dialog>`;
  }

  private renderDataAttributePicker(): TemplateResult {
    const leafNode = this.isControlRef ? 'ctlVal' : undefined;

    return html`
      ${
        !this.isControlRef && !this.isSrcRefUpdate
          ? html`<mwc-select
              style="margin:10px;max-width:270px;"
              id="service"
              label="service"
              value="GOOSE"
              >${['GOOSE', 'SMV', 'Report', 'Poll', 'Wired', 'Internal'].map(
                service =>
                  html`<mwc-list-item value="${service}"
                    >${service}</mwc-list-item
                  >`
              )}</mwc-select
            >`
          : nothing
      }
      <oscd-tree-grid
        .tree="${dataAttributeTree(this.function.ownerDocument, leafNode)}"
      ></oscd-tree-grid>
    </div> `;
  }

  private renderSourceRefPicker(): TemplateResult {
    const isNew = this.proResSel2 && this.proResSel2.value === 'new';
    const name = isNew ? 'NewInput' : this.proResSel2?.value ?? '';

    const proPicker = this.isSrcRefUpdate
      ? nothing
      : html` <mwc-formfield
            style="margin:10px;max-width:270px;"
            label="Link to Process Resource"
            ><mwc-switch
              .selected=${this.linkProcRes}
              @click="${() => (this.linkProcRes = !this.linkProcRes)}"
            ></mwc-switch>
          </mwc-formfield>
          ${this.linkProcRes
            ? html`<mwc-select
                  style="margin:10px;max-width:270px;"
                  name="existing resource"
                  id="procResSel2"
                  @click="${() => this.requestUpdate()}"
                  value="new"
                >
                  <mwc-list-item value="new"
                    >Add new ProcessResource</mwc-list-item
                  >
                  ${Array.from(
                    this.function.ownerDocument.querySelectorAll(
                      'Private[type="eIEC61850-6-100"] ProcessResource'
                    )
                    // eslint-disable-next-line array-callback-return
                  ).map(
                    proRes =>
                      html`<mwc-list-item
                        value="${proRes.getAttribute('name')!}"
                      >
                        ${proRes.getAttribute('name')!}
                      </mwc-list-item>`
                  )}
                </mwc-select>
                <mwc-textfield
                  style="margin:10px;max-width:270px;"
                  id="proresname2"
                  label="name"
                  ?disabled=${!isNew}
                  .value="${name}"
                ></mwc-textfield>`
            : nothing}`;

    return html` <mwc-dialog id="dapicker" heading="Add Data Attributes"
      ><div style="display:flex;flex-direction:column;">
        ${proPicker} ${this.renderDataAttributePicker()}
      </div>
      <mwc-button
        slot="secondaryAction"
        label="close"
        @click=${() => this.daPickerDialog?.close()}
      ></mwc-button>
      <mwc-button
        slot="primaryAction"
        label="save"
        icon="save"
        @click="${() =>
          this.isControlRef
            ? this.createControlRefs()
            : this.createSourceRefs(this.linkProcRes, !!isNew)}"
      ></mwc-button>
    </mwc-dialog>`;
  }

  private renderExtRefPicker(): TemplateResult {
    const items: ActionItem[] = Array.from(
      this.function.ownerDocument.querySelectorAll(':root > IED ExtRef')
    ).map(extRef => ({
      headline: extRef.getAttribute('intAddr') ?? 'UNKNOWN',
      supportingText: identity(extRef.parentElement!.parentElement!) as string,
      primaryAction: () => {
        if (this.selectedSourceRef)
          this.dispatchEvent(
            newEditEvent({
              element: this.selectedSourceRef,
              attributes: {
                extRefAddr: extRefAddress(extRef, this.selectedSourceRef!),
              },
            })
          );
      },
    }));

    return html`<mwc-dialog id="extRefPicker">
      <action-list filterable .items="${items}"></action-list>
      <mwc-button slot="secondaryAction" dialogAction="close">
        Cancel
      </mwc-button>
      <mwc-button
        slot="primaryAction"
        dialogAction="close"
        @click="${() => {
          this.createNewLNodeElements();
          this.extRefPicker.close();
        }}"
      >
        Save
      </mwc-button>
    </mwc-dialog> `;
  }

  // eslint-disable-next-line class-methods-use-this
  private renderLibraryImport(): TemplateResult {
    return html` <h3>No LNodeType library loaded, yet!</h3>
      <input
        style="display:none;"
        @click=${({ target }: MouseEvent) => {
          // eslint-disable-next-line no-param-reassign
          (<HTMLInputElement>target).value = '';
        }}
        @change=${this.openDoc}
        type="file"
      />
      <mwc-button
        label="Import LNodeType Library"
        @click="${() => this.libInput.click()}"
        style="height:30px;margin:10px"
      >
      </mwc-button>`;
  }

  private renderLNodeTypePicker(): TemplateResult {
    const _libDoc = this.libDoc ?? this.userLibDoc;

    const lNodeTypes = _libDoc
      ? Array.from(
          _libDoc.querySelectorAll(':root > DataTypeTemplates > LNodeType')
        )
      : [];

    const items = lNodeTypes.map(lNodeType => ({
      headline: lNodeType.getAttribute('lnClass') ?? 'UNKNOWN',
      supportingText: `${
        lNodeType.getAttribute('desc') ?? ''
      } - #${lNodeType.getAttribute('id')}`,
      attachedElement: lNodeType,
      selected: false,
    }));

    const importLib = items.length === 0 ? this.renderLibraryImport() : nothing;

    return html`<mwc-dialog
      id="lnode-dialog"
      @closed=${() => this.resetSelectionList()}
    >
      <div id="createLNodeWizardContent">
        <selection-list id="lnlist" filterable .items=${items}></selection-list>
        ${importLib}
      </div>
      <mwc-button slot="secondaryAction" dialogAction="close">
        Cancel
      </mwc-button>
      <mwc-button
        slot="primaryAction"
        dialogAction="close"
        @click="${() => this.createNewLNodeElements()}"
      >
        Save
      </mwc-button>
    </mwc-dialog>`;
  }

  private renderLNodeDetailContent(): TemplateResult {
    if (this.lNodeDetail === 'inputs')
      return html` <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th scope="col">input</th>
            <th scope="col">inputInst</th>
            <th scope="col">source</th>
            <th scope="col">service</th>
            <th scope="col">desc</th>
            <th scope="col">resourceName</th>
            <th scope="col">pLN</th>
            <th scope="col">pDO</th>
            <th scope="col">pDA</th>
            <th scope="col">extRefAddr</th>
          </tr>
        </thead>
        <tbody>
          ${Array.from(
            this.lNodeForDetail!.querySelectorAll(
              ':scope > Private[type="eIEC61850-6-100"] > LNodeInputs > SourceRef'
            )
          ).map(
            srcRef => html`<tr>
              <th>
                ${!srcRef.getAttribute('source')
                  ? html`<mwc-icon-button
                      icon="link"
                      @click="${() => {
                        this.isSrcRefUpdate = true;
                        this.selectedResourceName = srcRef;
                        this.daPickerDialog.show();
                      }}"
                    ></mwc-icon-button>`
                  : nothing}
              </th>
              <th>
                <mwc-icon-button
                  icon="delete"
                  @click="${() => this.removeElement(srcRef)}"
                ></mwc-icon-button>
              </th>
              <th>${srcRef.getAttribute('input')}</th>
              <th>${srcRef.getAttribute('inputInst')}</th>
              <th>${srcRef.getAttribute('source')}</th>
              <th>${srcRef.getAttribute('service')}</th>
              <th>${srcRef.getAttribute('desc')}</th>
              <th>${srcRef.getAttribute('resourceName')}</th>
              <th>${srcRef.getAttribute('pLN')}</th>
              <th>${srcRef.getAttribute('pDO')}</th>
              <th>${srcRef.getAttribute('pDA')}</th>
              ${srcRef.getAttribute('extRefAddr')
                ? html`<th>${srcRef.getAttribute('extRefAddr')}</th>`
                : html`<mwc-icon-button
                    icon="edit"
                    @click="${() => {
                      this.selectedSourceRef = srcRef;
                      this.extRefPicker.show();
                    }}"
                  ></mwc-icon-button>`}
            </tr>`
          )}
        </tbody>
      </table>`;

    if (this.lNodeDetail === 'outputs')
      return html` <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th scope="col">output</th>
            <th scope="col">outputInst</th>
            <th scope="col">controlled</th>
            <th scope="col">desc</th>
            <th scope="col">resourceName</th>
          </tr>
        </thead>
        <tbody>
          ${Array.from(
            this.lNodeForDetail!.querySelectorAll(
              ':scope > Private[type="eIEC61850-6-100"] > LNodeOutputs > ControlRef'
            )
          ).map(
            ctrlRef => html`<tr>
              <th>
                ${!ctrlRef.getAttribute('controlled')
                  ? html`<mwc-icon-button
                      icon="link"
                      @click="${() => {
                        this.selectedResourceName = ctrlRef;
                        this.daPickerDialog.show();
                      }}"
                    ></mwc-icon-button>`
                  : nothing}
              </th>
              <th>
                <mwc-icon-button
                  icon="delete"
                  @click="${() => this.removeElement(ctrlRef)}"
                ></mwc-icon-button>
              </th>
              <th>${ctrlRef.getAttribute('output')}</th>
              <th>${ctrlRef.getAttribute('outputInst')}</th>
              <th>${ctrlRef.getAttribute('controlled')}</th>
              <th>${ctrlRef.getAttribute('desc')}</th>
              <th>${ctrlRef.getAttribute('resourceName')}</th>
            </tr>`
          )}
        </tbody>
      </table>`;

    if (this.lNodeDetail === 'settings')
      return html` <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th scope="col">reference</th>
            <th scope="col">SG</th>
            <th scope="col">value</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>`;

    return html``;
  }

  private renderLNodeDetail(): TemplateResult {
    if (this.lNodeForDetail)
      return html`<div class="table lnode detail">
        <nav style="float:right;">
          <mwc-icon-button
            icon="close"
            @click="${() => (this.lNodeForDetail = undefined)}"
          ></mwc-icon-button>
        </nav>
        <div style="display: flex;">
          <div
            class="${classMap({
              lnode: true,
              tab: true,
              input: true,
              selected: this.lNodeDetail === 'inputs',
            })}"
            @click="${() => (this.lNodeDetail = 'inputs')}"
          >
            Input
          </div>
          <div
            class="${classMap({
              lnode: true,
              tab: true,
              output: true,
              selected: this.lNodeDetail === 'outputs',
            })}"
            @click="${() => (this.lNodeDetail = 'outputs')}"
          >
            Output
          </div>
          <div
            class="${classMap({
              lnode: true,
              tab: true,
              settings: true,
              selected: this.lNodeDetail === 'settings',
            })}"
            @click="${() => (this.lNodeDetail = 'settings')}"
          >
            Settings
          </div>
        </div>
        ${this.renderLNodeDetailContent()}
      </div>`;

    return html``;
  }

  // eslint-disable-next-line class-methods-use-this
  private renderSourceRef(lNode: Element): TemplateResult {
    return html`${Array.from(
      lNode.querySelectorAll(
        ':scope > Private[type="eIEC61850-6-100"] SourceRef'
      )
    ).map(srcRef => {
      const source = srcRef.getAttribute('source')!;

      const baseLength = 0 + parentDepth(lNode) * 20;
      const growth =
        this.inputs.findIndex(input => input.source === source) * 9;

      const left = this.inputs.length * 9 + baseLength - growth;

      return source
        ? html`<span
            class="input abbr"
            title="${srcRef.getAttribute('source')!}"
            style="position:relative;left:-${left}px;"
          >
            <div
              style="height:3px;margin:5px;border-radius:2px;width:${left}px;"
              class="${classMap({
                link: true,
                srcref: true,
                selected: srcRef === this.selectedSourceRef,
              })}"
            ></div>
            <div style="height:0.01px;"></div
          ></span>`
        : html`<span
            class="input abbr"
            title="${srcRef.getAttribute('resourceName')!}"
            style="position:relative;left:-25px;"
          >
            <div
              style="height:3px;margin:5px;border-radius:2px;width:25px;"
              class="${classMap({
                link: true,
                srcref: true,
                selected: srcRef === this.selectedSourceRef,
              })}"
            ></div>
            <div style="height:0.01px;"></div
          ></span>`;
    })}`;
  }

  // eslint-disable-next-line class-methods-use-this
  private renderControlRef(lNode: Element): TemplateResult {
    this.outputs = groupedControlRefs(this.function!);
    return html`${Array.from(
      lNode.querySelectorAll(
        ':scope > Private[type="eIEC61850-6-100"] ControlRef'
      )
    )
      .filter(ctrlRef => ctrlRef.getAttribute('controlled'))
      .map(ctrlRef => {
        const controlled = ctrlRef.getAttribute('controlled')!;

        const baseLength = 5 + parentDepth(lNode) * 20;
        const growth =
          this.outputs.findIndex(output => output.controlled === controlled) *
          9;

        const left = baseLength + growth;

        return html`<span
          class="input abbr"
          title="${ctrlRef.getAttribute('controlled')!}"
          style="position:relative;left:calc(100% - 5px);"
        >
          <div
            style="height:3px;margin:2.5px;background-color:#002b36;width:${left}px;"
            class="${classMap({
              link: true,
              srcref: true,
            })}"
          ></div>
          <div style="height:0.01px;"></div
        ></span>`;
      })}`;
  }

  // eslint-disable-next-line class-methods-use-this
  private renderInOutPut(lNode: Element): TemplateResult {
    return html`<div style="margin-top:20px;">
      <span title="Add Source References">
        <mwc-icon-button
          id="daPickerButton"
          @click=${(evt: Event) => {
            evt.stopPropagation();
            this.lNodeForCalculation = lNode;
            this.isControlRef = false;
            this.isSrcRefUpdate = false;
            this.daPickerDialog.show();
          }}
        >
          <svg xmlns="${svgNs}" width="24" height="24" viewBox="0 -960 960 960">
            ${inputCirclePath}
          </svg>
        </mwc-icon-button>
      </span>
      <span title="Add Single ProcessResource">
        <mwc-icon-button
          id="processResourceButton"
          @click=${(evt: Event) => {
            evt.stopPropagation();
            this.lNodeForCalculation = lNode;
            this.processResourceDiag.show();
          }}
        >
          <svg xmlns="${svgNs}" width="24" height="24" viewBox="0 -960 960 960">
            ${switchAddPath}
          </svg>
        </mwc-icon-button>
      </span>
      <nav>
        <span title="Add Control References">
          <mwc-icon-button
            id="daPickerButton"
            @click=${(evt: Event) => {
              evt.stopPropagation();
              this.lNodeForCalculation = lNode;
              this.isControlRef = true;
              this.isSrcRefUpdate = false;
              this.daPickerDialog.show();
            }}
          >
            <svg
              xmlns="${svgNs}"
              width="24"
              height="24"
              viewBox="0 -960 960 960"
            >
              ${outputCirclePath}
            </svg>
          </mwc-icon-button>
        </span>
      </nav>
    </div>`;
  }

  private renderLNodes(lNode: Element): TemplateResult {
    return html`<div
      class="${classMap({
        container: true,
        lnode: true,
        selected: lNode === this.lNodeForDetail,
        unmapped: !!lNode.querySelector(':scope SourceRef:not([source])'),
      })}"
      @click="${() => {
        this.lNodeForDetail = lNode;
      }}"
    >
      <nav>
        <span title="Remove Logical Node">
          <mwc-icon-button
            icon="delete"
            @click="${() => this.dispatchEvent(newEditEvent({ node: lNode }))}"
          >
          </mwc-icon-button>
        </span>
      </nav>
      ${lNode.getAttribute('prefix') ?? ''}${lNode.getAttribute(
        'lnClass'
      )}${lNode.getAttribute('lnInst')}${this.renderSourceRef(
        lNode
      )}${this.renderControlRef(lNode)}
      ${this.renderInOutPut(lNode)}
    </div>`;
  }

  private renderInputs(): TemplateResult {
    this.inputs = groupedSourceRefs(this.function!);
    return html`${this.inputs.map(
      input =>
        html`<span class="input selectpane" title="${input.source}">
          <div
            class="${classMap({
              link: true,
              input: true,
            })}"
          ></div
        ></span>`
    )}`;
  }

  private renderOutputs(): TemplateResult {
    return html`${this.outputs.map(
      input =>
        html`<span class="input selectpane" title="${input.controlled}">
          <div
            class="${classMap({
              link: true,
              input: true,
            })}"
          ></div
        ></span>`
    )}`;
  }

  // eslint-disable-next-line class-methods-use-this
  private renderSubFunction(subFunc: Element): TemplateResult {
    return html`<div
      class="${classMap({
        container: true,
        subfunc: true,
      })}"
    >
      <nav>
        <mwc-icon-button
          icon="account_tree"
          disabled
          @click="${() => this.addSubFunction(subFunc)}"
        ></mwc-icon-button>
        <mwc-icon-button
          icon="delete"
          @click="${() => this.removeFunction(subFunc)}"
        >
        </mwc-icon-button>
        <mwc-icon-button
          @click="${() => {
            this.openLNodeDialog(subFunc);
          }}"
        >
          <svg xmlns="${svgNs}" width="24" height="24" viewBox="0 -960 960 960">
            ${listAddPath}
          </svg>
        </mwc-icon-button>
      </nav>
      ${subFunc.getAttribute('name')}
      ${Array.from(
        subFunc.querySelectorAll(':scope > SubFunction, :scope > EqSubFunction')
      ).map(subSubFunc => this.renderSubFunction(subSubFunc))}
      ${Array.from(subFunc.querySelectorAll(':scope > LNode')).map(lNode =>
        this.renderLNodes(lNode)
      )}
    </div>`;
  }

  private renderFuncDetail(): TemplateResult {
    if (!this.function)
      return html`<div class="container func detail">
        Select function for more detail.
      </div>`;

    return html`${this.renderInputs()} ${this.renderSourceRefPicker()}
      ${this.renderProcessResourcePicker()}
      <div class="container func detail">
        <nav>
          <mwc-icon-button
            icon="edit"
            disabled
            @click="${() => this.openEditWizard(this.function!)}"
          >
          </mwc-icon-button>
          <mwc-icon-button
            icon="account_tree"
            disabled
            @click="${() => this.addSubFunction(this.function!)}"
          >
          </mwc-icon-button>
          <mwc-icon-button
            icon="delete"
            @click="${() => this.removeFunction(this.function!)}"
          >
          </mwc-icon-button>
          <mwc-icon-button
            @click="${() => this.openLNodeDialog(this.function!)}"
          >
            <svg
              xmlns="${svgNs}"
              width="24"
              height="24"
              viewBox="0 -960 960 960"
            >
              ${listAddPath}
            </svg>
          </mwc-icon-button>
        </nav>
        ${this.function.getAttribute('name')}
        ${Array.from(
          this.function.querySelectorAll(
            ':scope > SubFunction, :scope > EqSubFunction'
          )
        ).map(subFunc => this.renderSubFunction(subFunc))}
        ${Array.from(this.function.querySelectorAll(':scope > LNode')).map(
          lNode => this.renderLNodes(lNode)
        )}
      </div>
      ${this.renderOutputs()}`;
  }

  render() {
    if (!this.function) return html`<h1>No Function Selected!</h1>`;

    return html`<main>
      <div style="width:100%;overflow-y:scroll;">
        <div style="flex:auto;display:flex; height:100%; margin: 10px;">
          ${this.renderFuncDetail()}
        </div>
        ${this.renderLNodeTypePicker()} ${this.renderLNodeDetail()}
        ${this.renderExtRefPicker()}
      </div>
    </main>`;
  }

  static styles = css`
    main {
      width: 100%;
      height: 100%;
    }

    h1,
    h3 {
      color: var(--fedit-text-color);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      line-height: 48px;
      padding-left: 0.3em;
    }

    mwc-icon-button {
      --mdc-icon-button-size: 20px;
    }

    .container {
      border-radius: 10px;
      margin: 10px;
      padding: 10px;
      position: relative;
    }

    .container.func {
      background-color: var(--fedit-func-color);
      flex: auto;
    }

    .container.subfunc {
      background-color: var(--fedit-subfunc-color);
    }

    .container.lnode {
      background-color: var(--fedit-lnode-color);
    }

    .container.selected {
      background-color: var(--fedit-selected-color);
      color: var(--fedit-selected-text-color);
    }

    .link {
      background-color: var(--fedit-link-color);
    }

    .link.input {
      width: 4px;
      margin: 2.5px;
      border-radius: 3px;
      height: 100%;
    }

    .table.lnode.detail {
      width: auto;
      min-width: 300px;
      max-width: calc(100% - 50px);
      max-height: 500px;
      position: fixed;
      right: 20px;
      bottom: 20px;
      overflow: scroll;
      border-radius: 10px;
      background-color: var(--fedit-detail-base2);
      padding: 10px;
      box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
      outline-width: 4px;
      transition: all 250ms linear;
    }

    .input.selectpane:hover {
      opacity: 0.5;
      background-color: var(--fedit-hover-color);
    }

    thead tr {
      background-color: var(--fedit-detail-base1);
    }

    thead th {
      font-weight: 500;
    }

    tbody th {
      font-weight: 300;
    }

    tbody tr:nth-child(odd) {
      background-color: var(--fedit-detail-base2);
    }

    tbody tr:nth-child(even) {
      background-color: var(--fedit-detail-base1);
    }

    nav {
      float: right;
    }

    .lnode.tab {
      flex: auto;
      text-align: center;
      border-radius: 5px;
    }

    .lnode.tab.selected {
      background-color: var(--fedit-selected-color);
      color: var(--oscd-base2);
    }

    .lnode.tab:hover {
      background-color: var(--fedit-hover-color);
    }

    .content.prores {
      display: flex;
      flex-direction: column;
    }

    .content.prores > * {
      margin: 8px 10px 16px;
    }

    * {
      --mdc-theme-primary: var(--fedit-primary);
      --mdc-theme-secondary: var(--fedit-secondary);

      --md-sys-color-primary: var(--fedit-primary);
      --md-sys-color-secondary: var(--fedit-secondary);
      --md-sys-typescale-body-large-font: var(
        --oscd-theme-text-font,
        'Roboto',
        sans-serif
      );
      --md-outlined-text-field-input-text-color: var(--fedit-text-color);

      --md-sys-color-surface: var(--fedit-surface);
      --md-sys-color-on-surface: var(--fedit-text-color);
      --md-sys-color-on-primary: var(--fedit-text-color);
      --md-sys-color-on-surface-variant: var(--fedit-text-color);
      --md-menu-container-color: var(--fedit-surface);
      font-family: var(--oscd-theme-text-font, 'Roboto', sans-serif);
      --md-sys-color-surface-container-highest: var(--oscd-base2);
    }
  `;
}

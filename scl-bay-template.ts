/* eslint-disable lit/no-duplicate-template-bindings */
/* eslint-disable lit-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-return-assign */
import { css, html, LitElement, nothing, TemplateResult } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import '@material/mwc-dialog';
import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@material/mwc-icon';
import '@material/mwc-select';

import '@material/mwc-textfield';

import type { Dialog } from '@material/mwc-dialog';
import type { TextField } from '@material/mwc-textfield';

import { newEditEvent } from '@openscd/open-scd-core';

import { createElement } from '@openenergytools/scl-lib/dist/foundation/utils.js';

import { getReference, importLNodeType } from '@openenergytools/scl-lib';

import AddFunctionDialog, {
  DialogMode,
} from './components/add-function-dialog.js';

import { newCreateWizardEvent, buildLibDocName } from './foundation.js';
import { resizePath } from './foundation/sldIcons.js';

import './sld-viewer.js';
import './function-editor.js';

export const xmlnsNs = 'http://www.w3.org/2000/xmlns/';

export const ns6100 = 'http://www.iec.ch/61850/2019/SCL/6-100';

export const pref6100 = 'eTr_6-100';

function funcPath(func: Element, path: string[]): string {
  if (!func.parentElement || func.parentElement.tagName === 'SCL') {
    const name = func.getAttribute('name') ?? '';
    path.splice(0, 0, name);
    return path.join('/');
  }

  const name = func.getAttribute('name') ?? '';

  path.splice(0, 0, name);
  return funcPath(func.parentElement, path);
}

function lNodePath(lNode: Element, path: string[]): string {
  if (!lNode.parentElement || lNode.parentElement.tagName === 'SCL') {
    const name = lNode.getAttribute('name') ?? '';
    path.splice(0, 0, name);
    return path.join('/');
  }

  const name = lNode.getAttribute('name') ?? '';

  path.splice(0, 0, name);
  return lNodePath(lNode.parentElement, path);
}

function highlightFunc(func: Element, selectedFunc: Element): boolean {
  if (!selectedFunc) return false;

  const srcfunc = funcPath(func, []);

  return Array.from(
    selectedFunc.querySelectorAll(':scope LNode > Private SourceRef')
  ).some(srcRef => srcRef.getAttribute('source')?.startsWith(srcfunc));
}

function linkedEquipment(doc: XMLDocument, selectedFunc?: Element): Element[] {
  if (!selectedFunc) return [];

  return Array.from(
    doc.querySelectorAll(
      ':root > Substation > VoltageLevel > Bay > ConductingEquipment'
    )
  ).filter(condEq => {
    const lNodePaths = Array.from(condEq.querySelectorAll('LNode')).map(lNode =>
      lNodePath(lNode, [])
    );

    return lNodePaths.some(path =>
      Array.from(
        selectedFunc.querySelectorAll(':scope LNode > Private SourceRef')
      ).some(srcRef => srcRef.getAttribute('source')?.startsWith(path))
    );
  });
}

function unmappedEquipment(doc: XMLDocument): Element[] {
  return Array.from(
    doc.querySelectorAll('VoltageLevel,Bay,ConductingEquipment')
  ).filter(
    procElement =>
      !!procElement.querySelector(
        ':scope > Function SourceRef:not([source]),:scope > EqFunction SourceRef:not([source])'
      )
  );
}

function getPath(element: Element): string {
  const parent = element.parentElement;
  if (!parent || parent.tagName === 'SCL')
    return `${element.getAttribute('name')}`;
  return `${getPath(parent)}/${element.getAttribute('name')}`;
}

function updateFuncClone(func: Element, newParent: Element): Element {
  const newPath = getPath(newParent);
  const oldPath = getPath(func.parentElement!);
  const funcClone = func.cloneNode(true) as Element;

  Array.from(funcClone.querySelectorAll(':scope SourceRef')).forEach(srcRef => {
    const source = srcRef.getAttribute('source');
    if (source) {
      const newSource = source.replace(oldPath, newPath);
      srcRef.setAttribute('source', newSource);
    }
  });

  return funcClone;
}

function getLibDocInfo(libDoc: XMLDocument | undefined | null) {
  if (!libDoc) return { fileName: '', version: '', lastUpdated: '' };

  const header = libDoc.querySelector(':root > Header');
  const fileName = buildLibDocName(libDoc.documentElement);
  const version = header?.getAttribute('version') ?? '';

  let lastUpdated = '';
  if (header) {
    const history = header.querySelector('History');
    if (history && version) {
      const hitem = Array.from(history.querySelectorAll('Hitem')).find(
        h => h.getAttribute('version') === version
      );
      lastUpdated = hitem?.getAttribute('when') ?? '';
    }
  }

  return { fileName, version, lastUpdated };
}

export default class SclBayTemplate extends LitElement {
  @property({ attribute: false })
  doc?: XMLDocument;

  @property()
  docs: Record<string, XMLDocument> = {};

  @property({ type: Number })
  editCount = -1;

  @property({ attribute: false })
  get substation(): Element | null {
    return this.doc?.querySelector(':root > Substation') ?? null;
  }

  @property({ attribute: false })
  compasApi?: {
    lNodeLibrary: {
      loadLNodeLibrary: () => Promise<Document | null>;
      lNodeLibrary: () => Document | null;
    };
  };

  @state()
  lNodeTypeSrc: { name: string; src: XMLDocument }[] = [];

  @state()
  gridSize = 32;

  @state()
  get bay(): Element | null {
    return (
      this.doc?.querySelector(':root > Substation > VoltageLevel > Bay') ?? null
    );
  }

  @state()
  parent?: Element;

  @state()
  selectedFunc?: Element;

  @state()
  sldWidth: number = 600;

  @query('#service') serviceSelector!: HTMLSelectElement;

  @query('#funcinput') fsdInput!: HTMLInputElement;

  @query('#existProcessResource') proResNameSel!: HTMLSelectElement;

  @query('#proresname') proResName!: TextField;

  @query('#proresselector') proResSelector!: TextField;

  @query('#prorescardinality') proResCardinality!: TextField;

  @query('#proresmax') proResMax!: TextField;

  @query('#proresservice') proResService!: TextField;

  @query('#sldWidthDialog') sldWidthDiag?: Dialog;

  @query('#lnode-lib-info') lnodeLibDialog?: Dialog;

  @query('#add-function-dialog') addFunctionDialog?: AddFunctionDialog;

  connectedCallback() {
    super.connectedCallback();
    if (this.compasApi?.lNodeLibrary?.loadLNodeLibrary) {
      this.compasApi.lNodeLibrary
        .loadLNodeLibrary()
        .then(() => this.requestUpdate());
    }
  }

  private openCreateWizard(tagName: string): void {
    if (this.parent)
      this.dispatchEvent(newCreateWizardEvent(this.parent, tagName));
  }

  addFunction(): void {
    const hasNotSelectedElement = this.parent === undefined;
    if (hasNotSelectedElement) {
      throw new Error('No element selected in SLD');
    }

    const tagName = this.parent?.tagName;
    const parentTagName = this.parent?.parentElement?.tagName;
    const isBayOrVoltageLevel = tagName === 'Bay' || tagName === 'VoltageLevel';
    const elementOrParentIsPowerTransformer =
      tagName === 'PowerTransformer' || parentTagName === 'PowerTransformer';
    const isConductingEquipment = tagName === 'ConductingEquipment';

    if (isBayOrVoltageLevel) {
      this.openCreateWizard('Function');
    } else if (elementOrParentIsPowerTransformer) {
      this.addFunctionDialog?.show(this.parent!, DialogMode.PowerTransformer);
    } else if (isConductingEquipment) {
      this.addFunctionDialog?.show(
        this.parent!,
        DialogMode.ConductingEquipment
      );
    }
  }

  addSubFunction(parent: Element): void {
    if (parent.tagName === 'Function' || parent.tagName === 'SubFunction') {
      this.dispatchEvent(newCreateWizardEvent(parent, 'SubFunction'));
      return;
    }

    this.dispatchEvent(newCreateWizardEvent(parent, 'EqSubFunction'));
  }

  subFunction(subFunc: Element): Element {
    const eqSubFunc = createElement(this.doc!, 'EqSubFunction', {});
    const name = subFunc.getAttribute('name');
    if (name) eqSubFunc.setAttribute('name', name);

    Array.from(subFunc.children).forEach(child => {
      if (child.tagName === 'SubFunction')
        eqSubFunc.appendChild(this.subFunction(child));
      else eqSubFunc.appendChild(child.cloneNode(true));
    });

    return eqSubFunc;
  }

  // eslint-disable-next-line class-methods-use-this
  async importFunction(event: Event): Promise<void> {
    const file = (<HTMLInputElement | null>event.target)?.files?.item(0);
    if (!file) return;

    const text = await file.text();
    const func = new DOMParser()
      .parseFromString(text, 'application/xml')
      .querySelector('Function');

    if (!func || !this.parent) return;

    const funcClone = updateFuncClone(func, this.parent);

    // check if current doc has xmlns:eTr_6-100
    const hasXmlns6100 =
      !!this.doc!.documentElement.lookupNamespaceURI('eTr_6-100');

    if (!hasXmlns6100)
      this.doc!.documentElement.setAttributeNS(
        xmlnsNs,
        'xmlns:eTr_6-100',
        ns6100
      );

    const uniqueLnTypes = new Set(
      Array.from(funcClone.querySelectorAll(':scope LNode'))
        .map(lNode => lNode.getAttribute('lnType'))
        .filter(lnType => lnType) as string[]
    );

    uniqueLnTypes.forEach(lnType => {
      const lNodeType = func.ownerDocument.querySelector(
        `:root > DataTypeTemplates > LNodeType[id="${lnType}"]`
      );
      if (lNodeType)
        this.dispatchEvent(newEditEvent(importLNodeType(lNodeType, this.doc!)));
    });

    if (
      this.parent?.tagName === 'ConductingEquipment' ||
      this.parent.tagName === 'PowerTransformer' ||
      this.parent.tagName === 'TransformerWinding'
    ) {
      const eqFunc = createElement(this.doc!, 'EqFunction', {});
      const name = funcClone.getAttribute('name');
      if (name) eqFunc.setAttribute('name', name);

      Array.from(funcClone.children).forEach(child => {
        if (child.tagName === 'SubFunction')
          eqFunc.appendChild(this.subFunction(child));
        else eqFunc.appendChild(child.cloneNode(true));
      });

      this.dispatchEvent(
        newEditEvent({
          parent: this.parent,
          node: eqFunc,
          reference: getReference(this.parent, 'EqFunction'),
        })
      );
    } else {
      this.dispatchEvent(
        newEditEvent({
          parent: this.parent,
          node: funcClone.cloneNode(true),
          reference: getReference(this.parent, 'Function'),
        })
      );
    }
  }

  private renderFuncContainers(): TemplateResult {
    const root = this.parent
      ? this.parent
      : this.doc?.querySelector(':root > Substation');

    const selector = this.parent
      ? ':scope > Function, :scope > EqFunction'
      : ':scope Function, :scope EqFunction';

    if (!root)
      return html`<div class="container allfunc">
        Please load a SCL file with valid substation section
      </div>`;

    return html`<div class="container allfunc">
      ${root.getAttribute('name')}
      <nav>
        <span title="Import from Function Specification">
          <mwc-icon-button
            disabled
            icon="copy_all"
            @click="${() => this.fsdInput.click()}"
          ></mwc-icon-button>
        </span>
        <input
          id="funcinput"
          style="display:none;"
          type="file"
          accept=".fsd,"
          @click=${({ target }: MouseEvent) => {
            // eslint-disable-next-line no-param-reassign
            (<HTMLInputElement>target).value = '';
          }}
          @change=${this.importFunction}
        />
        <span title="Create New Function/EqFunction">
          <mwc-icon-button
            icon="functions"
            .disabled=${!this.parent}
            @click="${() => this.addFunction()}"
          ></mwc-icon-button>
        </span>
        ${root.tagName === 'ConductingEquipment' ||
        root.tagName === 'PowerTransformer' ||
        root.tagName === 'TransformerWinding'
          ? html` <span title="Create New SubEquipment">
              <mwc-icon-button
                disabled
                icon="subdirectory_arrow_right"
                @click="${() => this.openCreateWizard('SubEquipment')}"
              ></mwc-icon-button>
            </span>`
          : nothing}
      </nav>
      ${Array.from(root.querySelectorAll(selector)).map(
        func =>
          // eslint-disable-next-line lit-a11y/click-events-have-key-events
          html` <div
            class="${classMap({
              container: true,
              func: true,
              selected: this.selectedFunc === func,
              unmapped: !!func.querySelector(':scope SourceRef:not([source])'),
            })}"
            @click="${() => {
              this.selectedFunc = func;
            }}"
          >
            <mwc-icon-button
              icon="functions"
              style="pointer-events: none;"
            ></mwc-icon-button>
            ${func.getAttribute('name')}
          </div>`
      )}
      ${Array.from(root.querySelectorAll(':scope>SubEquipment')).map(subEq => {
        const subEqPhase = subEq.getAttribute('phase');
        // eslint-disable-next-line lit-a11y/click-events-have-key-events
        return html`<div
          class="${classMap({
            container: true,
            func: true,
            selected: this.selectedFunc === subEq,
            linked: highlightFunc(subEq, this.selectedFunc!),
          })}"
          @click="${() => {
            this.selectedFunc = subEq;
          }}"
        >
          <mwc-icon-button
            icon="subdirectory_arrow_right"
            style="pointer-events: none;"
          ></mwc-icon-button>
          ${subEq.getAttribute('name')}
          ${subEqPhase ? `(Phase: ${subEqPhase})` : nothing}
        </div>`;
      })}
    </div>`;
  }

  private renderWidthDialog(): TemplateResult {
    return html`<mwc-dialog heading="SLD pane width" id="sldWidthDialog"
      ><mwc-textfield type="number" value="${this.sldWidth}"></mwc-textfield>
      <mwc-button
        slot="primaryAction"
        label="Save"
        icon="save"
        @click="${(evt: Event) => {
          this.sldWidth = parseInt(
            ((evt.target as Element).previousElementSibling as TextField).value,
            10
          );
          this.sldWidthDiag?.close();
        }}"
      ></mwc-button
    ></mwc-dialog>`;
  }

  // eslint-disable-next-line class-methods-use-this
  private renderAddFunctionDialog(): TemplateResult {
    return html`<add-function-dialog-632c87ac
      id="add-function-dialog"
    ></add-function-dialog-632c87ac>`;
  }

  private openLibDocInfoDialog() {
    this.lnodeLibDialog?.show();
  }

  private closeLibDocInfoDialog() {
    this.lnodeLibDialog?.close();
  }

  private renderLibDocInfoDialog(): TemplateResult {
    const libDoc = this.compasApi?.lNodeLibrary?.lNodeLibrary() ?? null;
    const { fileName, version, lastUpdated } = getLibDocInfo(libDoc);

    let formattedDate = lastUpdated;
    if (lastUpdated) {
      const date = new Date(lastUpdated);
      if (!Number.isNaN(date.getTime())) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const time = date.toTimeString().slice(0, 8);
        formattedDate = `${day}-${month}-${year} ${time}`;
      }
    }
    return html`
      <mwc-dialog
        id="lnode-lib-info"
        heading="LNodeType Library Info"
        @closed=${this.closeLibDocInfoDialog}
      >
        <div>
          <div>
            <b>File name:</b> ${fileName || 'No LNodeType Library loaded'}
          </div>
          <div><b>Version:</b> ${version}</div>
          <div><b>Last update:</b> ${formattedDate}</div>
        </div>
        <mwc-button slot="primaryAction" dialogAction="close">Close</mwc-button>
      </mwc-dialog>
    `;
  }

  render() {
    if (!this.substation) return html`<main>No substation section</main>`;

    return html`<main>
      <div class="btn-group">
        <mwc-icon-button
          icon="info"
          @click="${() => this.openLibDocInfoDialog()}"
          title="Show LibDoc info"
          ></mwc-icon-button>
      </div>
      <div class="columns">
        <div style="margin:10px;width:${this.sldWidth}px">
          <div>
            <span title="Resize SLD"
              ><mwc-icon-button
                style="--mdc-icon-button-size:48px;"
                @click="${() => this.sldWidthDiag?.show()}"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 96 960 960"
                  opacity="0.83"
                >
                  ${resizePath}
                </svg>
              </mwc-icon-button></span
            >
          </div>
          <compas-sld-viewer-9f3b7c1d
            .substation=${this.substation}
            .gridSize=${this.gridSize}
            .parent=${this.parent}
            .linked=${linkedEquipment(this.doc!, this.selectedFunc)}
            .unmapped=${unmappedEquipment(this.doc!)}
            @select-equipment="${(evt: CustomEvent) => {
              this.parent = evt.detail.element;
              this.selectedFunc = undefined;
            }}"
          ></compas-sld-viewer-9f3b7c1d>
        </div>
        <div style="width:100%;overflow-y:scroll;">
          <div style="flex:auto;display:flex; height:100%">
            ${this.renderFuncContainers()}
            <compas-function-editor-a1b2c3d4
              style="flex:auto;"
              .doc="${this.doc}"
              editCount="${this.editCount}"
              .function="${this.selectedFunc}"
              .lNodeLib="${
                this.compasApi?.lNodeLibrary?.lNodeLibrary() ?? null
              }"
            ></compas-function-editor-a1b2c3d4>
          </div>
        </div>
        <div>
      </main>
      ${this.renderWidthDialog()}
      ${this.renderAddFunctionDialog()}
      ${this.renderLibDocInfoDialog()}`;
  }

  static styles = css`
    * {
      --fedit-primary: var(--oscd-primary);
      --fedit-secondary: var(--oscd-secondary);
      --fedit-surface: var(--oscd-base2);

      --fedit-text-color: var(--oscd-base03);
      --fedit-func-color: var(--oscd-base3);
      --fedit-subfunc-color: var(--oscd-base3);
      --fedit-lnode-color: var(--oscd-base2);
      --fedit-selected-color: var(--oscd-base00);
      --fedit-selected-text-color: var(--oscd-base2);
      --fedit-link-color: var(--oscd-base03);
      --fedit-detail-base1: var(--oscd-base2);
      --fedit-detail-base2: var(--oscd-base3);
      --fedit-hover-color: var(--oscd-secondary);
    }

    :host {
      width: 100%;
      height: 100%;
    }

    main {
      width: 100%;
      height: 100%;
      --mdc-theme-text-disabled-on-light: rgba(0, 0, 0, 0.38);
    }

    sld-viewer {
      margin: 20px;
      max-width: 600px;
      overflow: scroll;
    }

    mwc-icon-button {
      --mdc-icon-button-size: 20px;
    }

    .container.unmapped {
      background-color: var(--oscd-secondary);
    }

    .columns {
      display: flex;
      flex-direction: row;
    }

    .container.allfunc {
      min-width: 200px;
      background-color: var(--oscd-base3);
    }

    nav {
      float: right;
    }

    .container {
      border-radius: 10px;
      border: 2px solid var(--oscd-base03);
      margin: 10px;
      padding: 10px;
    }

    .container.selected {
      background-color: var(--oscd-base00);
      color: var(--oscd-base2);
    }

    .btn-group {
      display: flex;
      margin-right: 12px;
      margin-top: 12px;
      justify-content: flex-end;
      align-items: baseline;
    }
  `;
}

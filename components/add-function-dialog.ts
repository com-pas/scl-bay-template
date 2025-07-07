import { css, html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import { Insert, newEditEvent } from '@openscd/open-scd-core';

import { SclTextField } from '@openenergytools/scl-text-field';
import { createElement } from '@openenergytools/scl-lib/dist/foundation/utils.js';

import { Dialog } from '@material/mwc-dialog';
import { Button } from '@material/mwc-button';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import {
  createPowerSystemRelationElement,
  getProcessPath,
} from '../foundation/scl.js';

// eslint-disable-next-line no-shadow
export enum DialogMode {
  PowerTransformer = 'PowerTransformer',
  ConductingEquipment = 'ConductingEquipment',
}

interface FormValue {
  name: string | null;
  desc: string | null;
  type: string | null;
}

@customElement('add-function-dialog-632c87ac')
export default class AddFunctionDialog extends ScopedElementsMixin(LitElement) {
  static scopedElements = {
    'scl-text-field': SclTextField,
    'mwc-dialog': Dialog,
    'mwc-button': Button,
  };

  @query('#add-function-dialog-internal') dialog!: Dialog;

  @query('scl-text-field[label="name"]') nameTextField!: SclTextField;

  @query('scl-text-field[label="desc"]') descTextField!: SclTextField;

  @query('scl-text-field[label="type"]') typeTextField!: SclTextField;

  private element: Element | null = null;

  private mode: DialogMode = DialogMode.ConductingEquipment;

  public show(element: Element, mode: DialogMode) {
    this.element = element;
    this.mode = mode;
    this.dialog.show();
  }

  public close() {
    this.resetForm();
    this.dialog.close();
  }

  private resetForm(): void {
    this.nameTextField.value = '';
    this.descTextField.value = '';
    this.typeTextField.value = '';
  }

  private onSave(): void {
    const name = this.nameTextField.value;
    const desc = this.descTextField.value;
    const type = this.typeTextField.value;

    const values: FormValue = { name, desc, type };

    if (this.element === null) {
      throw new Error(`No element provided to add function dialog`);
    }

    if (this.mode === DialogMode.PowerTransformer) {
      // Add function to parent bay, VoltageLevel or substation
      // Add PowerSystemRelation -> PowerTransformer

      const bayVoltageLevelOrSubstation = this.element.closest(
        'Bay, VoltageLevel, Substation'
      );

      if (bayVoltageLevelOrSubstation === null) {
        throw new Error(
          `Element ${this.element.getAttribute(
            'name'
          )} does not have parent bay, voltage level or substation`
        );
      }

      const isPowerTransformer = this.element.tagName === 'PowerTransformer';
      const powerTransformer = isPowerTransformer
        ? this.element
        : this.element.parentElement;

      if (!powerTransformer) {
        throw new Error(`Powertransformer not found`);
      }

      const pathToPowerTransformer = getProcessPath(powerTransformer);
      const powerSystemRelationElement = createPowerSystemRelationElement(
        this.element.ownerDocument,
        pathToPowerTransformer
      );

      const functionElement = createElement(
        bayVoltageLevelOrSubstation.ownerDocument,
        'Function',
        {
          ...values,
        }
      );

      functionElement.appendChild(powerSystemRelationElement);

      const functionInsert: Insert = {
        parent: bayVoltageLevelOrSubstation,
        node: functionElement,
        reference: null,
      };

      this.dispatchEvent(newEditEvent(functionInsert));
    } else {
      // Add function to parent bay
      // Add PowerSystemRelation -> ConductingEquipment

      const conductingEquipment = this.element;
      const bay = conductingEquipment.closest('Bay');

      if (bay === null) {
        throw new Error(
          `ConductingEquipment ${conductingEquipment.getAttribute(
            'name'
          )} does not have parent bay`
        );
      }

      const functionElement = createElement(bay.ownerDocument, 'Function', {
        ...values,
      });

      const pathToConductingEquipment = getProcessPath(conductingEquipment);
      const powerSystemRelationElement = createPowerSystemRelationElement(
        this.element.ownerDocument,
        pathToConductingEquipment
      );

      functionElement.appendChild(powerSystemRelationElement);

      const functionInsert: Insert = {
        parent: bay,
        node: functionElement,
        reference: null,
      };

      this.dispatchEvent(newEditEvent(functionInsert));
    }
    this.close();
  }

  protected render() {
    return html`<mwc-dialog
      id="add-function-dialog-internal"
      heading="Add function"
    >
      <div class="input-container">
        <scl-text-field
          label="name"
          .value=${''}
          required
          dialogInitialFocus
        ></scl-text-field>
        <scl-text-field
          label="desc"
          .maybeValue=${''}
          nullable
        ></scl-text-field>
        <scl-text-field
          label="type"
          .maybeValue=${''}
          nullable
        ></scl-text-field>
      </div>
      <mwc-button
        slot="secondaryAction"
        label="close"
        @click=${this.close}
      ></mwc-button>
      <mwc-button
        slot="primaryAction"
        label="save"
        icon="save"
        @click="${this.onSave}"
      ></mwc-button>
    </mwc-dialog>`;
  }

  static styles = css`
    .input-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
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
      --md-filled-text-field-input-text-color: var(--fedit-text-color);

      --md-sys-color-surface: var(--fedit-surface);
      --md-sys-color-on-surface: var(--fedit-text-color);
      --md-sys-color-on-primary: var(--fedit-text-color);
      --md-sys-color-on-surface-variant: var(--fedit-text-color);
      --md-menu-container-color: var(--fedit-surface);
      font-family: var(--oscd-theme-text-font, 'Roboto', sans-serif);
      --md-sys-color-surface-container-highest: var(--fedit-surface);
    }
  `;
}

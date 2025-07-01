import { css, html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import { Insert } from '@openscd/open-scd-core';

import { SclTextField } from '@openenergytools/scl-text-field';
import { createElement } from '@openenergytools/scl-lib/dist/foundation/utils.js';
// import '@openenergytools/scl-text-field';
// import '@material/mwc-dialog';

import { Dialog } from '@material/mwc-dialog';
import { Button } from '@material/mwc-button';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';

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

@customElement('add-function-dialog')
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

  private reservedValues = '';

  private element: Element | null = null;

  private mode: DialogMode = DialogMode.ConductingEquipment;

  public show(element: Element, mode: DialogMode) {
    this.element = element;
    this.mode = mode;
    this.dialog.show();
  }

  public close() {
    this.dialog.close();
  }

  // eslint-disable-next-line class-methods-use-this
  private buildInsertFunction(parent: Element, values: FormValue): Insert {
    const functionElement = createElement(parent.ownerDocument, 'Function', {
      ...values,
    });

    return {
      parent,
      node: functionElement,
      reference: null,
    };
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

      const functionInsert = this.buildInsertFunction(
        bayVoltageLevelOrSubstation,
        values
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const inserts: Insert[] = [functionInsert];
    } else {
      // Add function to parent bay
      // Add PowerSystemRelation -> ConductingEquipment

      const conductingEquipment = this.element;
      const bay = conductingEquipment.closest('bay');

      if (bay === null) {
        throw new Error(
          `ConductingEquipment ${conductingEquipment.getAttribute(
            'name'
          )} does not have parent bay`
        );
      }

      const functionInsert = this.buildInsertFunction(bay, values);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const inserts: Insert[] = [functionInsert];
    }
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
          .reservedValues=${this.reservedValues}
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
  `;
}

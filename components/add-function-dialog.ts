import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import { SclTextField } from '@openenergytools/scl-text-field';
// import '@openenergytools/scl-text-field';
// import '@material/mwc-dialog';

import { Dialog } from '@material/mwc-dialog';

import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';

// TODO: Scoped mixin

@customElement('add-function-dialog')
export default class AddFunctionDialog extends ScopedElementsMixin(LitElement) {
  static scopedElements = {
    'scl-text-field': SclTextField,
    'mwc-dialog': Dialog,
  };

  @query('#add-function-dialog-internal') dialog!: Dialog;

  @state() open = false;

  public show() {
    this.dialog.show();
  }

  public close() {
    this.dialog.close();
  }

  protected render() {
    const options = {
      name: 'hello',
      reservedValues: 'abc',
      desc: 'desc',
      type: '2',
    };
    return html`<mwc-dialog
      id="add-function-dialog-internal"
      heading="Add function"
    >
      <div>
        <div>Hello test</div>
        <scl-text-field
          label="name"
          .value=${options.name}
          required
          .reservedValues=${options.reservedValues}
          dialogInitialFocus
        ></scl-text-field>
        <scl-text-field
          label="desc"
          .maybeValue=${options.desc}
          nullable
        ></scl-text-field>
        <scl-text-field
          label="type"
          .maybeValue=${options.type}
          nullable
        ></scl-text-field>
      </div>
    </mwc-dialog>`;
  }
}

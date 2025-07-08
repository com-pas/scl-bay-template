import { LitElement, html, css } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { newEditEvent, Insert } from '@openscd/open-scd-core';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { SclTextField } from '@openenergytools/scl-text-field';
import { Dialog } from '@material/mwc-dialog';
import { Button } from '@material/mwc-button';

@customElement('edit-function-dialog-e4d2f8b7')
export default class EditFunctionDialog extends ScopedElementsMixin(
  LitElement
) {
  static scopedElements = {
    'scl-text-field': SclTextField,
    'mwc-dialog': Dialog,
    'mwc-button': Button,
  };

  @property({ attribute: false })
  element?: Element;

  @property({ attribute: false })
  parent!: Element;

  @property()
  elTagName?: string;

  @property()
  open = false;

  @property()
  requireUniqueName = false;

  @property({ attribute: false })
  siblings: Element[] = [];

  @query('#edit-function-name') nameTextField!: SclTextField;

  @query('#edit-function-desc') descTextField!: SclTextField;

  @query('#edit-function-type') typeTextField!: SclTextField;

  private get isEdit() {
    return !!this.element;
  }

  // Workaround for SclTextField: clears and nulls the value, ensuring the field is visually and logically reset.

  // eslint-disable-next-line class-methods-use-this
  private clearNullableField(field: SclTextField) {
    const f = field;
    f.value = '';
    f.reset();
    f.value = null;
  }

  private resetDialog() {
    this.nameTextField.value = '';
    this.nameTextField.reset();
    this.clearNullableField(this.descTextField);
    this.clearNullableField(this.typeTextField);
  }

  private onDialogClosed() {
    this.resetDialog();
    this.dispatchEvent(new CustomEvent('close'));
  }

  private isNameUnique(name: string): boolean {
    if (!this.requireUniqueName) return true;
    return !this.siblings.some(
      el =>
        el !== this.element &&
        el.getAttribute('name')?.trim().toLowerCase() === name.toLowerCase()
    );
  }

  private validateName(nameField: SclTextField): boolean {
    const name = nameField.value?.trim();
    if (!name) {
      nameField.setCustomValidity('Name is required.');
      nameField.reportValidity();
      return false;
    }
    if (!this.isNameUnique(name)) {
      nameField.setCustomValidity('Name must be unique.');
      nameField.reportValidity();
      return false;
    }
    nameField.setCustomValidity('');
    nameField.reportValidity();
    return true;
  }

  private createElementNode(name: string, desc: string, type: string) {
    const doc = this.parent.ownerDocument;
    if (!doc) return;
    const el = doc.createElement(this.elTagName!);
    if (!el) return;
    el.setAttribute('name', name);
    if (desc) el.setAttribute('desc', desc);
    if (type) el.setAttribute('type', type);
    const insert: Insert = {
      parent: this.parent,
      node: el,
      reference: null,
    };
    this.dispatchEvent(newEditEvent(insert));
  }

  private updateElementNode(name: string, desc: string, type: string) {
    if (!this.element) return;
    const update = {
      element: this.element,
      attributes: {
        name,
        desc: desc || null,
        type: type || null,
      },
    };
    this.dispatchEvent(newEditEvent(update));
  }

  private onSave() {
    const name = this.nameTextField.value?.trim();
    const desc = this.descTextField.value?.trim() ?? '';
    const type = this.typeTextField.value?.trim() ?? '';
    if (!this.validateName(this.nameTextField)) return;
    if (this.isEdit && this.element) {
      this.updateElementNode(name!, desc, type);
    } else {
      this.createElementNode(name!, desc, type);
    }
    this.onDialogClosed();
  }

  render() {
    const heading = this.isEdit
      ? `Edit ${this.element?.tagName ?? 'Element'}`
      : `Add ${this.elTagName ?? 'Element'}`;
    return html`
      <mwc-dialog
        .open=${this.open}
        heading=${heading}
        @closed=${this.onDialogClosed}
      >
        <div class="dialog-content">
          <scl-text-field
            id="edit-function-name"
            label="name"
            required
            .value=${this.element?.getAttribute('name') ?? ''}
          ></scl-text-field>
          <scl-text-field
            id="edit-function-desc"
            label="desc"
            nullable
            .value=${this.element?.getAttribute('desc') ?? null}
            @input=${(e: InputEvent) => {
              const field = e.target as SclTextField;
              if (field.value === null) {
                this.clearNullableField(field);
              }
            }}
          ></scl-text-field>
          <scl-text-field
            id="edit-function-type"
            label="type"
            nullable
            .value=${this.element?.getAttribute('type') ?? null}
            @input=${(e: InputEvent) => {
              const field = e.target as SclTextField;
              if (field.value === null) {
                this.clearNullableField(field);
              }
            }}
          ></scl-text-field>
        </div>
        <mwc-button
          class="close-btn"
          slot="secondaryAction"
          dialogAction="close"
        >
          Close
        </mwc-button>
        <mwc-button slot="primaryAction" icon="save" @click=${this.onSave}>
          Save
        </mwc-button>
      </mwc-dialog>
    `;
  }

  static styles = css`
    :host {
      --md-switch-selected-hover-handle-color: #000;
      --md-switch-selected-pressed-handle-color: #000;
      --md-switch-selected-focus-handle-color: #000;
      --md-sys-color-primary: var(--oscd-primary);
    }
    .dialog-content {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .close-btn {
      --mdc-theme-primary: var(--oscd-error);
    }
  `;
}

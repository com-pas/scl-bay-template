import { LitElement, html, css, PropertyValues } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { newEditEvent, Insert } from '@openscd/open-scd-core';

import '@material/mwc-dialog';
import '@material/mwc-button';
import '@material/mwc-textfield';

import type { TextField } from '@material/mwc-textfield';

@customElement('function-element-dialog')
export class FunctionElementDialog extends LitElement {
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

  @state()
  name = '';

  @state()
  desc = '';

  @state()
  type = '';

  protected updated(_changedProperties: PropertyValues): void {
    if (_changedProperties.has('element')) {
      this.name = this.element?.getAttribute('name') ?? '';
      this.desc = this.element?.getAttribute('desc') ?? '';
      this.type = this.element?.getAttribute('type') ?? '';
    }
  }

  private get isEdit() {
    return !!this.element;
  }

  private resetDialog() {
    this.name = '';
    this.desc = '';
    this.type = '';
    const nameField = this.shadowRoot?.getElementById('name') as TextField;
    if (nameField) {
      nameField.value = '';
      nameField.setCustomValidity('');
    }
    this.open = false;
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

  private validateName(nameField: TextField, name: string): boolean {
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
    const name = this.name.trim();
    const desc = this.desc.trim();
    const type = this.type.trim();
    const nameField = this.shadowRoot?.getElementById('name') as TextField;
    if (!this.validateName(nameField, name)) return;
    if (this.isEdit && this.element) {
      this.updateElementNode(name, desc, type);
    } else {
      this.createElementNode(name, desc, type);
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
          <mwc-textfield
            id="name"
            label="Name"
            required
            .value=${this.name}
            @input=${(e: InputEvent) => {
              this.name = (e.target as HTMLInputElement).value;
            }}
          ></mwc-textfield>
          <mwc-textfield
            id="desc"
            label="Description"
            .value=${this.desc}
            @input=${(e: InputEvent) => {
              this.desc = (e.target as HTMLInputElement).value;
            }}
          ></mwc-textfield>
          <mwc-textfield
            id="type"
            label="Type"
            .value=${this.type}
            @input=${(e: InputEvent) => {
              this.type = (e.target as HTMLInputElement).value;
            }}
          ></mwc-textfield>
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
    .dialog-content {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .close-btn {
      --mdc-theme-primary: var(--oscd-theme-error);
    }
  `;
}

import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import '@material/mwc-dialog';
import '@material/mwc-button';
import '@material/mwc-textfield';
import type { TextField } from '@material/mwc-textfield';

@customElement('function-element-dialog')
export class FunctionElementDialog extends LitElement {
  @property({ attribute: false })
  element?: Element;

  @property({ attribute: false })
  parent?: Element;

  @property()
  elTagName?: string;

  @property()
  open = false;

  @property()
  requireUniqueName = false;

  @property({ attribute: false })
  siblings: Element[] = [];

  @property()
  heading?: string;

  private get isEdit() {
    return !!this.element;
  }

  private get initialName() {
    return this.element?.getAttribute('name') ?? '';
  }

  private get initialDesc() {
    return this.element?.getAttribute('desc') ?? '';
  }

  private get initialType() {
    return this.element?.getAttribute('type') ?? '';
  }

  private onDialogClosed() {
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

  private onSave() {
    const nameField = this.shadowRoot!.getElementById('name') as TextField;
    const descField = this.shadowRoot!.getElementById('desc') as TextField;
    const typeField = this.shadowRoot!.getElementById('type') as TextField;
    const name = nameField.value.trim();
    const desc = descField.value.trim();
    const type = typeField.value.trim();

    if (!name) {
      nameField.setCustomValidity('Name is required.');
      nameField.reportValidity();
      return;
    }
    if (!this.isNameUnique(name)) {
      nameField.setCustomValidity('Name must be unique.');
      nameField.reportValidity();
      return;
    }
    nameField.setCustomValidity('');

    if (this.isEdit && this.element) {
      // Edit mode: update attributes
      this.dispatchEvent(
        new CustomEvent('save', {
          detail: {
            mode: 'edit',
            element: this.element,
            name,
            desc,
            type,
          },
          bubbles: true,
          composed: true,
        })
      );
    } else if (this.parent && this.elTagName) {
      // Create mode: create new element
      this.dispatchEvent(
        new CustomEvent('save', {
          detail: {
            mode: 'create',
            parent: this.parent,
            tagName: this.elTagName,
            name,
            desc,
            type,
          },
          bubbles: true,
          composed: true,
        })
      );
    }
    this.onDialogClosed();
  }

  render() {
    return html`
      <mwc-dialog
        .open=${this.open}
        heading=${this.heading}
        @closed=${this.onDialogClosed}
      >
        <div class="subfunc-dialog-content">
          <mwc-textfield
            id="name"
            label="Name"
            required
            .value=${this.initialName}
          ></mwc-textfield>
          <mwc-textfield
            id="desc"
            label="Description"
            .value=${this.initialDesc}
          ></mwc-textfield>
          <mwc-textfield
            id="type"
            label="Type"
            .value=${this.initialType}
          ></mwc-textfield>
        </div>
        <mwc-button slot="secondaryAction" dialogAction="close">
          Close
        </mwc-button>
        <mwc-button slot="primaryAction" icon="save" @click=${this.onSave}>
          Save
        </mwc-button>
      </mwc-dialog>
    `;
  }

  static styles = css`
    .subfunc-dialog-content {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  `;
}

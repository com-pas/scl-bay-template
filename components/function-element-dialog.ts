import { LitElement, html, css, PropertyValues } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { newEditEvent, Insert } from '@openscd/open-scd-core';

import '@material/mwc-dialog';
import '@material/mwc-button';
import '@material/mwc-textfield';

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
    this.element = undefined;
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

  private onNameInput(e: Event) {
    this.name = (e.target as HTMLInputElement).value;
  }

  private onDescInput(e: Event) {
    this.desc = (e.target as HTMLInputElement).value;
  }

  private onTypeInput(e: Event) {
    this.type = (e.target as HTMLInputElement).value;
  }

  private onSave() {
    const name = this.name.trim();
    const desc = this.desc.trim();
    const type = this.type.trim();

    const nameField = this.shadowRoot?.getElementById(
      'name'
    ) as HTMLInputElement | null;
    if (!name) {
      nameField?.setCustomValidity('Name is required.');
      nameField?.reportValidity();
      return;
    }
    if (!this.isNameUnique(name)) {
      nameField?.setCustomValidity('Name must be unique.');
      nameField?.reportValidity();
      return;
    }
    nameField?.setCustomValidity('');
    nameField?.reportValidity();

    if (this.isEdit && this.element) {
      const update = {
        element: this.element,
        attributes: {
          name,
          desc: desc || null,
          type: type || null,
        },
      };
      this.dispatchEvent(newEditEvent(update));
    } else {
      const doc = this.parent.ownerDocument;
      if (!doc) {
        return;
      }
      const el = doc.createElement(this.elTagName!);
      if (!el) {
        return;
      }
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
            @input=${this.onNameInput}
          ></mwc-textfield>
          <mwc-textfield
            id="desc"
            label="Description"
            .value=${this.desc}
            @input=${this.onDescInput}
          ></mwc-textfield>
          <mwc-textfield
            id="type"
            label="Type"
            .value=${this.type}
            @input=${this.onTypeInput}
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

import { LitElement } from 'lit';
import { SclTextField } from '@openenergytools/scl-text-field';
import { Dialog } from '@material/mwc-dialog';
import { Button } from '@material/mwc-button';
export declare enum DialogMode {
    PowerTransformer = "PowerTransformer",
    ConductingEquipment = "ConductingEquipment"
}
declare const AddFunctionDialog_base: typeof LitElement & import("@open-wc/scoped-elements/lit-element.js").ScopedElementsHostConstructor;
export default class AddFunctionDialog extends AddFunctionDialog_base {
    static scopedElements: {
        'scl-text-field': typeof SclTextField;
        'mwc-dialog': typeof Dialog;
        'mwc-button': typeof Button;
    };
    dialog: Dialog;
    nameTextField: SclTextField;
    descTextField: SclTextField;
    typeTextField: SclTextField;
    private element;
    private mode;
    show(element: Element, mode: DialogMode): void;
    close(): void;
    private resetForm;
    private onSave;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
export {};

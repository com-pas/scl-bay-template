import { LitElement } from 'lit';
import { SclTextField } from '@openenergytools/scl-text-field';
import { Dialog } from '@material/mwc-dialog';
import { Button } from '@material/mwc-button';
declare const EditFunctionDialog_base: typeof LitElement & import("@open-wc/scoped-elements/lit-element.js").ScopedElementsHostConstructor;
export default class EditFunctionDialog extends EditFunctionDialog_base {
    static scopedElements: {
        'scl-text-field': typeof SclTextField;
        'mwc-dialog': typeof Dialog;
        'mwc-button': typeof Button;
    };
    element?: Element;
    parent: Element;
    elTagName?: string;
    open: boolean;
    requireUniqueName: boolean;
    siblings: Element[];
    nameTextField: SclTextField;
    descTextField: SclTextField;
    typeTextField: SclTextField;
    private get isEdit();
    private clearNullableField;
    private resetDialog;
    private onDialogClosed;
    private isNameUnique;
    private validateName;
    private createElementNode;
    private updateElementNode;
    private onSave;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
export {};

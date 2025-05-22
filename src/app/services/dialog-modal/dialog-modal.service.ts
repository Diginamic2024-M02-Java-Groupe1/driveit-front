import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable({ providedIn: 'root' })
export class DialogModalService {
    constructor(private dialogService: DialogService) {}

    show<T>(
        component: any,
        config: {
            header?: string,
            footer?: string,
            width?: string,
            contentStyle?: any,
            closeOnEscape?: boolean,
            resizable?: boolean;
            draggable?: boolean,
            position?: string,
            styleClass?: string,
            data?: any,
            onSave?: () => void,
            onClose?: () => void
        } = {}
    ): DynamicDialogRef {
        const ref = this.dialogService.open(component, {
            header: config.header,
            footer: config.footer,
            width: config.width,
            contentStyle: config.contentStyle,
            data: config.data,
            closable: true,
            dismissableMask: true,
            baseZIndex: 10000,
            closeOnEscape: config.closeOnEscape,
            resizable: config.resizable,
            draggable: config.draggable,
            position: config.position,
            styleClass: config.styleClass,
        });

        ref.onClose.subscribe(() => {
            if (config.onClose) {
                config.onClose();
            }
        });

        return ref;
    }
}
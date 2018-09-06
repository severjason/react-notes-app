import { AppNote }   from "./notes";
import { AppAction } from "./index";

export interface AppModalActions {
    openModal(): AppAction;
    closeModal(): AppAction;
    openModalForUpdate(modalProps: AppNote): AppAction;
}

export interface AppModal {
    opened: boolean;
    openedForUpdate: boolean;
    modalProps: any;
}

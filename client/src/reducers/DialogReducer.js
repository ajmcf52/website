import { DialogEventType } from "../actions/DialogEvent";

const initState = {
    dialogIsOpen: false,
};

export default function DialogReducer(state = initState, action) {
    switch (action.type) {
        case DialogEventType.openOrderDialog:
            return { ...state, dialogIsOpen: true };
        case DialogEventType.closeOrderDialog:
            return { ...state, dialogIsOpen: false };
        default:
            return state;
    }
}

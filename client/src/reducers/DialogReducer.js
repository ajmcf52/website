import { DialogEventType } from "../actions/DialogEvent";

const initState = {
    isOpen: false,
};

export default function DialogReducer(state = initState, action) {
    switch (action.type) {
        case DialogEventType.openOrderDialog:
            return { ...state, isOpen: true };
        case DialogEventType.closeOrderDialog:
            return { ...state, isOpen: false };
        default:
            return state;
    }
}

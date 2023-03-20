import { TabEventType } from '../Actions/TabEvent';

const initState = {
	openTab: 'none'
}

export default function TabReducer(state = initState, action) {
	switch (action.type) {
		case TabEventType.showTab:
			return {
				...state,
				openTab: (action.tabType === state.openTab) ? 'none' : action.tabType
			};
		case TabEventType.hideTab:
			return {
				...state,
				openTab: 'none'
			};
		default:
			return state;
	}
}
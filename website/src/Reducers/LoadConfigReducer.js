import { LoadConfigEventType } from "../Actions/LoadConfigEvent";

export default function LoadConfigReducer(state = {}, action) {
  switch (action.type) {
    case LoadConfigEventType.configLoad:
      return {
        ...state,
        ...action.jsonData,
      };
    default:
      return state;
  }
}

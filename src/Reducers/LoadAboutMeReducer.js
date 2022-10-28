import { LoadAboutMeEventType } from "../Actions/LoadAboutMeEvent";

export default function LoadAboutMeReducer(state = {}, action) {
  switch (action.type) {
    case LoadAboutMeEventType.aboutMeLoad:
      return {
        ...state,
        ...action.aboutMeText,
      };
    default:
      return state;
  }
}

import { combineReducers } from "redux";
import TabReducer from "./TabReducer";
import LoadConfigReducer from "./LoadConfigReducer";
import LoadAboutMeReducer from "./LoadAboutMeReducer";

export default combineReducers({
  tab: TabReducer,
  config: LoadConfigReducer,
  aboutMe: LoadAboutMeReducer,
});

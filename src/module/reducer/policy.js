import _ from "lodash";
import {
  SET_CURRENT_POLICY,
} from "../action/policy";

const defaultState = {
  current_policy: "",
};

export default function policy(state = defaultState, action){
  const containerState = _.cloneDeep(state);
  try {
    switch (action.type) {
      case SET_CURRENT_POLICY:
        return {
          ...containerState,
          current_policy: action.key,
        };
      default: {
        return containerState;
      }
    }
  } catch (e) {
    return state;
  }
}
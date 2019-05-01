import _ from "lodash";
import {
  SET_DOCTORS_FOR_OPTIN
} from "../action/optin";

const defaultState = {
  records: [],
  insurancer: null,
};

export default function optin(state = defaultState, action){
  const containerState = _.cloneDeep(state);
  try {
    switch (action.type) {
      case SET_DOCTORS_FOR_OPTIN:
        return {
          ...containerState,
          records: action.records,
        };
      default: {
        return containerState;
      }
    }
  } catch (e) {
    return state;
  }
}
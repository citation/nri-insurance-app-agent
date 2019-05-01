import _ from "lodash";
import {
  SET_CURRENT,
} from "../action/customer";

const defaultState = {
  id: null,
  name: null,
  age: null,
  birthday: null,
  gender: null,
  policy: [],
  family: [],
  connection: [],
  phone_number: null,
  email: null,
  address: null,
  registed_date: null,
  updated_date: null,
};

export default function customer(state = defaultState, action){
  const containerState = _.cloneDeep(state);
  try {
    switch (action.type) {
      case SET_CURRENT:
        return {
          ...containerState,
          id: action.data.id,
          name: action.data.name,
          age: action.data.age,
          birthday: action.data.birthday,
          gender: action.data.gender,
          policy: action.data.policy,
          family: action.data.family,
          connection: action.data.connection,
          phone_number: action.data.phone_number,
          email: action.data.email,
          address: action.data.address,
          registed_date: action.data.registed_date,
          updated_date: action.data.updated_date,
        };
      default: {
        return containerState;
      }
    }
  } catch (e) {
    return state;
  }
}
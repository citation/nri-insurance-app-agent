import _ from "lodash";
import {
  PUT_ACCOUNT_INFORMATION
} from "../action/account";

// stub
import { Account_Information } from "../../common/stub"

const defaultState = {
  id: null,
  base: {
    name: "",
    birthday: null,
    gender: null,
    phone_number: null,
    email: null,
  },
  address: {
    countory: null,
    postal_code: null,
    state: null,
    city: null,
    address1: null,
    address2: null,
  },
  cooperate:[],
};

export default function account(state = Account_Information, action) {
  const containerState = _.cloneDeep(state);
  try {
    switch (action.type) {
      case PUT_ACCOUNT_INFORMATION:
        return {
          ...containerState,
          id: action.account.id,
          base: {
            name: action.account.base.name,
            birthday: action.account.base.birthday,
            gender: action.account.base.gender,
            phone_number: action.account.base.phone_number,
            email: action.account.base.email,
          },
          address: {
            countory: action.account.address.countory,
            postal_code: action.account.address.postal_code,
            state: action.account.address.state,
            city: action.account.address.city,
            address1: action.account.address.address1,
            address2: action.account.address.address2,
          },
        };
      default:
        {
          return containerState;
        }
    }
  } catch (e) {
    return state;
  }
}
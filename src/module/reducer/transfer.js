import _ from "lodash";
import {
  PUT_TRANSFER_INFORMATION
} from "../action/transfer";

const defaultState = [{
  id: null,
  bank: null,
  branch: null,
  account_number: null,
  account_holder: null,
}];

export default function transfer(state = defaultState, action) {
  const containerState = _.cloneDeep(state);
  try {
    switch (action.type) {
      case PUT_TRANSFER_INFORMATION:
        let transferBank = containerState.filter((transfer) => {
          return transfer.id === action.data.id
        });
        if (transferBank.length) {
          transferBank = transferBank.shift();
        } else {
          return containerState;
        };

        transferBank = {
          ...transferBank,
          bank: action.data.bank,
          branch: action.data.branch,
          account_number: action.data.account_number,
          account_holder: action.data.account_holder,
        }

        return {
          ...containerState,
          transferBank
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
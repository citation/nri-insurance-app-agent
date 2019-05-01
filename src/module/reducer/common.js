import _ from "lodash";
import {
  SET_CURRENT_PAGE,
  ENQUEUE_INFORMATION,
  REMOVE_INFORMATION,
  ENQUEUE_BREADCRUMB,
  REMOVE_BREADCRUMB,
  REPLACE_BREADCRUMB,
  TOGGLE_LOADER,
} from "../action/common";

const defaultState = {
  current_page: "TOP",
  notifications: [],
  breadcrumb: [],
  loader: false,
};

export default function common(state = defaultState, action) {
  const containerState = _.cloneDeep(state);
  try {
    switch (action.type) {
      case SET_CURRENT_PAGE:
        return {
          ...containerState,
          current_page: action.page,
        };
      // case ENQUEUE_INFORMATION:
      //   return {
      //     ...containerState,
      //     notifications: [
      //       ...containerState.notifications,
      //       {
      //         ...action.notification,
      //       },
      //     ],
      //   };
      // case REMOVE_INFORMATION:
      //   return {
      //     ...containerState,
      //     notifications: containerState.notifications.filter(
      //       notification => notification.key !== action.key,
      //     ),
      //   };

      case ENQUEUE_INFORMATION:
      return {
          ...state,
          notifications: [
              ...state.notifications,
              {
                  ...action.notification,
              },
          ],
      };

      case REMOVE_INFORMATION:
          return {
              ...state,
              notifications: state.notifications.filter(
                  notification => notification.key !== action.key,
              ),
          };

      case REPLACE_BREADCRUMB:
        return {
          ...containerState,
          breadcrumb: action.breadcrumbs,
        };
      case ENQUEUE_BREADCRUMB:
        containerState.breadcrumb.map((breadcrumb) => {
          breadcrumb.color = "inherit";
        });
        action.breadcrumb.color = "inherit";
        containerState.breadcrumb.push(action.breadcrumb);
        return {
          ...containerState,
          breadcrumb: containerState.breadcrumb,
        };
      case REMOVE_BREADCRUMB:
        containerState.breadcrumb.map((breadcrumb) => {
          breadcrumb.color = "inherit";
        });
        containerState.breadcrumb.splice(containerState.breadcrumb.length - 1, action.count);
        containerState.breadcrumb[containerState.breadcrumb.length - 1].color = "inherit";
        return {
          ...containerState,
          breadcrumb: containerState.breadcrumb,
        };
      case TOGGLE_LOADER:
        return {
          ...containerState,
          loader: containerState.loader ? false : true,
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
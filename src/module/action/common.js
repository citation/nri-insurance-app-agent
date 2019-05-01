export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const ENQUEUE_INFORMATION = "ENQUEUE_INFORMATION";
export const REMOVE_INFORMATION = "REMOVE_INFORMATION";
export const ENQUEUE_BREADCRUMB = "ENQUEUE_BREADCRUMB";
export const REMOVE_BREADCRUMB = "REMOVE_BREADCRUMB";
export const REPLACE_BREADCRUMB = "REPLACE_BREADCRUMB";
export const TOGGLE_LOADER = "TOGGLE_LOADER";

export const setCurrentPage = page => ({
  type: SET_CURRENT_PAGE,
  page,
});

// export const enqueueInformation = notification => ({
//   type: ENQUEUE_INFORMATION,
//   notification: {
//     key: new Date().getTime() + Math.random(),
//     ...notification,
//   },
// });

// export const removeInformation = key => ({
//   type: REMOVE_INFORMATION,
//   key,
// });

export const enqueueBreadCrumb = breadcrumb => ({
  type: ENQUEUE_BREADCRUMB,
  breadcrumb: breadcrumb,
});

export const removeBreadCrumb = (count) => ({
  type: REMOVE_BREADCRUMB,
  count: count
});

export const replaceBreadCrumb = breadcrumbs => ({
  type: REPLACE_BREADCRUMB,
  breadcrumbs: breadcrumbs,
});

export const toggleLoader = () => ({
  type: TOGGLE_LOADER,
});


export const enqueueInformation = notification => ({
  type: ENQUEUE_INFORMATION,
  notification: {
      key: new Date().getTime() + Math.random(),
      ...notification,
  },
});

export const removeInformation = key => ({
  type: REMOVE_INFORMATION,
  key,
});

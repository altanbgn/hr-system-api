export const USER_STATUS = {
  ACTIVE: 'active',
  UNVERIFIED: 'unverified',
  DISABLED: 'disabled',
  ALL: ['active', 'unverified', 'disabled']
};

export const DEPARTMENT_STATUS = {
  ACTIVE: 'active',
  ARCHIVED: 'archived',
  DISABLED: 'disabled',
  ALL: ['active', 'archived', 'disabled']
};

export const TASK_TYPES = {
  TODO: "todo",
  INPROGRESS: "inprogress",
  INREVIEW: "inreview",
  COMPLETE: "complete",
  ALL: ["todo", "inprogress", "inreview", "complete"]
}

export const METHODS = {
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  ALL: ['post', 'put', 'delete']
}
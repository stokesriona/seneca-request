type Context = {
  outent?: any
  inent?: any
  query?: any
  request?: any
  response?: any
}

type Target = keyof Context

type Set = {
  [source in keyof Context]?: string
}

type Task = {
  on: Target
  field: string
  set?: Set
}

type TasksTypesFn = {
  set: (task: Task, context: Context) => void
}

type ActionType = "load" | "save"

type ActionDetails = {
  cb_name: string
  body_args?: string[]
  before?: Task[]
  after?: Task[]
}

type ActionData = {
  sdk_params: SdkParams
  action_details: ActionDetails
  pattern: Record<string, any>
}

type Entity = { [key: string]: any }

type EntityMap = {
  [name: string] : {
    name?: string
    fields: { [entity: string]: Record<string, Record<string, any>> }
    sdk: SdkParams
    actions: EntityAction
  }
}

type EntityAction = {
  "load": ActionDetails
} | {
  "save": ActionDetails
}

type SdkParams = {
  rest: {
    subpath: GithubRestEndpoints
  }
}

type GithubRestEndpoints =
  | "repos"
  | "checks"
  | "codesOfConduct"
  | "codeScanning"
  | "git"
  | "gists"
  | "issues"
  | "licenses"
  | "orgs"
  | "projects"
  | "pulls"
  | "secretScanning"
  | "teams"
  | "users"

export type { ActionType, ActionDetails, EntityMap, Entity, ActionData, SdkParams, Task, Context, TasksTypesFn }

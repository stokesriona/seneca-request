import { Entity, ActionDetails, SdkParams } from "./types"
import { perform_tasks } from "./utils"

function make_actions(sdk_params: SdkParams, action_details: ActionDetails, sdk: Record<string, any>) {
  const { subpath } = sdk_params.rest
  const { before, after, cb_name } = action_details

  async function load(this:any, msg: any) {    
    let body = basic_body({...msg.q})
    
    const endpoint_methods: Record<string, any> = sdk.octokit.rest[subpath]

    const context = {
      inent: msg.ent,
      request: body,
      query: msg.q,
    }
    
    if(before) {
      perform_tasks(before, context)
    }

    const res = await endpoint_methods[cb_name](body)
    
    let entity: Entity = this.make$(msg.ent.entity$).data$(res.data)

    if(after) {
      perform_tasks(after, {
        ...context,
        outent: entity,
        response: res.data
      })
    }

    return entity
  }

  async function save(this:any, msg: any) {
    const entity = msg.ent

    let body = basic_body({repo_id: entity.repo_id})

    if(action_details.body_args) {
      action_details.body_args.forEach(attr => {
        body[attr] = entity[attr] 
      })
    }

    const endpoint_methods: Record<string, any> = sdk.octokit.rest[subpath]

    const context = {
      inent: msg.ent,
      request: body,
      query: msg.q,
    }
    
    if(before) {
      perform_tasks(before, context)
    }

    const res = await endpoint_methods[cb_name](body)

    let new_entity: Entity = this.make$(entity.entity$).data$(res.data)

    if(after) {
      perform_tasks(after, {
        ...context,
        outent: new_entity,
        response: res.data
      })
    }

    return new_entity
  }

  function basic_body(source: Record<string, any>) {
    let body: Record<string,any> = {}

    if(source.repo_id) {
      body = owner_repo(source.repo_id)
    }

    delete source.repo_id

    return {...body, ...source}
  }

  function owner_repo(repo_id: string): Record<string, string> {
    const [owner, repo] = repo_id.split('/')
    return {
      owner,
      repo,
    }
  }

  return {
    load,
    save
  }
}

export { make_actions }
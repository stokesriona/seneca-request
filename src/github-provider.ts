/* Copyright © 2021 Seneca Project Contributors, MIT License. */


// TODO: namespace provider zone; needs seneca-entity feature

import { Octokit } from '@octokit/rest'
import { make_actions } from './cmd-handlers'
import { ents } from './entities'
import { ActionData, EntityMap } from './types'

type GithubProviderOptions = {}


/* Repo ids are of the form 'owner/name'. The internal github id field is
 * moved to github_id.
 *
 *
 */


function GithubProvider(this: any, _options: any) {
  const seneca: any = this

  let sdk: Record<string, any> = { octokit: undefined }

  // NOTE: sys- zone prefix is reserved.

  add_actions()
  seneca
    .message('sys:provider,provider:github,get:info', get_info)

  function add_actions() {
    const actions = prepare_actions(ents)

    for (const action of actions) {
      switch (action.pattern.cmd) {
        case 'load':
          seneca.message(action.pattern, make_load(action))
          break
      
        case 'save':
          seneca.message(action.pattern, make_save(action))
          break
      }
    }
  }

  function make_load(action: ActionData) {
    return make_actions(
      action.sdk_params,
      action.action_details,
      sdk
    )['load']
  }

  function make_save(action: ActionData) {
    return make_actions(
      action.sdk_params,
      action.action_details,
      sdk
    )['save']
  }

  function prepare_actions(entities: EntityMap): Array<ActionData> {
    const actions_data = []

    for (const [ent_name, data] of Object.entries(entities)) {
      const { actions } = data
      data.name = ent_name

      for (const [action_name, action_details] of Object.entries(actions)) {
        const pattern = {
          name: ent_name,
          cmd: action_name,
          zone: 'provider',
          base: 'github',
          role: 'entity',
        }

        actions_data.push({
          pattern,
          sdk_params: data.sdk,
          action_details,
        })
      }
    }

    return actions_data
  }

  async function get_info(this: any, _msg: any) {
    return {
      ok: true,
      name: 'github',
      details: {
        sdk: '@octokit/rest'
      }
    }
  }

  seneca.prepare(async function(this: any) {
    let out = await this.post('sys:provider,get:key,provider:github,key:api')
    if (!out.ok) {
      this.fail('api-key-missing')
    }

    let config = {
      auth: out.value
    }

    sdk.octokit = new Octokit(config)
  })


  return {
    exports: {
      native: () => ({
        octokit: sdk.octokit
      })
    }
  }
}


// Default options.
const defaults: GithubProviderOptions = {

  // TODO: Enable debug logging
  debug: false
}


Object.assign(GithubProvider, { defaults })

export default GithubProvider

if ('undefined' !== typeof (module)) {
  module.exports = GithubProvider
}

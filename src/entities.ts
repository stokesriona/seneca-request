import { EntityMap } from './types'
import fields from './fields'

const ents: EntityMap = {
  repo: {
    fields: fields.repo,
    sdk: {
      rest: {
        subpath: 'repos',
      }
    },
    actions: {
      load : {
        cb_name:'get',
        after: [
          { on: 'outent', field: 'id', set: { query: 'repo_id' } },
          { on: 'outent', field: 'repo_id', set: { query: 'repo_id' } },
          { on: 'outent', field: 'github_id', set: { response: 'id' } },
        ]
      },
      save: {
        cb_name:'update',
        after: [
          { on: 'outent', field: 'id', set: { inent: 'repo_id' } },
          { on: 'outent', field: 'repo_id', set: { query: 'repo_id' } },
          { on: 'outent', field: 'github_id', set: { response: 'id' } },
        ],
        body_args: ['description'],
      }
    },
  },
  code_scanning: {
    fields: fields.code_scanning,
    sdk: {
      rest: {
        subpath: 'codeScanning',
      }
    },
    actions: {
      load : {
        cb_name:'getAlert',
        after: [
          { on: 'outent', field: 'repo_id', set: { query: 'repo_id' } },
          { on: 'outent', field: 'alert_number', set: { response: 'number' } },
        ],
      },
      save: {
        cb_name:'updateAlert',
        after: [
          { on: 'outent', field: 'repo_id', set: { inent: 'repo_id' } },
          { on: 'outent', field: 'alert_number', set: { response: 'number' } },
        ],
        body_args: ['alert_number', 'state', 'dismissed_reason']
      }
    },
  },
  branch: {
    fields: fields.branch,
    sdk: {
      rest: {
        subpath: 'repos',
      }
    },
    actions: {
      load : {
        cb_name:'getBranch',
        after: [
          { on: 'outent', field: 'repo_id', set: { query: 'repo_id' } },
        ],
      }
    },
  },
  code_of_conduct: {
    fields: fields.code_of_conduct,
    sdk: {
      rest: {
        subpath: 'codesOfConduct',
      }
    },
    actions: {
      load : {
        cb_name:'getConductCode',
        after: [
          { on: 'outent', field: 'repo_id', set: { query: 'repo_id' } },
        ],
      },
    },
  },
  commit: {
    fields: fields.commit,
    sdk: {
      rest: {
        subpath: 'git',
      }
    },
    actions: {
      load : {
        cb_name:'getCommit',
        after: [
          { on: 'outent', field: 'repo_id', set: { query: 'repo_id' } },
        ],
      }
    },
  },
  gist: {
    fields: fields.gist,
    sdk: {
      rest: {
        subpath: 'gists',
      }
    },
    actions: {
      load : {
        cb_name:'get',
        after: [
          { on: 'outent', field: 'gist_id', set: { query: 'gist_id' } },
        ],
      },
      save: {
        cb_name:'update',
        after: [
          { on: 'outent', field: 'gist_id', set: { inent: 'gist_id' } },
        ],
        body_args: ['gist_id', 'description', 'files']
      }
    },
  },
  issue: {
    fields: fields.issue,
    sdk: {
      rest: {
        subpath: 'issues',
      }
    },
    actions: {
      load : {
        cb_name:'get',
        after: [
          { on: 'outent', field: 'repo_id', set: { query: 'repo_id' } },
          { on: 'outent', field: 'issue_number', set: { response: 'number' } },
        ],
      },
      save: {
        cb_name:'update',
        after: [
          { on: 'outent', field: 'repo_id', set: { inent: 'repo_id' } },
          { on: 'outent', field: 'issue_number', set: { response: 'number' } },
        ],
        body_args: [
          'issue_number',
          'title',
          'body',
          'state',
          'milestone',
          'labels',
          'assigness',
        ]
      }
    },
  },
  license: {
    fields: fields.license,
    sdk: {
      rest: {
        subpath: 'licenses',
      }
    },
    actions: {
      load : {
        cb_name:'get',
      }
    },
  },
  org: {
    fields: fields.org,
    sdk: {
      rest: {
        subpath: 'orgs',
      }
    },
    actions: {
      load : {
        cb_name:'get',
        after: [
          { on: 'outent', field: 'org', set: { query: 'org' } },
        ],
      }
    },
  },
  pull: {
    fields: fields.pull,
    sdk: {
      rest: {
        subpath: 'pulls',
      }
    },
    actions: {
      load : {
        cb_name:'get',
        after: [
          { on: 'outent', field: 'repo_id', set: { query: 'repo_id' } },
          { on: 'outent', field: 'pull_number', set: { response: 'number' } },
        ],
      },
      save: {
        cb_name:'update',
        after: [
          { on: 'outent', field: 'repo_id', set: { inent: 'repo_id' } },
          { on: 'outent', field: 'pull_number', set: { response: 'number' } },
        ],
        body_args: [
          'pull_number',
          'title',
          'body',
          'state',
          'base',
          'maintainer_can_modify',
        ],
      }
    },
  },
  release: {
    fields: fields.release,
    sdk: {
      rest: {
        subpath: 'repos',
      }
    },
    actions: {
      load : {
        cb_name:'getRelease',
        after: [
          { on: 'outent', field: 'repo_id', set: { query: 'repo_id' } },
          { on: 'outent', field: 'release_id', set: { response: 'id' } },
        ],
      },
      save: {
        cb_name:'update',
        after: [
          { on: 'outent', field: 'repo_id', set: { inent: 'repo_id' } },
          { on: 'outent', field: 'release_id', set: { response: 'id' } },
        ],
        body_args: [
          'release_id',
          'tag_name',
          'target_commitish',
          'name',
          'body',
          'draft',
          'prerelease',
          'discussion_category_name',
        ],
      }
    },
  },
  user: {
    fields: fields.user,
    sdk: {
      rest: {
        subpath: 'users',
      }
    },
    actions: {
      load : {
        cb_name:'getByUsername',
      },
    },
  },
  check: {
    fields: fields.check,
    sdk: {
      rest: {
        subpath: 'checks',
      }
    },
    actions: {
      load : {
        cb_name:'get',
        after: [
          { on: 'outent', field: 'repo_id', set: { query: 'repo_id' } },
          { on: 'outent', field: 'check_run_id', set: { response: 'id' } },
        ],
      },
      save: {
        cb_name:'update',
        after: [
          { on: 'outent', field: 'repo_id', set: { inent: 'repo_id' } },
          { on: 'outent', field: 'check_run_id', set: { response: 'id' } },
        ],
        body_args: [
          'check_run_id',
          'name',
          'head_sha',
          'details_url',
          'external_id',
          'status',
          'started_at',
          'conclusion',
          'completed_a',
          'output',
        ],
      }
    },
  },
  project: {
    fields: fields.project,
    sdk: {
      rest: {
        subpath: 'projects',
      }
    },
    actions: {
      load : {
        cb_name:'get',
        after: [
          { on: 'outent', field: 'project_id', set: { response: 'id' } },
        ],
      },
      save: {
        cb_name:'update',
        after: [
          { on: 'outent', field: 'project_id', set: { response: 'id' } },
        ],
        body_args: [
          'project_id',
          'name',
          'body',
          'state',
          'organization_permission',
          'private',
        ],
      }
    },
  },
  secret_scanning: {
    fields: fields.secret_scanning,
    sdk: {
      rest: {
        subpath: 'secretScanning',
      }
    },
    actions: {
      load : {
        cb_name:'getAlert',
        after: [
          { on: 'outent', field: 'repo_id', set: { query: 'repo_id' } },
          { on: 'outent', field: 'alert_number', set: { response: 'number' } },
        ],
      },
      save: {
        cb_name:'updateAlert',
        after: [
          { on: 'outent', field: 'repo_id', set: { inent: 'repo_id' } },
          { on: 'outent', field: 'alert_number', set: { response: 'number' } },
        ],
        body_args: [
          'alert_number',
          'state',
          'resolution'
        ],
      }
    },
  }
}

export { ents }

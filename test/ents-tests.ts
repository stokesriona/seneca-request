import crypto from "crypto"
import { TestEntityMap } from "./types"

let test_args = {
  gist_id: "some-gist-id",
  github_id: 240776234,
  repo_id: "guhmerces/hiringTest",
  code_of_conduct_key: "contributor_covenant",
  branch_id: "master",
  commit_sha: "commit-sha",
  issue_number: 1,
  license: "mit",
  org: "Organization123",
  release_id: 240776234,
  username: "senecajs",
  pull_number: 1256,
  alert_number: 1,
  secret_scanning_alert_number: 11,
  check_run_id: 1,
  project_id: 10,
}

const rand = crypto.randomBytes(10).toString("hex")

const ents_tests: TestEntityMap = {
  repo: {
    load: {
      args: {
        repo_id: test_args.repo_id,
      },
      expectations: {
        id: {
          sameAs: test_args.repo_id,
        },
        github_id: {
          sameAs: test_args.github_id
        },
      },
    },
    save: {
      changes: {
        description: rand,
      },
      expectations: {
        id: {
          sameAs: test_args.repo_id,
        },
      },
    },
  },
  code_scanning: {
    load: {
      args: {
        repo_id: test_args.repo_id,
        alert_number: test_args.alert_number,
      },
      expectations: {
        alert_number: {
          sameAs: test_args.alert_number,
        },
      },
    },
    save: {
      changes: {
        state: "dismissed",
        dismissed_reason: "used in tests",
      },
      expectations: {
        dismissed_reason: {
          sameAs: "used in tests",
        },
      },
    },
  },
  branch: {
    load: {
      args: {
        repo_id: test_args.repo_id,
        branch: test_args.branch_id,
      },
      expectations: {
        repo_id: {
          sameAs: test_args.repo_id,
        },
        name: {
          sameAs: test_args.branch_id,
        },
      },
    },
  },
  code_of_conduct: {
    load: {
      args: {
        key: test_args.code_of_conduct_key,
      },
      expectations: {
        key: {
          sameAs: test_args.code_of_conduct_key,
        },
      },
    },
  },
  commit: {
    load: {
      args: {
        repo_id: test_args.repo_id,
        commit_sha: test_args.commit_sha,
      },
      expectations: {
        repo_id: {
          sameAs: test_args.repo_id,
        },
        sha: {
          sameAs: test_args.commit_sha,
        },
      },
    },
  },
  gist: {
    load: {
      args: {
        gist_id: test_args.gist_id,
      },
      expectations: {
        gist_id: {
          sameAs: test_args.gist_id,
        },
      },
    },
    save: {
      changes: {
        description: rand,
      },
      expectations: {
        gist_id: {
          sameAs: test_args.gist_id,
        },
      },
    },
  },
  issue: {
    load: {
      args: {
        repo_id: test_args.repo_id,
        issue_number: test_args.issue_number,
      },
      expectations: {
        repo_id: {
          sameAs: test_args.repo_id,
        },
        issue_number: {
          sameAs: test_args.issue_number,
        },
      },
    },
    save: {
      changes: {
        title: rand,
      },
      expectations: {
        repo_id: {
          sameAs: test_args.repo_id,
        },
        issue_number: {
          sameAs: test_args.issue_number,
        },
      },
    },
  },
  license: {
    load: {
      args: {
        license: test_args.license,
      },
      expectations: {
        key: {
          sameAs: test_args.license,
        },
      },
    },
  },
  org: {
    load: {
      args: {
        org: test_args.org,
      },
      expectations: {
        login: {
          sameAs: test_args.org,
        },
      },
    },
  },
  pull: {
    load: {
      args: {
        repo_id: test_args.repo_id,
        pull_number: test_args.pull_number,
      },
      expectations: {
        pull_number: {
          sameAs: test_args.pull_number,
        },
      },
    },
    save: {
      changes: {
        body: rand,
      },
      expectations: {
        repo_id: {
          sameAs: test_args.repo_id,
        },
        pull_number: {
          sameAs: test_args.pull_number
        }
      },
      args: {
        base: "master",
      },
    },
  },
  release: {
    load: {
      args: {
        repo_id: test_args.repo_id,
        release_id: test_args.release_id,
      },
      expectations: {
        repo_id: {
          sameAs: test_args.repo_id,
        },
        release_id: {
          sameAs: test_args.release_id,
        },
      },
    },
    save: {
      changes: {
        name: rand,
      },
      expectations: {
        repo_id: {
          sameAs: test_args.repo_id,
        },
        release_id: {
          sameAs: test_args.release_id,
        },
      },
    },
  },
  user: {
    load: {
      args: {
        username: test_args.username,
      },
    },
  },
  check: {
    load: {
      args: {
        repo_id: test_args.repo_id,
        check_run_id: test_args.check_run_id,
      },
      expectations: {
        check_run_id: {
          sameAs: test_args.check_run_id,
        },
      },
    },
    save: {
      changes: {
        name: rand,
      },
      expectations: {
        repo_id: {
          sameAs: test_args.repo_id,
        },
        check_run_id: {
          sameAs: test_args.check_run_id,
        },
      },
    },
  },
  project: {
    load: {
      args: {
        project_id: test_args.project_id,
      },
      expectations: {
        project_id: {
          sameAs: test_args.project_id,
        },
      },
    },
    save: {
      changes: {
        name: rand,
      },
      expectations: {
        project_id: {
          sameAs: test_args.project_id,
        },
      },
    },
  },
  secret_scanning: {
    load: {
      args: {
        repo_id: test_args.repo_id,
        alert_number: test_args.secret_scanning_alert_number,
      },
      expectations: {
        alert_number: {
          sameAs: test_args.secret_scanning_alert_number,
        },
      },
    },
    save: {
      changes: {
        state: "resolved",
        resolution: "used in tests",
      },
      expectations: {
        alert_number: {
          sameAs: test_args.secret_scanning_alert_number,
        },
        state: {
          sameAs: "resolved",
        },
        resolution: {
          sameAs: "used in tests",
        },
      },
    },
  },
}

export { ents_tests }

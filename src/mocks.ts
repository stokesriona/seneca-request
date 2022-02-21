export default {
  repo: {
    patch: {
      method: "PATCH",
      url: "/repos/:owner/:repo",
      mock_data: {
        id: 240776234,
      },
    },
    get: {
      method: "GET",
      url: "/repos/:owner/:repo",
      mock_data: {
        id: 240776234,
      },
    },
  },
  code_scanning: {
    patch: {
      method: "PATCH",
      url: "/repos/:owner/:repo/code-scanning/alerts/:alert_number",
      mock_data: {
        number: 1,
        dismissed_reason: "used in tests",
      },
    },
    get: {
      method: "GET",
      url: "/repos/:owner/:repo/code-scanning/alerts/:alert_number",
      mock_data: {
        number: 1,
      },
    },
  },
  gist: {
    patch: {
      method: "PATCH",
      url: "/gists/:gist_id",
      mock_data: {
        id: "some-gist-id",
      },
    },
    get: {
      method: "GET",
      url: "/gists/:gist_id",
      mock_data: {
        id: "some-gist-id",
      },
    },
  },
  issue: {
    patch: {
      method: "PATCH",
      url: "/repos/:owner/:repo/issues/:issue_number",
      mock_data: {
        number: 1
      },
    },
    get: {
      method: "GET",
      url: "/repos/:owner/:repo/issues/:issue_number",
      mock_data: {
        number: 1,
      },
    },
  },
  pull: {
    patch: {
      method: "PATCH",
      url: "/repos/:owner/:repo/pulls/:pull_number",
      mock_data: {
        id: 819532044,
        number: 1256,
      },
    },
    get: {
      method: "GET",
      url: "/repos/:owner/:repo/pulls/:pull_number",
      mock_data: {
        id: 819532044,
        number: 1256,
      },
    },
  },
  release: {
    // For release updates, octokit makes the same request as it does when updating a repository (/repos/:owner/:repo), 
    // There is no need of mocking a release PATCH request since what will be returned is the mock data for repository PATCH request
    /*
    patch: {
      method: "PATCH",
      url: "/repos/:owner/:repo/releases/:release_id",
      mock_data: {
        id: 240776234,
        tag_name: 'tag_name',
      },
    },
    */
    get: {
      method: "GET",
      url: "/repos/:owner/:repo/releases/:release_id",
      mock_data: {
        id: 240776234,
        tag_name: 'tag_name',
      },
    },
  },
  branch: {
    get: {
      method: "GET",
      url: "/repos/:owner/:repo/branches/:branch",
      mock_data: {
        name: "master",
      },
    },
  },
  code_of_conduct: {
    get: {
      method: "GET",
      url: "/codes_of_conduct/:key",
      mock_data: {
        key: "contributor_covenant",
      },
    },
  },
  commit: {
    get: {
      method: "GET",
      url: "/repos/:owner/:repo/git/commits/:commit_sha",
      mock_data: {
        sha: "commit-sha",
      },
    },
  },
  license: {
    get: {
      method: "GET",
      url: "/licenses/:license",
      mock_data: {
        key: "mit",
      },
    },
  },
  org: {
    get: {
      method: "GET",
      url: "/orgs/:org",
      mock_data: {
        login: "Organization123",
      },
    },
  },
  user: {
    get: {
      method: "GET",
      url: "/users/:username",
      mock_data: {
        id: 45415308,
      },
    },
  },
  check: {
    get: {
      method: "GET",
      url: "/repos/:owner/:repo/check-runs/:check_run_id",
      mock_data: {
        id: 1,
      },
    },
    patch: {
      method: "PATCH",
      url: "/repos/:owner/:repo/check-runs/:check_run_id",
      mock_data: {
        id: 1,
      },
    },
  },
  project: {
    get: {
      method: "GET",
      url: "/projects/:project_id",
      mock_data: {
        id: 10,
      },
    },
    patch: {
      method: "PATCH",
      url: "/projects/:project_id",
      mock_data: {
        id: 10,
      },
    },
  },
  secret_scanning: {
    get: {
      method: "GET",
      url: "/repos/:owner/:repo/secret-scanning/alerts/:alert_number",
      mock_data: {
        number: 11,
        state: 'resolved',
        resolution: 'used in tests',
      },
    },
    patch: {
      method: "PATCH",
      url: "/repos/:owner/:repo/secret-scanning/alerts/:alert_number",
      mock_data: {
        number: 11,
        state: 'resolved',
        resolution: 'used in tests',
      },
    },
  },
}

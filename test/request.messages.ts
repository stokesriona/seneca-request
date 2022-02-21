/* Copyright © 2022 Seneca Project Contributors, MIT License. */

export default {
  print: false,
  pattern: 'sys:request',
  allow: { missing: true },

  calls: [
    {
      print: false,
      pattern: 'request:send',
      params: { url: 'http://localhost:41414/test.json' },
      out: {
        ok: true,
        status: 200,
        json: { test: true }
      },
    }
  ]
}


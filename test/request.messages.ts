/* Copyright © 2022 Seneca Project Contributors, MIT License. */

export default {
  print: false,
  pattern: 'sys:request',
  allow: { missing: false },

  calls: [
    {
      pattern: 'request:send',
      out: { ok: true },
    }
  ]
}


/* Copyright © 2022 Seneca Project Contributors, MIT License. */

import * as http from 'http'

import serve from 'serve-handler'

import request from '../src/request'

const Seneca = require('seneca')
const SenecaMsgTest = require('seneca-msg-test')
const RequestMessages = require('./request.messages').default


describe('request', () => {

  let server: any
  let port: number = 41414

  beforeAll(async () => {
    // Use when seneca-msg-test supports external param injection
    // port = 50000 + (Math.floor(Math.random() * 10000))

    server = http.createServer((request: any, response: any) => {
      // See: https://github.com/vercel/serve-handler#options
      return serve(request, response, { public: __dirname + '/serve' })
    })
    await new Promise((r, j) =>
      server.listen(port, (err: any) => err ? j(err) : r()))
  })

  afterAll(async () => {
    server.close()
  })


  test('happy', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use(request)
    await seneca.ready()
  })


  test('messages', async () => {
    const seneca = Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use(request)
    await (SenecaMsgTest(seneca, RequestMessages)())
  })
})

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


  test('later', (fin) => {
    Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use(request)
      .sub('sys:request,response:handle', function(out: any) {
        expect(out).toMatchObject({
          url: 'http://localhost:41414/test.json',
          id: 't01',
          ctx: { foo: 1 },
          sys: 'request',
          request: null,
          mode: 'later',
          ok: true,
          status: 200,
          json: { test: true },
        })

        fin()
      })
      .act('sys:request,request:send,mode:later', {
        url: 'http://localhost:41414/test.json',
        id: 't01',
        ctx: { foo: 1 }
      })
  })

})

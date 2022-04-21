/* Copyright © 2022 Seneca Project Contributors, MIT License. */

import * as http from 'http'

import serve from 'serve-handler'

import request from '../src/request'
import requestDoc from '../src/request-doc'

import { Maintain } from '@seneca/maintain'

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
      server.listen(port, (err: any) => err ? j(err) : r(null)))
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
    expect(requestDoc).toBeDefined()
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


  test('spread', (fin) => {
    let items = [
      {
        url: 'http://localhost:41414/test.json?01',
      },
      {
        url: 'http://localhost:41414/test.json?02',
      },
      {
        url: 'http://localhost:41414/test.json?03',
      },
      {
        url: 'http://localhost:41414/test.json?04',
      },
    ]
    let time = {
      max: 1111,
      tolerance: 0.1,
      avgdur: 200,
    }

    let res = {}
    Seneca({ legacy: false })
      .test()
      .use('promisify')
      .use(request)
      .sub('sys:request,response:handle', function(out: any) {
        res[out.spread.item] = out
        if (items.length === Object.keys(res).length) {

          expect(res).toMatchObject({
            '0': {
              url: 'http://localhost:41414/test.json?01',
              spread: { sid: 's01', item: 0 },
              sys: 'request',
              request: null,
              mode: 'later',
              ok: true,
              status: 200,
              json: { test: true },
              response: 'handle',
            },
            '1': {
              url: 'http://localhost:41414/test.json?02',
              spread: { sid: 's01', item: 1 },
              sys: 'request',
              request: null,
              mode: 'later',
              ok: true,
              status: 200,
              json: { test: true },
              response: 'handle',
            },
            '2': {
              url: 'http://localhost:41414/test.json?03',
              spread: { sid: 's01', item: 2 },
              sys: 'request',
              request: null,
              mode: 'later',
              ok: true,
              status: 200,
              json: { test: true },
              response: 'handle',
            },
            '3': {
              url: 'http://localhost:41414/test.json?04',
              spread: { sid: 's01', item: 3 },
              sys: 'request',
              request: null,
              mode: 'later',
              ok: true,
              status: 200,
              json: { test: true },
              response: 'handle',
            }
          })

          // Expect the gap between start values to approx equal the
          // expected average request duration.
          let st = Object.values(res).map((r: any) => r.start)
          let actdur = (time.avgdur + st[st.length - 1] - st[0]) / items.length
          expect(Math.abs(actdur - time.avgdur) < 22).toBeTruthy()

          fin()
        }
      })
      .act('sys:request,request:spread,mode:later', {
        sid: 's01',
        time,
        items,
      })
  })

  test('maintain', Maintain)

})

/* Copyright © 2022 Seneca Project Contributors, MIT License. */


import request from '../src/request'

const Seneca = require('seneca')
const SenecaMsgTest = require('seneca-msg-test')
const RequestMessages = require('./request.messages').default


describe('request', () => {

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

/* Copyright © 2022 Seneca Project Contributors, MIT License. */


const Fetch = require('node-fetch')


type RequestOptions = {}


function request(this: any, options: RequestOptions) {
  const seneca: any = this

  seneca
    .message('sys:request,request:send', request_send)
    .message('sys:request,response:handle', response_handle)


  async function request_send(this: any, msg: any) {
    const seneca = this

    msg.id = msg.id || this.util.Nid()
    msg.mode = msg.mode || 'now'

    if ('now' === msg.mode) {
      return await exec_request(msg)
    }
    else if ('later' === msg.mode) {
      exec_request(msg)
        .then((res: any) => {
          seneca.act({
            ...msg, ok: true, ...res, request: null, response: 'handle'
          })
        })
        .catch((err: any) => {
          seneca.act('sys:request,response:handle', {
            ...msg, ok: false, err, request: null, response: 'handle'
          })
        })
      return { ...msg, ok: true, id: msg.id }
    }
  }


  async function exec_request(msg: any) {
    let url = msg.url

    let response = await Fetch(url)
    let ok = response.ok
    let status = response.status
    let json = null

    if (response.ok) {
      json = await response.json()
    }

    return { ...msg, ok, status, json }
  }


  async function response_handle(this: any, _msg: any) {
    // Does nothing, use seneca.sub('sys:request,response:handle')
  }

}


// Default options.
const defaults: RequestOptions = {

  // TODO: Enable debug logging
  debug: false
}


Object.assign(request, { defaults })

export default request

if ('undefined' !== typeof (module)) {
  module.exports = request
}

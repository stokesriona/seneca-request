/* Copyright © 2022 Seneca Project Contributors, MIT License. */


const Fetch = require('node-fetch')


type RequestOptions = {}


function request(this: any, options: RequestOptions) {
  const seneca: any = this

  seneca
    .message('sys:request,request:send', request_send)
    .message('sys:request,response:handle', response_handle)


  async function request_send(this: any, msg: any) {
    let id = msg.id || this.util.Nid()
    let url = msg.url
    let mode = msg.mode || 'now'

    if ('now' === mode) {
      let response = await Fetch(url)
      let ok = response.ok
      let status = response.status
      let json = null

      if (response.ok) {
        json = await response.json()
      }

      return { ok, id, status, json }
    }
    else {
      return { ok: true, id }
    }
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

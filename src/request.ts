/* Copyright © 2022 Seneca Project Contributors, MIT License. */



type RequestOptions = {}


function request(this: any, options: RequestOptions) {
  const seneca: any = this

  seneca
    .message('sys:request,request:send', request_send)


  async function request_send(msg: any) {
    return { ok: true }
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

/* Copyright © 2022 Seneca Project Contributors, MIT License. */


const Fetch = require('node-fetch')



type RequestOptions = {
  debug: boolean
}


function request(this: any, options: RequestOptions) {
  const seneca: any = this

  seneca
    .message('sys:request,request:send', request_send)
    .message('sys:request,request:spread', request_spread)
    .message('sys:request,response:handle', response_handle)


  async function request_send(this: any, msg: any) {
    const seneca = this

    msg.id = msg.id || this.util.Nid()
    msg.mode = msg.mode || 'now'
    msg.start = Date.now()

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
          msg.end = Date.now()
          seneca.act('sys:request,response:handle', {
            ...msg, ok: false, err, request: null, response: 'handle'
          })
        })
      return { ...msg, ok: true, id: msg.id }
    }
  }


  async function request_spread(this: any, msg: any) {
    const seneca = this

    let sid = msg.sid || this.util.Nid()
    let items = msg.items
    let time = msg.time
    let headers = msg.headers || {}

    if (0 === items.length) {
      return { sid, time, numitems: items.length }
    }


    let max = time.max
    let avgdur = time.avgdur
    let tolerance = time.tolerance

    // parts of interval == [--sending--][--receiving--][--tolerance--]
    // avgdur == length of [--receiving--]
    // gap = delay between request items
    // NOTE: 1+items.length as 
    let interval = max * (1 - tolerance)
    let gap = (interval - avgdur) / items.length

    let start = Date.now()
    let itemI = -1
    let iid = setInterval(() => {
      itemI++
      if (items.length <= itemI) {
        clearInterval(iid)
      }
      else {
        let item = items[itemI]
        seneca.act({
          kind: msg.kind,
          headers,
          ...item,
          spread: { sid, item: itemI, start },
          sys: 'request',
          request: 'send',
          mode: 'later',
        })
      }
    }, gap)

    return { sid, time, numitems: items.length, interval, gap }
  }


  async function exec_request(msg: any) {
    let url = msg.url
    let kind = msg.kind || 'json'
    let headers = msg.headers || {}

    let err = undefined
    let ok = false
    let status = -1
    let json = null
    let text = null

    try {

      let response = await Fetch(url, { headers })
      ok = response.ok
      status = response.status

      if (response.ok) {
        if ('json' === kind) {
          json = await response.json()
        }
        else {
          text = await response.text()
        }
      }
      else {
        text = await response.text()
      }

    } catch (ex) {
      err = ex
    }

    return { ...msg, ok, status, err, json, text, end: Date.now() }
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

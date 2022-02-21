"use strict";
/* Copyright © 2022 Seneca Project Contributors, MIT License. */
Object.defineProperty(exports, "__esModule", { value: true });
const Fetch = require('node-fetch');
function request(options) {
    const seneca = this;
    seneca
        .message('sys:request,request:send', request_send)
        .message('sys:request,request:spread', request_spread)
        .message('sys:request,response:handle', response_handle);
    async function request_send(msg) {
        const seneca = this;
        msg.id = msg.id || this.util.Nid();
        msg.mode = msg.mode || 'now';
        msg.start = Date.now();
        // console.log('SEND', msg)
        if ('now' === msg.mode) {
            return await exec_request(msg);
        }
        else if ('later' === msg.mode) {
            exec_request(msg)
                .then((res) => {
                seneca.act({
                    ...msg, ok: true, ...res, request: null, response: 'handle'
                });
            })
                .catch((err) => {
                msg.end = Date.now();
                seneca.act('sys:request,response:handle', {
                    ...msg, ok: false, err, request: null, response: 'handle'
                });
            });
            return { ...msg, ok: true, id: msg.id };
        }
    }
    async function request_spread(msg) {
        const seneca = this;
        let sid = msg.sid || this.util.Nid();
        let items = msg.items;
        let time = msg.time;
        let max = time.max;
        let avgdur = time.avgdur;
        let tolerance = time.tolerance;
        // parts of interval == [--sending--][--receiving--][--tolerance--]
        // avgdur == length of [--receiving--]
        // gap = delay between request items
        // NOTE: 1+items.length as 
        let interval = max * (1 - tolerance);
        let gap = (interval - avgdur) / items.length;
        // console.log('TIME', interval, 'G', gap, 'T', time)
        let start = Date.now();
        let itemI = -1;
        let iid = setInterval(() => {
            itemI++;
            if (items.length <= itemI) {
                clearInterval(iid);
            }
            else {
                let item = items[itemI];
                // console.log('ITEM', itemI, 'L', items.length, 'D', Date.now() - start, item)
                seneca.act({
                    ...item,
                    spread: { sid, item: itemI },
                    sys: 'request',
                    request: 'send',
                    mode: 'later'
                });
            }
        }, gap);
        return { sid, time, numitems: items.length, interval, gap };
    }
    async function exec_request(msg) {
        let url = msg.url;
        let response = await Fetch(url);
        let ok = response.ok;
        let status = response.status;
        let json = null;
        if (response.ok) {
            json = await response.json();
        }
        return { ...msg, ok, status, json, end: Date.now() };
    }
    async function response_handle(_msg) {
        // Does nothing, use seneca.sub('sys:request,response:handle')
    }
}
// Default options.
const defaults = {
    // TODO: Enable debug logging
    debug: false
};
Object.assign(request, { defaults });
exports.default = request;
if ('undefined' !== typeof (module)) {
    module.exports = request;
}
//# sourceMappingURL=request.js.map
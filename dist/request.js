"use strict";
/* Copyright © 2022 Seneca Project Contributors, MIT License. */
Object.defineProperty(exports, "__esModule", { value: true });
const Fetch = require('node-fetch');
function request(options) {
    const seneca = this;
    seneca
        .message('sys:request,request:send', request_send)
        .message('sys:request,response:handle', response_handle);
    async function request_send(msg) {
        const seneca = this;
        msg.id = msg.id || this.util.Nid();
        msg.mode = msg.mode || 'now';
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
                seneca.act('sys:request,response:handle', {
                    ...msg, ok: false, err, request: null, response: 'handle'
                });
            });
            return { ...msg, ok: true, id: msg.id };
        }
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
        return { ...msg, ok, status, json };
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
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
        let id = msg.id || this.util.Nid();
        let url = msg.url;
        let mode = msg.mode || 'now';
        if ('now' === mode) {
            let response = await Fetch(url);
            let ok = response.ok;
            let status = response.status;
            let json = null;
            if (response.ok) {
                json = await response.json();
            }
            return { ok, id, status, json };
        }
        else {
            return { ok: true, id };
        }
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
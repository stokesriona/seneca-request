![@seneca/request](http://senecajs.org/files/assets/seneca-logo.png)

> _@seneca/request_ is a plugin for [Seneca](http://senecajs.org)

Provides access to the Github API using the Seneca _provider_
convention. Github API entities are represented as Seneca entities so
that they can be accessed using the Seneca entity API and messages.

[![npm version](https://img.shields.io/npm/v/@seneca/request.svg)](https://npmjs.com/package/@seneca/request)
[![build](https://github.com/senecajs/seneca-request/actions/workflows/build.yml/badge.svg)](https://github.com/senecajs/seneca-request/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/senecajs/request/badge.svg?branch=main)](https://coveralls.io/github/senecajs/request?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/senecajs/seneca-request/badge.svg)](https://snyk.io/test/github/senecajs/seneca-request)
[![DeepScan grade](https://deepscan.io/api/teams/5016/projects/20269/branches/548519/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5016&pid=20269&bid=548519)
[![Maintainability](https://api.codeclimate.com/v1/badges/a959a0996a357735c1d1/maintainability)](https://codeclimate.com/github/senecajs/request/maintainability)

# @seneca/request

| ![Voxgig](https://www.voxgig.com/res/img/vgt01r.png) | This open source module is sponsored and supported by [Voxgig](https://www.voxgig.com). |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------- |

## Install

```sh
$ npm install @seneca/request
```

## Quick Example

```js

```

## More Examples

<!--START:options-->

### Options

- `debug` : boolean <i><small>false</small></i>

Set plugin options when loading with:

```js


seneca.use('request', { name: value, ... })


```

<small>Note: <code>foo.bar</code> in the list above means
<code>{ foo: { bar: ... } }</code></small>

<!--END:options-->

<!--START:action-list-->

### Action Patterns

- [sys:request,request:send](#-sysrequestrequestsend-)
- [sys:request,request:spread](#-sysrequestrequestspread-)
- [sys:request,response:handle](#-sysrequestresponsehandle-)

<!--END:action-list-->

<!--START:action-desc-->

### Action Descriptions

#### &laquo; `sys:request,request:send` &raquo;

Send a web request.

---

#### &laquo; `sys:request,request:spread` &raquo;

No description provided.

---

#### &laquo; `sys:request,response:handle` &raquo;

No description provided.

---

<!--END:action-desc-->

## Motivation

## Support

## API

## Contributing

## Background


const http = require('http')
const serve = require('serve-handler')

const request = require('../dist/request')

const Seneca = require('seneca')


let port = 41414

let server = http.createServer((request, response) => {
  return serve(request, response, { public: __dirname + '/serve' })
})

server.listen(port, function(err) {
  console.log('SERVER', err)

  const seneca = Seneca({ legacy: false })
        .test()
        .use('promisify')
        .use(request)

  seneca.ready(function() {

    let start = Date.now()
    seneca.sub('sys:request,response:handle', function(out) {
      console.log('RES', Date.now() - start, out)
    })

    seneca.act('sys:request,request:spread', {
      sid:'s01',
      time: {
        max: 11111,
        tolerance: 0.1,
        avgdur: 2000,
      },
      items: [
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
    }, function(err, spread) {
      console.log('SPREAD', err, spread)

      setTimeout(()=>{
        server.close()
      }, 12222)
    })
  })
})

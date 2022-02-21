import { rest } from "msw"
import { setupServer } from "msw/node"

/**
 * Set mock at transport layer level
 * @param ent_mocks
 * @returns
 */
function set_mock_worker(ents_mocks: any) {
  const rest_handlers_arr = []

  Object.keys(ents_mocks).forEach((ent_name) => {
    const mock_data_http_methods_details = ents_mocks[ent_name]

    Object.keys(mock_data_http_methods_details).forEach((http_method) => {
      const mock_data = mock_data_http_methods_details[http_method]

      rest_handlers_arr.push(rest_handler(rest[http_method], mock_data))
    })
  })

  const worker = setupServer(...rest_handlers_arr)

  return worker
}

function rest_handler(cb: CallableFunction, mock: any) {
  return cb("https://api.github.com" + mock.url, (req, res, ctx) => {
    return res(ctx.json(mock.mock_data))
  })
}

export { set_mock_worker }

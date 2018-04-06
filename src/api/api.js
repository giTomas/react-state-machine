// https://css-tricks.com/importance-javascript-abstractions-working-remote-data/
// https://css-tricks.com/adapting-javascript-abstractions-time/


class API {
  constructor(url='') {
    this.url = url
  }

  _handleError(_res) {

  }

  _handleContentType(_response) {

  }

  get(_endpoint) {
    return async () => {
      try {
        const resp = await fetch(this.url + _endpoint)
        const data = await resp.json()

        if (!resp.ok) {
          throw Error(resp.statusText)
        }

        return data
      }
      catch (error) {
        return error.message
      }

    }
  }

  post(_endpoint, _body) {

  }
}

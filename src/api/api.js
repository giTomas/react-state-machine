// https://css-tricks.com/importance-javascript-abstractions-working-remote-data/
// https://css-tricks.com/adapting-javascript-abstractions-time/
// https://developer.mozilla.org/en-US/docs/Web/API/Response/status

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
        const resp = await fetch(this.url+_endpoint, {
          method: 'GET',
          headers: new Headers({
            'Accept': 'application/json'
          })
        })

        // handle error
        if (!resp.ok) {
          // throw Error(resp.statusText)
          return {status: 'Error', statusCode: resp.status, statusText: resp.statusText}
        }

        // handle content type
        const contentType = resp.headers.get('content-type');
        if (contentType.includes('application/json')) {
          return {status: 'Error', statusText: 'Not json!'}
        }

        const data = await resp.json()

        return data

      }
      catch (error) {
        return error.message
      }

    }
  }

  post(_endpoint, _body) {
    return async () => {
      try {
        const resp = await fetch(this.url+_endpoint, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: _body
        })


        // handle error
        if (!resp.ok) {
          // throw Error(resp.statusText)
          return {status: 'Error', statusCode: resp.status, statusText: resp.statusText}
        }

        // handle content type
        const contentType = resp.headers.get('content-type');

        if (contentType.includes('application/json')) {
          return {status: 'Error', statusText: 'Not json!'}
        }

        // validUrl

        const location = resp.url

        return location

      } catch (error) {
        return error.message
      }
    }
}}

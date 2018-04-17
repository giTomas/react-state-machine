// https://css-tricks.com/importance-javascript-abstractions-working-remote-data/
// https://css-tricks.com/adapting-javascript-abstractions-time/
// https://developer.mozilla.org/en-US/docs/Web/API/Response/status
// error handling
// https://dzone.com/articles/easier-error-handling-using-asyncawait

class API {
  constructor(url, mime='application/json') {
    this._URL = url
    this._MIME = mime
  }

  get(_endpoint, _mime=this._MIME) {
    return async () => {
      try {
        const resp = await fetch(this._URL+_endpoint, {
          method: 'GET',
          headers: new Headers({
            'Accept': _mime
          })
        })
        if (!resp.ok) {
          return { ok: false, error: `${resp.status}: ${resp.statusText}`}
        }
        const contentType = resp.headers.get('content-type');
        if (contentType.includes(_mime)) {
          return {ok : false, error: `Not ${_mime} MIME type` }
        }
        const data = await resp.json()
        return {ok: true, data}
      }
      catch (error) {
         return {ok: false, error}
      }
    }
  }

  post(_endpoint, _body, _mime=this._MIME) {
    return async () => {
      try {
        const resp = await fetch(this._URL+_endpoint, {
          method: 'POST',
          headers: {'Content-Type': _mime},
          body: _body
        })
        if (!resp.ok) {
          return { ok: false, error: `${resp.status}: ${resp.statusText}`}
        }
        const contentType = resp.headers.get('content-type');
        if (contentType.includes(_mime)) {
          return {ok : false, error: `Not ${_mime} MIME type` }
        }
        // location? really url?
        const location = resp.url
        return {ok: true,  location}
        }
        catch (error) {
           return {ok: false, error}
        }
    }
}}

export default API;

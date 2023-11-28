


const config = {
    baseUrl: 'http://localhost:3020',
    headers: {
      'content-type': 'application/json',
    }
  };
  
  const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject('Error');
  };
  
  class Api {
    // {baseUrl, headers}
    constructor(data) {
      this._baseUrl = data.baseUrl;
      this._headers = data.headers;
      this._freshHeaders = data.freshHeaders;
    }
    getTrackList() {
      return fetch('localhost:3020/music', {
        headers: this._headers,
      }).then((res) => onResponse(res));
    }

  }
  export const api = new Api(config);
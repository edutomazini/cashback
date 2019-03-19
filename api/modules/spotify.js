var querystring = require('querystring')
var request = require('request-promise') // "Request" library

const myPromise = (Options) => {
  return new Promise((resolve, reject) => {
    request.get(Options, () => {
    }).then(response => {
      resolve(response)
    }).catch(function (err) {
      console.log('erro ' + err.message)
      const error = { status: 'erro', error: err.message }
      reject(error)
    })
  })
}

const search = async (genre, offset, authorization) => {
  var Options = {
    url: 'https://api.spotify.com/v1/search?' +
      querystring.stringify({
        q: 'genre:' + genre,
        limit: 50,
        offset: offset,
        type: 'track'
      }),
    headers: {
      'Authorization': authorization
    },
    json: true
  }

  return myPromise(Options)
}

const genres = async (authorization) => {
  var Options = {
    url: 'https://api.spotify.com/v1/recommendations/available-genre-seeds',
    headers: {
      'Authorization': authorization
    },
    json: true
  }

  return myPromise(Options)
}

const usuario = async (authorization) => {
  var Options = {
    url: 'https://api.spotify.com/v1/me',
    headers: { 'Authorization': authorization },
    json: true
  }

  return myPromise(Options)
}

module.exports = { search, genres, usuario }

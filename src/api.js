const fetch = require('node-fetch');

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const checkResponse = response => {
  if (response.status !== 200) {
    console.error(response.url);
    throw new Error(response.statusText || 'Unkown error');
  }

  return response;
};

const post = (url, data) => {
  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  })
    .then(checkResponse)
    .then(response => response.json());
};

const get = url =>
  fetch(url, {
    headers
  })
    .then(checkResponse)
    .then(response => response.json());

export default {
  post,
  get
};

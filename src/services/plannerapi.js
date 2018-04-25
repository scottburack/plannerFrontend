export function login(params) {
  return fetch('http://localhost:3000/signin', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(resp => resp.json())

}

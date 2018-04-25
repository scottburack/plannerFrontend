export function signup(params) {
  return fetch('http://localhost:3000/api/v1/signup', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(resp => resp.json())

}

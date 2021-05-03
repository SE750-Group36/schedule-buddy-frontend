const URL = 'http://localhost:3001';
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json;charset=UTF-8'
}
const OPTIONS = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  }
};

export async function Post(resource : string, user : string, body: any) {
  var response = await fetch(URL + resource, {...OPTIONS, method: 'POST', body, headers: {...headers, user}});
  var body = await response.json();

  return body;
}

export async function Get(resource : string, user : string) {
  var response = await fetch(URL + resource, {...OPTIONS, method: 'GET', headers: {...headers, user}});
  var body = await response.json();

  return body;
}
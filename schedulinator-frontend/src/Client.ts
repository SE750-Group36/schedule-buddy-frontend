const URL = 'http://localhost:3001';
const OPTIONS = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  }
};

export async function Post(resource : string, body: any) {
  var response = await fetch(URL + resource, {...OPTIONS, method: 'POST', body: body});
  var body = await response.json();

  return body;
}

export async function Get(resource : string) {
  var response = await fetch(URL + resource, {...OPTIONS, method: 'GET'});
  var body = await response.json();

  return body;
}
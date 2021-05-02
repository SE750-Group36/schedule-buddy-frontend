const URL = 'http://localhost:23';
const OPTIONS = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  }
};

export async function Post(resource : string, body: any) {
  var response = await fetch(URL + resource, {...OPTIONS, body: body});
  body = await response.json();

  return body;
}
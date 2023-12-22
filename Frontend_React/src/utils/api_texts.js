const onResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject('Error');
};

export const getTextsList = () => {
  return fetch('http://localhost:3020/texts', {
    headers: {
    "Content-Type": "application/json"
    }
  }
  ).then((res) => onResponse(res));
}

export const getTextByID = (textID) => {
  return fetch(`http://localhost:3020/texts/${textID}`, {
    headers: {
    "Content-Type": "application/json"
    }
  }
  ).then((res) => onResponse(res));
}

export const addNewText = (body) => {
  return fetch('http://localhost:3020/texts/add', {
    headers: {
    "Content-Type": "application/json"
    },
    method: 'POST',
    body: JSON.stringify(body)
  }
  ).then((res) => onResponse(res));
}

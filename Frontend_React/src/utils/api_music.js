// -----------  API FOR LIKES-----------------
const onResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject('Error');
};


export const addLikeById = (body) => {
  return fetch('http://localhost:3020/music/likes/', {
    headers: {
      "content-type": "application/json"
    },
    method: "PATCH",
    body: JSON.stringify(body)
  }).then((res) => onResponse(res));
}

export const getMusicList = () => {
  return fetch('http://localhost:3020/music/', {
    headers: {
      "content-type": "application/json"
    },
    method: "GET",
  }).then((res) => onResponse(res));
}

export const deleteMusicLikeById = (body) => {
  return fetch('http://localhost:3020/music/likes/', {
    headers: {
      "content-type": "application/json"
    },
    method: "DELETE",
    body: JSON.stringify(body)
  }).then((res) => onResponse(res));
}



export const addNewTrack = (data) => {
  console.log(data)
  return fetch('http://localhost:3020/music/upload', {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "content-type": "audio/mpeg"
    },
    method: "POST",
    body: JSON.stringify(data)
  }).then((res) => {onResponse(res)
 
})
}
const downloadAudio = (source) => {

  fetch(source, {
    method: 'GET',
    headers: {
      'Content-Type': 'audio/mpeg',
      'Access-Control-Allow-Origin': 'http://localhost:3000'
    }
  }).then(res=>res.blob()).then(blob=>
    {
      const blobURL = window.URL.createObjectURL(new Blob([blob]))
      const fileName = source.split('/').pop()
      const aTag = document.createElement('a');
      aTag.href = blobURL;
      aTag.setAttribute('download', fileName);
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove()
    })
  }
  
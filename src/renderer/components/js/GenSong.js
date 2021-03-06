let jsmediatags = require('jsmediatags')

async function loadSong (file) {
  try {
    const {title, artist, picture} = await getSongInfo(file.name, file.path)
    const path = await asyncLoadSong(file)
    return {
      title: title,
      artist: artist,
      picture: picture,
      path: path
    }
  } catch (e) {
    console.log(e.message)
  }
}

async function asyncLoadSong (file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

async function getSongInfo (name, filepath) {
  try {
    const {tags} = await asyncJsMediaTags(filepath)
    const {title, artist, picture} = tags
    let albumArtUrl
    // 画像の生成
    if (picture) {
      const {data, type} = picture
      const byteArray = new Uint8Array(data)
      const blob = new Blob([byteArray], {type})
      albumArtUrl = URL.createObjectURL(blob)
    }
    return {
      title: title,
      artist: artist || '不明',
      picture: albumArtUrl || require('@/assets/Noimg.png')
    }
  } catch (e) {
    console.log(e.message)
    return {
      title: name,
      artist: '不明',
      picture: require('@/assets/Noimg.png')
    }
  }
}

async function asyncJsMediaTags (filepath) {
  return new Promise((resolve, reject) => {
    jsmediatags.read(filepath, {
      onSuccess: resolve,
      onError: reject
    })
  })
}

export {loadSong}

import myAxios from './axios';

async function reqItemList(id) {
  try {
    let res = await myAxios.get(`/playlist/detail?id=${id}`);
    return res;
  } catch (error) {
    return null;
  }
}

async function reqItemDetailList(id, limit = 20, offset = 0) {
  try {
    let res = await myAxios.get(`/playlist/track/all?id=${id}&limit=${limit}&offset=${offset}`);
    return res;
  } catch (error) {
    return null;
  }
}

async function reqMusicMp3(id, level = 'exhigh') {
  try {
    let res1 = await myAxios.get(`/song/url?id=${id}`);
    if (res1.code === 200) {
    } else {
      res1 = await myAxios.get(`/song/url/v1?id=${id}&level=${level}`);
    }
    return res1;
  } catch (error) {
    return null;
  }
}

// /lyric?id=
async function reqMusicLyric(id) {
  try {
    let res = await myAxios.get(`/lyric?id=${id}`);
    return res;
  } catch (error) {
    return null;
  }
}

export default { reqItemList, reqItemDetailList, reqMusicMp3, reqMusicLyric };

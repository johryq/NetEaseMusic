import myAxios from './axios';

async function reqDefaultKeyWord() {
  try {
    let res = await myAxios.get('/search/default');
    return res.data;
  } catch (error) {
    return null;
  }
}

async function reqSearchSong(key) {
  try {
    let res = await myAxios.get(`/search?keywords=${key}`);
    return res.data;
  } catch (error) {
    return null;
  }
}

export default { reqDefaultKeyWord, reqSearchSong };

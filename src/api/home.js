import myAxios from './axios';

async function reqBanner() {
  try {
    let { data: res } = await myAxios.get('/banner');
    return res.banners;
  } catch (error) {
    return null;
  }
}

async function reqPlayList() {
  try {
    let { data: res } = await myAxios.get('/personalized?limit=9');
    return res.result;
  } catch (error) {
    return null;
  }
}

export default { reqBanner,reqPlayList };

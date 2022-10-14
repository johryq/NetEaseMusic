import myAxios from "./axios";

async function reqBanner() {
  let { data: res } = await myAxios.get("/banner");
  return res.banners;
}

export default { reqBanner };

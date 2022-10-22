import { createStore } from 'vuex';
import itemApi from '@/api/item.js';

export default createStore({
  state: {
    playList: [{ id: 0 }],
    playIndex: 0,
    lyric: {},
    lyricTime: {
      currentTime: 0,
      totleTime: 0,
      changeTime: 0,
      emptyTime: 0,
    },
    loopState: false,
    isPlay: true,
    detailPageShow: false,
    detailPageLyric: true,
    showPlayList: false,
  },
  mutations: {
    setPlayList(state, playList) {
      state.playList = playList;
    },
    setRemoveList(state, index) {
      state.playList = state.playList.filter((v, i) => i !== index);
    },
    setDelAllList(state) {
      state.playList = [{ id: 0 }];
      state.playIndex = 0;
      state.isPlay = true;
      state.lyric = null;
      state.loopState = false;
    },
    setIsPlay(state, boolval) {
      state.isPlay = boolval;
    },
    setPlayIndex(state, index) {
      if (index > state.playList.length - 1) {
        index = 0;
      }
      if (index < 0) {
        index = state.playList.length - 1;
      }
      state.playIndex = index;
    },
    setDetailPageShow(state, boolval) {
      state.detailPageShow = boolval;
    },
    setLyricShow(state, boolval) {
      state.detailPageLyric = boolval;
    },
    setMusicCurrentTime(state, time) {
      state.lyricTime.currentTime = time;
    },
    setMusicTotleTime(state, time) {
      // audio音频长度和播放长度不同·
      // if (state.lyricTime.emptyTime > state.lyricTime.totleTime) {
      state.lyricTime.totleTime = time;
    },
    setChangeTime(state, time) {
      state.lyricTime.changeTime = time;
    },
    setEmptyTime(state, time) {
      state.lyricTime.emptyTime = time;
    },
    setShowPlayList(state, boolval) {
      state.showPlayList = boolval;
    },
    setLoopState(state) {
      state.loopState = !state.loopState;
    },
  },
  actions: {
    getLyric: async function (context, id) {
      let res = await itemApi.reqMusicLyric(id);
      context.state.lyric = res.data.lrc.lyric;
    },
  },
  modules: {},
});

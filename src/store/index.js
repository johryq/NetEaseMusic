import { createStore } from 'vuex';

export default createStore({
  state: {
    playList: [
      {
        id: 0,
      },
    ],
    playIndex: 0,
    isPlay: true,
    detailPageShow: false,
  },
  mutations: {
    setPlayList(state, playList) {
      state.playList = playList;
    },
    setIsPlay(state, boolval) {
      state.isPlay = boolval;
    },
    setPlayIndex(state, index) {
      if (index > state.playList.length - 1) {
        index = 0;
      } else if (index < 0) {
        index = state.playList.length - 1;
      }
      state.playIndex = index;
    },
    setDetailPageShow(state, boolval) {
      state.detailPageShow = boolval;
    },
  },
  actions: {},
  modules: {},
});

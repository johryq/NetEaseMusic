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
      }
      state.playIndex = index;
    },
  },
  actions: {},
  modules: {},
});

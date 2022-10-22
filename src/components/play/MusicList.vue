<template>
  <div @click="closeMusicList" class="music-list">
    <div @click.stop class="ml-container">
      <div class="mlc">
        <div class="mlc-head">
          <div class="mlh-text">
            <h4>当前播放</h4>
            <span>({{ playCount }})</span>
          </div>
          <div class="mlh-icon">
            <div @click="changeLoop" class="mi-left">
              <div v-if="state.loopState" class="oneloop">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-danquxunhuan"></use>
                </svg>
                <span>单曲循环</span>
              </div>
              <div v-else class="listloop">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xunhuanbofang"></use>
                </svg>
                <span>列表循环</span>
              </div>
            </div>
            <div class="mi-right">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiazai"></use>
              </svg>
              <svg @click="delAll" class="icon" aria-hidden="true">
                <use xlink:href="#icon-shanchu"></use>
              </svg>
            </div>
          </div>
        </div>
        <div v-if="state.playList[0].id !== 0" class="mlc-list">
          <div :class="{ 'ac-row': index === state.playIndex }" @click.stop="changePlay(index)" v-for="(music, index) in state.playList" class="row">
            <svg v-if="index === state.playIndex" class="icon play-icon" aria-hidden="true">
              <use xlink:href="#icon-bofangzhong-copy"></use>
            </svg>
            <div class="info show-1row-text">
              {{ music.name }}
              <i>- {{ music.ar.map((v) => v.name).toString() }}</i>
            </div>
            <div @click.stop="delMusic(index)" class="delicon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-close"></use>
              </svg>
            </div>
          </div>
        </div>
        <div v-else class="null-row">您没有播放过任何歌曲哦！</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const state = reactive({
  showPlayList: computed(() => store.state.showPlayList),
  playList: computed(() => store.state.playList),
  playIndex: computed(() => store.state.playIndex),
  loopState: computed(() => store.state.loopState),
});

let playCount = computed(() => (store.state.playList[0].id === 0 ? 0 : state.playList.length));
function closeMusicList() {
  store.commit('setShowPlayList', false);
}
function changePlay(index) {
  store.commit('setPlayIndex', index);
  store.commit('setIsPlay', false);
}
function delMusic(index) {
  if (state.playList.length === 1) {
    delAll();
  } else {
    store.commit('setRemoveList', index);
    if (index < state.playIndex) {
      store.commit('setPlayIndex', state.playIndex - 1);
    }
  }
}
function delAll() {
  if (state.playList[0].id !== 0) {
    store.commit('setDelAllList');
  }
}
function changeLoop() {
  store.commit('setLoopState');
}
</script>
<style lang="less" scoped>
.music-list {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  .ml-container {
    margin: 0.2rem;
    width: 6rem;
    height: 8rem;
    border-radius: 0.3rem;
    background: #fff;
    .mlc {
      padding: 0.2rem;
      display: flex;
      flex-direction: column;
      font-size: 0.28rem;
    }
    .icon {
      width: 0.4rem;
      height: 0.4rem;
      color: #999;
      vertical-align: middle;
    }
    .mlc-head {
      height: 1rem;
      .mlh-text {
        h4 {
          display: inline-block;
        }
        span {
          margin-left: 0.1rem;
          font-size: 0.24rem;
          // text-align: end;
          color: #999;
        }
      }
      .mlh-icon {
        width: 100%;
        margin-top: 0.1rem;
        display: flex;
        justify-content: space-between;
        .mi-left {
          .icon {
            margin-right: 0.1rem;
          }
        }
        .mi-right {
          .icon {
            margin-left: 0.2rem;
          }
          .icon:nth-child(1) {
            width: 0.33rem;
            height: 0.33rem;
          }
        }
      }
    }
    .mlc-list {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 6.8rem;
      padding: 0 0.25rem;
      overflow: scroll;
      .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .play-icon {
          width: 0.33rem;
          height: 0.33rem;
          color: red;
        }
        .info {
          height: 1rem;
          line-height: 1rem;
          width: 85%;
          i {
            font-style: normal;
            color: #999;
            font-size: 0.24rem;
          }
        }
        .delicon {
          width: 0.3rem;
          height: 0.3rem;
          margin-right: 0.1rem;
        }
      }
      .ac-row .info {
        color: red;
        i {
          color: red;
        }
      }
    }
    .null-row {
      line-height: 4rem;
      text-align: center;
      color: #999;
    }
  }
}
</style>

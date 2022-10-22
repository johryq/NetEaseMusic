<template>
  <div class="item-music">
    <div class="im-head clear-both">
      <div class="ih-con">
        <div class="ih-left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-play"></use>
          </svg>
          <span class="text-con" @click="playAll">播放全部</span>
          <span class="text-alert">&nbsp;({{ trackcount }})</span>
        </div>
        <div class="ih-right">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tianjia"></use>
          </svg>
          <span>收藏( &nbsp;{{ countFormat(subscribedcount) }}&nbsp;)</span>
        </div>
      </div>
    </div>
    <div class="music-box">
      <div class="mb-con">
        <div
          @click="changePlayIndex(index)"
          v-for="(music, index) in detaillist.songs"
          :key="index"
          class="mb-row"
        >
          <div class="mb-id text-con">{{ index + 1 }}</div>
          <div class="mb-info">
            <div
              :class="[
                'text-con',
                'show-1row-text',
                { 'text-notplay': music.fee === 1 || music.fee === 0 ? true : false },
              ]"
            >
              {{ music.name }}
            </div>
            <div class="text-alert show-1row-text">{{ music.ar[0].name }}</div>
          </div>
          <div class="mb-icon">
            <svg v-if="music.mv !== 0" class="icon" aria-hidden="true">
              <use xlink:href="#icon-play"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-menu"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex';

export default {
  setup(props) {
    console.log({ detailList: props });
    function countFormat(num) {
      if (num > 99999999) {
        return (num / 100000000).toFixed(1) + '亿';
      } else if (num > 9999) {
        return (num / 10000).toFixed(1) + '万';
      } else {
        return num;
      }
    }
    const store = useStore();
    // 播放全部 改变vuex 歌单和播放状态
    function playAll() {
      store.commit('setPlayList', props.detaillist.songs);
      store.commit('setIsPlay', false);
    }
    // 切换歌曲
    function changePlayIndex(index) {
      if (
        store.state.playList[0].id === 0 ||
        store.state.playList[0].id !== props.detaillist.songs[0].id
      ) {
        store.commit('setPlayList', props.detaillist.songs);
        console.log({ isfree: store.state.playList[index].fee });
      }
      console.log(index);
      store.commit('setPlayIndex', index);
      store.commit('setIsPlay', false);
    }
    return { countFormat, playAll, changePlayIndex };
  },
  props: ['detaillist', 'trackcount', 'subscribedcount'],
};
</script>
<style lang="less" scoped>
.item-music {
  position: absolute;
  top: 6rem;
  width: 100%;
  .text-con {
    font-weight: 600;
  }
  .text-notplay {
    color: #999;
  }
  .text-alert {
    font-size: 0.24rem;
    color: #999;
  }
  .im-head {
    height: 1rem;
    line-height: 1rem;
    background: #fff;
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
    .ih-con {
      padding: 0 0.2rem;
    }
    .ih-left {
      float: left;
      .icon {
        vertical-align: -0.15rem;
      }
      svg {
        margin-right: 0.1rem;
      }
      .text-alert {
        margin-right: 0.1rem;
      }
    }
    .ih-right {
      float: right;
      height: 0.7rem;
      margin-top: 0.15rem;
      line-height: 0.7rem;
      padding: 0 0.1rem;
      border-radius: 0.4rem;
      background-color: #de0e0e;
      color: #fff;
      font-size: 0.28rem;
      .icon {
        width: 0.4rem;
        height: 0.4rem;
        vertical-align: -0.075rem;
      }
    }
  }
  .music-box {
    background: #fff;
    .mb-con {
      margin: 0 0.2rem;
      .mb-row {
        display: flex;
        align-items: center;
        width: 100%;
        height: 1rem;
        border-bottom: 0.02rem solid rgba(99, 95, 95, 0.05);
      }
      .mb-row :last-child {
        border-bottom: none;
      }
      .mb-id {
        width: 10%;
      }
      .mb-info {
        width: 70%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        & > div {
          height: 50%;
        }
        .text-con {
          font-size: 0.28rem;
        }
      }
      .mb-icon {
        width: 20%;
        display: flex;
        justify-content: flex-end;
        .icon {
          width: 0.4rem;
          height: 0.4rem;
          width: 50%;
          color: #999;
        }
      }
    }
  }
}
</style>

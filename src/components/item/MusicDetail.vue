<template>
  <div class="music-detail">
    <img
      class="bg"
      :src="data.song !== null ? data.song.al.picUrl : '@/assets/disc_default.png'"
      alt=""
    />
    <div class="md-head">
      <div class="mdh-con clear-both">
        <div class="mc-left">
          <div @click="closeThis" class="mc-l-icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-direction-left"></use>
            </svg>
          </div>
          <div class="mc-l-info">
            <div class="mc-info-name">
              {{ data.song !== null ? data.song.name : 'name' }}
            </div>
            <div class="mc-info-auther">
              {{ data.song !== null ? data.song.ar[0].name : 'auther' }}
            </div>
          </div>
        </div>
        <div class="mc-right">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fenxiang"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="md-container">
      <div class="mdc-imges">
        <img class="img-disc" src="@/assets/disc.png" alt="" />
        <img class="img-ab" src="@/assets/needle-ab.png" alt="" />
        <img
          class="img-mc"
          :src="data.song !== null ? data.song.al.picUrl : '@/assets/disc_default.png'"
          alt=""
        />
      </div>
      <div class="mf-icon-list">
        <div class="icon-like">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-like"></use>
          </svg>
        </div>
        <div class="icon-down">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiazai1"></use>
          </svg>
        </div>
        <div class="icon-cd">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-CD1"></use>
          </svg>
        </div>
        <div class="icon-commmit">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-pinglun1"></use>
          </svg>
        </div>
        <div class="icon-more">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-more1"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="md-footer">
      <div class="mf-play-line"></div>
      <div class="mf-icon-play">
        <div class="icon-cyclic">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xunhuanbofang"></use>
          </svg>
        </div>
        <div @click="preIndex" class="icon-pre">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-play-prev-"></use>
          </svg>
        </div>
        <div @click="changePS" class="icon-play">
          <svg v-if="data.isPlay" class="icon" aria-hidden="true">
            <use xlink:href="#icon-playfill"></use>
          </svg>
          <svg v-else class="icon" aria-hidden="true">
            <use xlink:href="#icon-zanting"></use>
          </svg>
        </div>
        <div @click="nextIndex" class="icon-next">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-play-next-"></use>
          </svg>
        </div>
        <div class="icon-list">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-menu"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex';
import { computed, watch, reactive } from 'vue';
export default {
  setup() {
    const data = reactive({
      playIndex: computed(() => store.state.playIndex),
      song: null,
      isPlay: computed(() => store.state.isPlay),
      showPage: computed(() => store.state.detailPageShow),
    });
    const store = useStore();
    function closeThis() {
      store.commit('setDetailPageShow', false);
    }
    function changePS() {
      store.commit('setIsPlay', !data.isPlay);
    }
    function preIndex() {
      store.commit('setPlayIndex', data.playIndex - 1);
    }
    function nextIndex() {
      store.commit('setPlayIndex', data.playIndex + 1);
    }
    watch(
      () => data.showPage,
      (val) => {
        if (val === true) {
          data.song = computed(() => store.state.playList[data.playIndex]);
        }
      },
      { immediate: true, deep: true },
    );
    return {
      data,
      closeThis,
      changePS,
      preIndex,
      nextIndex,
    };
  },
  // 更改播放状态，麻烦
  // emits: ['changePS'],
  // created() {
  //   this.$emit('changePS')
  // }
};
</script>
<style lang="less" scoped>
.music-detail {
  position: relative;
  color: #fff;
  width: 100%;
  height: 100%;
  & > img {
    position: fixed;
    z-index: -1;
    width: 100%;
    height: 100%;
    filter: blur(1.4rem);
  }
  .md-head {
    height: 1rem;
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
    .mdh-con {
      display: flex;
      justify-content: space-between;
      margin: 0 0.2rem;
      height: 100%;
      .mc-left,
      .mc-right {
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
      }
      .mc-left {
        .mc-l-info {
          display: flex;
          flex-direction: column;
          margin-left: 0.2rem;
          .mc-info-auther {
            font-size: 0.28rem;
            color: #999;
          }
        }
      }
      .mc-right {
        justify-content: flex-end;
      }
    }
  }
  .md-container {
    width: 100%;
    height: 9rem;
    .mdc-imges {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      .img-disc {
        position: absolute;
        bottom: 2.4rem;
        width: 5rem;
        height: 5rem;
      }
      .img-ab {
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(-10deg);
        transform: all 2s;
        z-index: 1;
        width: 2rem;
        height: 3rem;
      }
      .img-mc {
        position: absolute;
        bottom: 3.3rem;
        border-radius: 50%;
        widows: 3.2rem;
        height: 3.2rem;
      }
    }
    .mf-icon-list {
      position: fixed;
      bottom: 1.7rem;
      height: 0.8rem;
      width: 100%;
      padding: 0 0.5rem;
    }
  }
  .mf-icon-list,
  .mf-icon-play {
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.4rem;
  }
  .md-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1.7rem;

    .mf-icon-play {
      height: 1.5rem;
      .icon-play {
        border-radius: 0.5rem;
        border: 0.03rem solid #fff;
        padding: 0.05rem;
      }
      .icon {
        vertical-align: middle;
      }
    }
    .mf-play-line {
      height: 0.2rem;
    }
  }
}
</style>

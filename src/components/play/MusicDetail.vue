<template>
  <div class="music-detail">
    <img class="bg" :src="data.song !== 0 ? data.song.al.picUrl : '@/assets/disc_default.png'" alt="" />
    <div class="bg-top-box">
      <img class="bg-top" :src="data.song !== 0 ? data.song.al.picUrl : '@/assets/disc_default.png'" alt="" />
    </div>
    <div class="bg-bottom-box">
      <img class="bg-bottom" :src="data.song !== 0 ? data.song.al.picUrl : '@/assets/disc_default.png'" alt="" />
    </div>
    <div class="md-head">
      <div class="mdh-con clear-both">
        <div class="mc-left">
          <div @click="closeThis" class="mc-l-icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-direction-left"></use>
            </svg>
          </div>
          <div class="mc-l-info">
            <div class="mc-info-name show-1row-text">
              {{ data.song !== 0 ? data.song.name : 'name' }}
            </div>
            <div class="mc-info-auther">
              {{ data.song !== 0 ? data.song.ar[0].name : 'auther' }}
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
      <div @click="showLyric" v-show="data.showLyric" class="mdc-lyric">
        <p v-if="data.lyric === undefined">歌词加载中</p>
        <div ref="lyricBox" class="lyric-box" v-else>
          <!-- {{ data.lyric }} -->
          <p
            v-for="(val, index) in data.lyricinfo"
            :class="{
              'p-active': data.lyricTime.currentTime >= val.time.currentTime && data.lyricTime.currentTime <= val.time.nextTime ? true : false,
            }"
            :key="index"
          >
            {{ val.lyric }}
          </p>
        </div>
      </div>
      <div class="mdc-img-box" v-show="!data.showLyric">
        <div @click="showLyric" class="mdc-imges">
          <img class="img-disc" src="@/assets/disc.png" alt="" />
          <img class="img-needle" src="@/assets/needle-ab.png" :class="data.needleStyle" alt="" />
          <img class="img-mc" :class="data.rotateStyle" :src="data.song !== 0 ? data.song.al.picUrl : '@/assets/disc_default.png'" alt="" />
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
    </div>
    <div class="md-footer">
      <div class="mf-play-line">
        <van-slider
          v-model="barValue"
          :max="data.lyricTime.totleTime === 0 ? 100 : data.lyricTime.totleTime"
          :min="0"
          active-color="#ee0a24"
          @change="changeBar"
        >
          <template #button>
            <div class="custom-button"></div>
          </template>
        </van-slider>
      </div>
      <div class="mf-icon-play">
        <div @click="changeLoop" class="icon-cyclic">
          <svg v-if="!data.loopState" class="icon" aria-hidden="true">
            <use xlink:href="#icon-xunhuanbofang"></use>
          </svg>
          <svg v-else class="icon" aria-hidden="true">
            <use xlink:href="#icon-danquxunhuan"></use>
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
        <div @click="showPlayList" class="icon-list">
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
import { computed, watch, reactive, onMounted, getCurrentInstance, ref } from 'vue';

export default {
  setup() {
    const store = useStore();
    let lyricBox;
    // 计算属性 值无法修改，可通过get，set修改
    // let lyricTime = computed(() => store.state.lyricTime);
    const barValue = ref(50);
    const data = reactive({
      // 该值为true 不执行歌词滚动
      scrollLyricBool: false,
      loopState: computed(() => store.state.loopState),
      playList: computed(() => store.state.playList),
      playIndex: computed(() => store.state.playIndex),
      lyricTime: computed(() => store.state.lyricTime),
      song: null,
      isPlay: computed(() => store.state.isPlay),
      showPage: computed(() => store.state.detailPageShow),
      showLyric: computed(() => store.state.detailPageLyric),
      lyric: computed(() => store.state.lyric),
      rotateStyle: computed(() => ({
        'img-mc-run': store.state.isPlay,
        'img-mc-paused': store.state.isPlay,
      })),
      needleStyle: computed(() => ({
        'img-needle-active': !store.state.isPlay,
      })),
      lyricinfo: computed(() => {
        let lyricArray;
        let lastTime = 0;
        if (data.lyric !== null) {
          lyricArray = data.lyric.split(/[(\r\n)\r\n]+/).map((item, index, ary) => {
            let min = item.slice(1, 3);
            let sec = item.slice(4, 6);
            let mill = item.slice(7, 10);
            let lrc = item.slice(11, item.length);
            let nextTime = null;
            if (isNaN(Number(mill))) {
              mill = item.slice(7, 9);
              lrc = item.slice(10, item.length);
            }
            let currentTime = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
            return { time: { min, sec, mill, currentTime, nextTime }, lyric: lrc };
          });
          // 去除空歌词
          lastTime = lyricArray[lyricArray.length - 1].time.currentTime;
          lyricArray = lyricArray.filter((val) => val.lyric !== '');
          if (lyricArray !== null) {
            try {
              lyricArray.forEach((val, index) => {
                // 是否为最后一个
                if (index === lyricArray.length - 1) {
                  val.time.nextTime = val.time.currentTime;
                } else {
                  val.time.nextTime = lyricArray[index + 1].time.currentTime;
                }
              });
            } catch (error) {
              console.log({ 未知错误: error });
            }
          }
        }
        store.commit('setEmptyTime', parseInt(lastTime) * 1000);
        return lyricArray;
      }),
    });
    function showPlayList() {
      // proxy set error
      // store.commit('setShowPlayList', true);
    }
    function closeThis() {
      store.commit('setDetailPageShow', false);
    }
    // 播放状态
    function changePS() {
      store.commit('setIsPlay', !data.isPlay);
    }
    function changeBar() {
      scrollLyric();
      store.commit('setChangeTime', barValue.value);
    }
    function preIndex() {
      store.commit('setPlayIndex', data.playIndex - 1);
      store.commit('setIsPlay', false);
    }
    function nextIndex() {
      store.commit('setPlayIndex', data.playIndex + 1);
      store.commit('setIsPlay', false);
    }
    function showLyric() {
      if (data.lyric === null && data.playList[0].id !== 0) {
        store.dispatch('getLyric', data.playList[data.playIndex].id);
      }
      store.commit('setLyricShow', !data.showLyric);
    }
    // 控制歌词div向上滚动
    function scrollLyric() {
      if (data.scrollLyricBool) return;
      if (lyricBox !== null && lyricBox !== undefined) {
        let acP = document.querySelector('.p-active');
        try {
          if (acP.offsetTop > 280) {
            console.log('move');
            lyricBox.refs.lyricBox.scrollTop = acP.offsetTop - 280;
          }
        } catch (error) {}
      }
    }
    function changeLoop() {
      store.commit('setLoopState');
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
    watch(
      () => data.playList,
      (val) => {
        if (val[0].id === 0) {
          data.song = 0;
        }
      },
    );
    watch(
      () => data.lyricTime.currentTime,
      (val) => {
        scrollLyric();
        // 获取当前时间，即进度条value
        barValue.value = val;
      },
      { immediate: true, deep: true },
    );
    onMounted(() => {
      lyricBox = getCurrentInstance();
    });

    return {
      data,
      barValue,
      closeThis,
      changePS,
      preIndex,
      nextIndex,
      showLyric,
      changeBar,
      showPlayList,
      changeLoop,
    };
  },
};
</script>
<style lang="less" scoped>
@bg-color: rgba(0, 0, 0, 0.01);
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
    -webkit-filter: blur(1.4rem);
    transform: scale(1.5);
  }
  .md-head {
    position: fixed;
    top: 0;
    z-index: 20;
    height: 1rem;
    width: 100%;
    background: @bg-color;
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
          overflow: hidden;
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
    margin-top: 1.2rem;
    width: 100%;
    height: 80%;
    z-index: 1;
    & > div {
      width: 100%;
      height: 100%;
    }
    .mdc-lyric {
      align-items: center;
      & > div {
        overflow: scroll;
        height: 100%;
        padding: 60% 0 80% 0;
        transition: all 1s;
      }
      p {
        color: #999;
        text-align: center;
        font-size: 0.28rem;
        line-height: 0.5rem;
        margin: 0.5rem 0;
      }
      .p-active {
        color: #fff;
      }
    }
    .mdc-img-box {
      .mdc-imges {
        width: 100%;
        height: 9rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        margin-top: 0.2rem;
        .img-disc {
          position: absolute;
          bottom: 2.4rem;
          width: 5rem;
          height: 5rem;
        }
        .img-needle {
          position: absolute;
          left: 46%;
          transform-origin: 0 0;
          transform: rotate(-15deg);
          transition: all 2s;
          z-index: 1;
          width: 2rem;
          height: 3rem;
        }
        .img-needle-active {
          transform: rotate(1deg);
        }
        .img-mc {
          position: absolute;
          bottom: 3.3rem;
          border-radius: 50%;
          width: 3.2rem;
          height: 3.2rem;
          animation: rotateImg 10s linear infinite;
        }
        .img-mc-run {
          animation-play-state: running;
        }
        .img-mc-paused {
          animation-play-state: paused;
        }
        @keyframes rotateImg {
          0% {
            transform: rotateZ(0deg);
          }
          100% {
            transform: rotateZ(360deg);
          }
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
  }
  .mf-icon-list,
  .mf-icon-play {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.4rem;
  }
  .md-footer {
    position: fixed;
    bottom: 0;
    z-index: 20;
    width: 100%;
    height: 1.7rem;
    background: @bg-color;
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
      // height: 0.2rem;
      .custom-button {
        width: 0.24rem;
        height: 0.24rem;
        background-color: #ee0a24;
        border-radius: 0.24rem;
      }
    }
  }
  .bg-top-box,
  .bg-bottom-box {
    position: fixed;
    z-index: 10;
    width: 100%;
    overflow: hidden;
  }
  .bg-top-box {
    top: 0;
    height: 1rem;
  }
  .bg-bottom-box {
    bottom: 0;
    height: 1.7rem;
  }
  .bg-top,
  .bg-bottom {
    z-index: 0;
    width: 100vw;
    height: 100vh;
    filter: blur(1.4rem);
    -webkit-filter: blur(1.4rem);
    transform: scale(1.5);
  }
  .bg-top {
    box-shadow: 0 0.1rem 0.3rem 0.05rem rgba(0, 0, 0, 1);
  }
  .bg-bottom {
    box-shadow: 0 -0.1rem 0.3rem 0.05rem rgba(0, 0, 0, 1);
  }
}
</style>

<template>
  <div class="footer-play">
    <div class="fp-con">
      <div @click="showDetailPage" class="fp-left">
        <div class="fp-img">
          <img
            v-if="playList[playIndex].id !== 0"
            :src="
              playList[playIndex].id !== 0
                ? playList[playIndex].al.picUrl
                : 'https://p1.music.126.net/kekg-DZw8y88nwhV8DUm8Q==/109951163540109251.jpg'
            "
            alt=""
          />
          <svg v-else class="icon" aria-hidden="true">
            <use xlink:href="#icon-yinle"></use>
          </svg>
        </div>
        <div class="fp-info">
          <div class="fpi-name show-1row-text">
            {{ playList[playIndex].id !== 0 ? playList[playIndex].name : '未知歌曲' }}
          </div>

          <div class="fpi-auther show-1row-text">&nbsp;-&nbsp;{{ playList[playIndex].id !== 0 ? playList[playIndex].ar[0].name : '未知作家' }}</div>
        </div>
      </div>
      <div class="fp-icon">
        <div class="fpi-play">
          <div @click="changePlayStatus" class="fpi-box">
            <svg v-if="isPlay === true" class="icon" aria-hidden="true">
              <use xlink:href="#icon-play1"></use>
            </svg>
            <svg v-else class="icon" aria-hidden="true">
              <use xlink:href="#icon-zanting-copy"></use>
            </svg>
          </div>
        </div>
        <div @click="showPlayList" class="fpi-list">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liebiao"></use>
          </svg>
        </div>
      </div>
      <audio
        @ended="playNext"
        :autoplay="!isPlay"
        :loop="loopState"
        preload="auto"
        ref="audio"
        :src="playList[playIndex].id !== 0 ? `https://music.163.com/song/media/outer/url?id=${playList[playIndex].id}.mp3` : ''"
      ></audio>
      <!-- <audio ref="audio" controls src="https://music.163.com/song/media/outer/url?id=1868206871.mp3"></audio> -->
      <!-- <audio controls ref="audio" src="https://hwaphon.github.io/HTML5MusicPlayer/raw/fly.ogg"></audio> -->
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      timer: null,
    };
  },
  computed: {
    ...mapState(['playList', 'playIndex', 'isPlay', 'detailPageShow', 'lyricTime', 'loopState', 'loopState']),
  },
  watch: {
    isPlay: {
      handler(val) {
        if (this.$refs.audio) {
          if (val === false) {
            this.$refs.audio.play();
            this.setTimeInterval();
          } else {
            this.$refs.audio.pause();
            this.clearTimeInterval();
          }
        }
      },
      deep: true,
      immediate: true,
    },
    playIndex: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$store.dispatch('getLyric', this.playList[this.playIndex].id);
          this.setTotleTime();
        }
      },
    },
    'lyricTime.changeTime': {
      handler(val) {
        if (val !== 0) {
          this.$refs.audio.currentTime = val / 1000;
        }
      },
    },
  },
  methods: {
    changePlayStatus() {
      if (this.playList[this.playIndex].id !== 0) {
        if (this.isPlay === true) {
          this.$store.commit('setIsPlay', false);
        } else {
          this.$store.commit('setIsPlay', true);
        }
      }
    },
    playNext() {
      // 循环播放以及播放结束
      if (this.loopState !== true) {
        this.$store.commit('setPlayIndex', this.playIndex + 1);
      } else {
        // this.$refs.audio.currentTime = 0;
        this.$store.commit('setMusicCurrentTime', 0);
        // this.$refs.audio.play();
        this.setTimeInterval();
      }
    },
    showDetailPage() {
      // 判断是否选择了歌曲
      if (this.playList[0].id !== 0) {
        this.$store.commit('setPlayIndex', this.playIndex);
        this.$store.commit('setDetailPageShow', true);
        this.$store.dispatch('getLyric', this.playList[this.playIndex].id);
      }
    },
    showPlayList() {
      this.$store.commit('setShowPlayList', true);
    },
    // 定时器获取并设置播放时间
    setTimeInterval() {
      // 先清除再设置
      if (this.timer === null) {
        try {
          this.timer = window.setInterval(() => {
            this.$store.commit('setMusicCurrentTime', this.$refs.audio.currentTime * 1000);
            console.log({ audio: this.$refs.audio, ttt: this.$refs.audio.duration });
            if (this.lyricTime.totleTime === 0 && this.$refs.audio.duration !== this.lyricTime.totleTime) {
              this.setTotleTime();
            }
          }, 1000);
        } catch (error) {
          console.log({ timerError: error });
        }
      }
    },
    clearTimeInterval() {
      window.clearInterval(this.timer);
      this.timer = null;
    },
    setTotleTime() {
      // 首次获取为NaN ，在定时器中获取
      if (this.$refs.audio && !isNaN(this.$refs.audio.duration)) {
        console.log({ settotle: this.$refs.audio.duration });
        this.$store.commit('setMusicTotleTime', this.$refs.audio.duration * 1000);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.footer-play {
  position: fixed;
  bottom: 0;
  height: 1.2rem;
  width: 100%;
  background: #fff;
  .fp-con {
    display: flex;
    padding: 0.2rem;
    .fp-left {
      display: flex;
      align-items: center;
      width: 80%;
      .fp-img {
        width: 1rem;
        height: 1rem;
        img {
          border-radius: 0.4rem;
          overflow: hidden;
          vertical-align: middle;
          width: 75%;
          height: 75%;
        }
        .icon {
          width: 0.8rem;
          height: 0.8rem;
        }
      }
      .fp-info {
        display: flex;
        align-items: center;
        width: 80%;
        .fpi-name {
          font-size: 0.28rem;
        }
        .fpi-auther {
          font-size: 0.2rem;
          color: #999;
        }
      }
    }
    .fp-icon {
      display: flex;
      align-items: center;
      width: 20%;
      & > div {
        width: 50%;
      }
      .icon {
        color: rgb(27, 25, 25);
      }
      .fpi-play {
        .fpi-box {
          position: relative;
          width: 0.45rem;
          height: 0.45rem;
          border: 0.02rem solid #999;
          border-radius: 0.5rem;
        }
        .icon {
          position: absolute;
          top: 0.05rem;
          left: 0.07rem;
          width: 0.3rem;
          height: 0.3rem;
        }
      }
      .fpi-list {
        .icon {
          width: 0.45rem;
          height: 0.45rem;
        }
      }
    }
  }
}
</style>

<template>
  <div class="footer-play">
    <div class="fp-con">
      <div class="fp-left">
        <div class="fp-img">
          <img v-if="playList[playIndex].id !== 0" :src="playList[playIndex].id !== 0 ? playList[playIndex].al.picUrl : 'https://p1.music.126.net/kekg-DZw8y88nwhV8DUm8Q==/109951163540109251.jpg'" alt="" />
          <svg v-else class="icon" aria-hidden="true">
            <use xlink:href="#icon-yinle"></use>
          </svg>
        </div>
        <div class="fp-info">
          <div class="fpi-name">{{ playList[playIndex].id !== 0 ? playList[playIndex].name : '未知歌曲' }}</div>

          <div class="fpi-auther">&nbsp;-&nbsp;{{ playList[playIndex].id !== 0 ? playList[playIndex].ar[0].name : '未知作家' }}</div>
        </div>
      </div>
      <div class="fp-icon">
        <div class="fpi-play">
          <div @click="changePlayStatus" class="fpi-box">
            <svg v-if="isPlay === true" class="icon" aria-hidden="true">
              <use xlink:href="#icon-play1"></use>
            </svg>
            <svg v-else class="icon" aria-hidden="true">
              <use xlink:href="#icon-zanting"></use>
            </svg>
          </div>
        </div>
        <div class="fpi-list">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liebiao"></use>
          </svg>
        </div>
      </div>
      <audio @ended="playNext" autoplay ref="audio" :src="playList[playIndex].id !== 0 ? `https://music.163.com/song/media/outer/url?id=${playList[playIndex].id}.mp3` : ''"></audio>
      <van-overlay :show="show" />
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
      show: false
    }
  },
  computed: {
    ...mapState(['playList', 'playIndex', 'isPlay']),
    // ...mapMutations(['setIsPlay']),
  },
  // watch: {
  //   isPlay(val, oldVal) {
  //     if (val === false) {
  //       this.$refs.audio.play();
  //     }
  //   },
  // },
  methods: {
    changePlayStatus() {
      if (this.playList[this.playIndex].id !== 0) {
        if (this.isPlay === true) {
          this.$store.commit('setIsPlay', false);
          this.$refs.audio.play();
        } else {
          this.$store.commit('setIsPlay', true);
          this.$refs.audio.pause();
        }
      }
    },
    playNext() {
      this.$store.commit('setPlayIndex', this.playIndex + 1);
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

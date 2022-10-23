<template>
  <div class="find-play-list">
    <div class="play-head clear-both">
      <div class="ph-left">发现歌单</div>
      <div class="ph-right">查看更多</div>
    </div>
    <div class="play-list clear-both">
      <van-swipe v-if="data.playList !== null" :loop="false">
        <van-swipe-item v-for="(playList, index) in data.playList" :key="index">
          <ul>
            <li v-for="(play, i) in playList" :key="i">
              <router-link :to="{ path: '/itemmusic', query: { id: play.id } }">
                <div class="play-box">
                  <div class="pb-img">
                    <img :src="play.picUrl" alt="" />
                    <div class="pb-play-count">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-play-24gl"></use>
                      </svg>
                      <span>{{ play.playCount }}</span>
                    </div>
                  </div>
                  <div class="pb-tit show-2row-text">{{ play.name }}</div>
                </div>
              </router-link>
            </li>
          </ul>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive } from 'vue';
import homeApi from '@/api/home';

export default {
  setup() {
    const data = reactive({
      playList: [],
    });
    onMounted(() => {
      let res = homeApi.reqPlayList();
      if (res !== null) {
        res.then((val) => {
          val.forEach((play) => {
            let num = play.playCount;
            if (num > 99999999) {
              num = (num / 100000000).toFixed() + '亿';
            } else if (num > 9999) {
              num = (num / 10000).toFixed() + '万';
            }
            play.playCount = num;
          });
          for (let index = 0; index < val.length; index += 3) {
            data.playList.push(val.slice(index, index + 3));
          }
          console.log({ playList: data.playList });
        });
      }
    });
    // computed();
    return { data };
  },
};
</script>
<style lang="less" scoped>
.find-play-list {
  width: 100%;
  padding: 0.1rem;
  padding-bottom: 1rem;
  .play-head {
    height: 0.6rem;
    text-align: 0.6rem;
    margin-bottom: 0.2rem;
    .ph-left {
      float: left;
      line-height: 0.6rem;
      font-size: 0.4rem;
    }
    .ph-right {
      border: 0.04rem solid #bcbcbc;
      border-radius: 0.25rem;
      padding: 0.04rem;
      float: right;
      // color: #bcbcbc;
      height: 0.55rem;
    }
  }
  .play-list {
    ul {
      display: flex;
      justify-content: space-between;
      width: 100%;
      li {
        width: 33.3%;
        overflow: hidden;
        margin-right: 0.1rem;
        margin-bottom: 0.2rem;
        padding-bottom: 0.2rem;
        .play-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          height: 100%;
          .pb-img {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 0.1rem;
            overflow: hidden;
            & > img {
              object-fit: cover;
              width: 100%;
              height: 100%;
            }
            .pb-play-count {
              position: absolute;
              right: 0.1rem;
              top: 0.1rem;
              color: #fff;
              svg {
                margin-right: 0.05rem;
                width: 0.24rem;
                height: 0.24rem;
                vertical-align: 0;
              }
            }
          }
          .pb-tit {
            margin-top: 0.1rem;
            width: 90%;
            height: 1.1rem;
          }
        }
      }
      li:nth-child(3n + 3) {
        margin-right: 0;
      }
    }
  }
}
</style>

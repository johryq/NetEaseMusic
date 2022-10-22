<template>
  <div class="item-music-container">
    <img :src="playlist.coverImgUrl" class="bg-img" alt="" />
    <div class="item-top clear-both">
      <div class="it-left">
        <svg class="icon" aria-hidden="true" @click="$router.push('/')">
          <use xlink:href="#icon-direction-left"></use>
        </svg>
        <span><h3>歌单</h3></span>
      </div>
      <div class="it-right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-search"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-menu"></use>
        </svg>
      </div>
    </div>
    <div class="item-info">
      <div class="ii-container">
        <div class="ii-info-box">
          <div class="ii-img">
            <div class="ii-img-box">
              <img :src="playlist.coverImgUrl + '?param=200y200'" alt="" />
            </div>
            <div class="play-count-box">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-play1"></use>
              </svg>
              <span>{{ countFormat(playlist.playCount) }}</span>
            </div>
          </div>
          <div class="ii-text-box">
            <div class="it-name-box show-2row-text">
              {{ playlist.name }}
            </div>
            <div class="it-auther-box">
              <img :src="playlist.coverImgUrl + '?param=200y200'" alt="" />
              <div class="it-nickname show-1row-text">{{ playlist.creator.nickname }}</div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiangyoujiantou"></use>
              </svg>
            </div>
            <div class="it-info-box show-2row-text">
              <span>
                {{ playlist.description }}
              </span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiangyoujiantou"></use>
              </svg>
            </div>
          </div>
        </div>
        <div class="item-icon">
          <div class="icon-box">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-pinglun"></use>
            </svg>
            <p>{{ countFormat(playlist.commentCount) }}</p>
          </div>
          <div class="icon-box">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fenxiang"></use>
            </svg>
            <p>{{ countFormat(playlist.shareCount) }}</p>
          </div>
          <div class="icon-box">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiazai1"></use>
            </svg>
            <p>下载</p>
          </div>
          <div class="icon-box">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-show_duoxuan"></use>
            </svg>
            <p>多选</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue';

export default {
  setup(props) {
    console.log({ playlist: props });
    if ((props.playlist.creator = '')) {
      props.playlist.creator = JSON.parse(sessionStorage.getItem('itemDetail').playlist).creator;
    }
    const data = reactive({});
    function countFormat(num) {
      if (num > 99999999) {
        return (num / 100000000).toFixed(1) + '亿';
      } else if (num > 9999) {
        return (num / 10000).toFixed(1) + '万';
      } else {
        return num;
      }
    }
    return { data, countFormat };
  },
  props: ['playlist'],
};
</script>
<style lang="less" scoped>
.item-music-container {
  position: relative;
  color: #fff;
  .bg-img {
    position: fixed;
    width: 100%;
    height: 6rem;
    z-index: -1;
    filter: blur(30px);
  }
}

.item-top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  color: #fff;
  .icon {
    width: 0.35rem;
    height: 0.35rem;
    vertical-align: 0;
  }
  .it-left,
  .it-right {
    height: 100%;
    line-height: 1rem;
  }
  .it-left {
    float: left;
    svg {
      margin: 0 0.2rem;
    }
    h3 {
      display: inline-block;
    }
  }
  .it-right {
    float: right;
    svg {
      margin: 0 0.3rem;
    }
  }
}
.item-info {
  padding-top: 1rem;
  width: 100%;
  height: 6rem;
  .ii-container {
    padding: 0.2rem;
    overflow: hidden;
    .ii-info-box {
      height: 3rem;
      display: flex;
      .ii-img {
        position: relative;
        .ii-img-box {
          width: 3rem;
          height: 3rem;
          border-radius: 0.3rem;
          overflow: hidden;
          img {
            object-fit: fill;
            width: 100%;
            height: 100%;
          }
        }

        .play-count-box {
          position: absolute;
          top: 0.1rem;
          right: 0.1rem;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 0.2rem;
          padding: 0 0.1rem;
          .icon {
            vertical-align: middle;
            width: 0.4rem;
            height: 0.4rem;
            margin-right: 0.08rem;
          }
        }
      }
      .ii-text-box {
        display: flex;
        flex-direction: column;
        padding: 0.1rem 0.2rem 0 0.2rem;
        width: 60%;
        .it-name-box {
          height: 0.9rem;
        }
        .it-auther-box {
          display: flex;
          align-items: center;
          width: 100%;
          margin: 0.1rem 0;
          img {
            height: 0.5rem;
            height: 0.5rem;
            margin-right: 0.2rem;
            border-radius: 0.25rem;
            vertical-align: middle;
          }
          .it-nickname {
            width: 70%;
          }
          .icon {
            width: 0.2rem;
            height: 0.2rem;
            vertical-align: middle;
          }
          a {
            color: #fff;
          }
        }
        .it-info-box {
          width: 90%;
          font-size: 0.24rem;
          margin-top: 0.2rem;
          -webkit-line-clamp: 3;

          .icon {
            width: 0.2rem;
            height: 0.2rem;
            vertical-align: middle;
          }
        }
      }
    }
    .item-icon {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.2rem 0;
      .icon-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 0.3rem;
        .icon {
          color: #fff;
        }
        p {
          margin-top: 0.1rem;
        }
      }
      .icon-box:nth-child(1) .icon {
        width: 0.6rem;
        height: 0.6rem;
      }
      .icon-box:nth-child(3) .icon {
        width: 0.6rem;
        height: 0.6rem;
      }
    }
  }
}
</style>

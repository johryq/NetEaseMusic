<template>
  <div class="search-container">
    <div class="sc-head">
      <div class="search-box">
        <form action="/">
          <van-search v-model="searchVal" show-action :placeholder="data.searchDef" @search="onSearch">
            <template #left>
              <div @click="onClickButton">
                <svg class="icon" aria-hidden="true" @click="$router.push('/')">
                  <use xlink:href="#icon-direction-left"></use>
                </svg>
              </div>
            </template>
            <template #action>
              <div @click="onSearch">搜索</div>
            </template>
          </van-search>
        </form>
      </div>
    </div>
    <div class="sc-box">
      <div class="sc-history">
        <div class="sch-left">
          <span>历史</span>
          <div v-show="data.tagAry !== undefined">
            <van-tag
              v-for="(tag, index) in data.tagAry"
              :show="data.showSearch"
              round
              color="#999"
              closeable
              size="medium"
              type="primary"
              @close.stop="closeTag(index)"
              @click="searchVal = tag"
            >
              {{ tag }}
            </van-tag>
          </div>
        </div>
        <div class="sch-right">
          <van-button @click="clearAllTag" type="primary" round color="#999" size="mini">clearall</van-button>
        </div>
      </div>
      <div v-if="data.searchSongs !== null" class="search-result">
        <div class="result-head">
          <h4>单曲</h4>
          <div @click="playAll" class="rh-play">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-playfill"></use>
            </svg>
            播放
          </div>
        </div>
        <div class="result-list">
          <div @click="changePlay(index)" v-for="(song, index) in data.searchSongs" class="row">
            <div class="row-left">
              <div class="info-name">{{ song.name }}</div>
              <div class="info-tag">
                <div v-if="song.fee === 1" class="tag-vip">VIP</div>
                <!-- <div class="tag-try">试听</div>
                <div class="tag-source">原唱</div>
                <div class="tag-sq">SQ</div> -->
                <div class="auther">{{ song.artists[0].name + '  -  ' + song.album.name }}</div>
              </div>
            </div>
            <div @click.stop="addSong(index)" class="row-right">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tianjia"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import searchApi from '@/api/search.js';
import store from '../store';
import { Toast } from 'vant';

const state = useStore();
const data = reactive({
  tagAry: [],
  showSearch: true,
  searchSongs: null,
  searchDef: '',
  playList: computed(() => state.state.playList),
});
const searchVal = ref('');
async function onSearch() {
  console.log(11);
  let searchKey = searchVal.value.trim();
  let tgAry = data.tagAry;
  if (searchKey === '') {
    searchKey = data.searchDef;
  }
  let res = await searchApi.reqSearchSong(searchKey);
  if (res.code === 200) {
    data.searchSongs = res.result.songs;
  } else {
    return;
  }
  // 添加以及去重!结束处理前不显示
  tgAry.push(searchKey);
  tgAry = [...new Set(tgAry)];
  if (tgAry.length > 10) {
    tgAry = tgAry.slice(1, 11);
  }
  data.tagAry = tgAry;
  // 添加本地存储
  localStorage.setItem('searchHistory', JSON.stringify(tgAry));
}
function clearAllTag() {
  data.tagAry = new Array();
  localStorage.removeItem('searchHistory');
}
function closeTag(index) {
  // data.searchKey =  data.searchKey.filter(v,i => i!==index)
  data.tagAry.splice(index, 1);
  localStorage.setItem('searchHistory', JSON.stringify(data.tagAry));
}
function addSong(index) {
  let song = data.searchSongs[index];
  if (!data.playList.every((v) => v.id !== song.id) && data.playList[0].id !== 0) {
    Toast('已存在歌单了哦！');
    return;
  }
  song.al = song.album;
  song.al.picUrl = song.album.artist.img1v1Url;
  song.ar = song.artists;
  store.commit('setAddSearSong', song);
}
function changePlay(index) {
  playAll(index);
}
function playAll(index = 0) {
  if (data.searchSongs !== null) {
    data.searchSongs.forEach((song) => {
      song.al = song.album;
      song.al.picUrl = song.album.artist.img1v1Url;
      song.ar = song.artists;
    });
    state.commit('setDelAllList');
    state.commit('setPlayList', data.searchSongs);
    state.commit('setPlayIndex', index);
    state.commit('setIsPlay', false);
  }
}
onMounted(async () => {
  let res = await searchApi.reqDefaultKeyWord();
  if (res.code === 200) {
    data.searchDef = res.data.realkeyword;
  }
  let localHistory = localStorage.getItem('searchHistory');
  if (localHistory !== null) {
    data.tagAry = JSON.parse(localHistory);
    console.log({ localHistory });
  }
});
</script>
<style lang="less" scoped>
.search-container {
  .sc-box {
    padding: 0 0.2rem;
    .sc-history {
      height: 1.5rem;
      overflow: hidden;
      display: flex;
      align-items: flex-start;
      .sch-left {
        width: 90%;
        height: 100%;
        overflow: hidden;
        display: flex;
        & > div:nth-child(2) {
          width: 90%;
          & > span {
            margin: 0 0.1rem;
          }
        }
      }
      .sch-right {
        height: 0.5rem;
      }
    }
    .search-result {
      color: #fff;
      border-radius: 0.33rem;
      background-color: #999;
      padding: 0.2rem;
      margin-bottom: 1rem;
      .result-head {
        height: 0.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.02rem solid #fff;
        padding-bottom: 0.2rem;
        .icon {
          width: 0.3rem;
          height: 0.3rem;
          vertical-align: -0.03rem;
        }
        .rh-play {
          border: 0.02rem solid #fff;
          border-radius: 0.5rem;
          padding: 0.05rem 0.2rem;
          padding-top: 0.03rem;
        }
      }
      .result-list {
        .row {
          border-bottom: 0.02rem solid #fff;
          height: 1.3rem;
          padding: 0.15rem 0;
          display: flex;
          justify-content: space-between;
          .row-left {
            display: flex;
            flex-direction: column;
            .info-tag {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              .auther {
                padding-top: 0.1rem;
                font-size: 0.24rem;
              }
              .tag-vip {
                border-color: orange;
                color: orange;
              }
              .tag-try,
              .tag-sq {
                border-color: red;
                color: red;
              }
              .tag-source {
                border-color: red;
                background: red;
                color: #fff;
              }
            }
            div[class^='tag'] {
              height: 0.4rem;
              line-height: 0.38rem;
              text-align: center;
              width: 0.7rem;
              font-size: 0.2rem;
              transform: scale(0.9);
              -webkit-transform: scale(0.9);
              border: 0.02rem solid #fff;
              border-radius: 0.1rem;
              margin-top: 0.15rem;
            }
          }
        }
      }
    }
  }
}
</style>

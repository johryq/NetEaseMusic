<template>
  <div class="search-container">
    <div class="sc-head">
      <div class="search-box">
        <form action="/">
          <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch">
            <template #left>
              <div @click="onClickButton">
                <svg class="icon" aria-hidden="true" @click="$router.push('/')">
                  <use xlink:href="#icon-direction-left"></use>
                </svg>
              </div>
            </template>
            <template #action>
              <div @click="onClickButton">搜索</div>
            </template>
          </van-search>
        </form>
      </div>
    </div>
    <div class="sc-box">
      <div class="sc-history">
        <div class="sch-left">
          历史
          <van-tag :show="true" round color="#999" closeable size="medium" type="primary" @close="close">标签</van-tag>
        </div>
        <div class="sch-right">
          <van-button type="primary" round color="#999" size="mini">clearall</van-button>
        </div>
      </div>
      <div class="search-result">
        <div class="result-head">
          <h4>单曲</h4>
          <div class="rh-play">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-playfill"></use>
            </svg>
            播放
          </div>
        </div>
        <div class="result-list">
          <div class="row">
            <div class="row-left">
              <div class="info-name">name</div>
              <div class="info-tag">
                <div class="tag-vip">VIP</div>
                <div class="tag-try">试听</div>
                <div class="tag-source">原唱</div>
                <div class="tag-sq">SQ</div>
                <div class="auther">auther</div>
              </div>
            </div>
            <div class="row-right">
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
import { ref } from 'vue';
const value = ref('');
function onSearch() {}
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
      }
      .sch-right {
        height: 0.5rem;
      }
    }
    .search-result {
      color: #fff;
      height: 10rem;
      border-radius: 0.33rem;
      background-color: #999;
      padding: 0.2rem;
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
              justify-content: center;
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
            }
          }
        }
      }
    }
  }
}
</style>

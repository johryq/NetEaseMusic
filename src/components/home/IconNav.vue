<template>
  <div class="icon-nav">
    <ul>
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-meirituijian"></use>
        </svg>
        <span>每日推荐</span>
      </li>
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-a-tupianyihuifu-15"></use>
        </svg>
        <span>私人FM</span>
      </li>
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gedan"></use>
        </svg>
        <span>歌单</span>
      </li>
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-paihangbang"></use>
        </svg>
        <span>排行榜</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.icon-nav {
  width: 100%;
  height: 2rem;
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 0.2rem;
      svg {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
</style>

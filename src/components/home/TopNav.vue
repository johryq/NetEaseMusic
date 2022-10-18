<template>
  <div class="top-nav">
    <div class="top-left">
      <a href="javascript:;">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-menu"></use>
        </svg>
      </a>
    </div>
    <div class="top-con">
      <ul>
        <li><a href="javascript:;">我的</a></li>
        <li><a href="javascript:;">发现</a></li>
        <li><a href="javascript:;">云村</a></li>
        <li><a href="javascript:;">视频</a></li>
      </ul>
    </div>
    <div class="top-right">
      <a href="javascript:;">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-search"></use>
        </svg>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  setup() {
    const images = [];
    return { images };
  },
};
</script>
<style lang="less" scoped>
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.8rem;
  width: 100%;
  background: #fff;
  .top-con {
    width: 70%;
    height: 100%;
    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 100%;
      li {
        width: 1rem;
      }
    }
  }
  .top-left,
  .top-right {
    width: 1rem;
    text-align: center;
    padding: 0 0.1rem;
  }
}
</style>

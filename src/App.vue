<template>
  <div id="app">
    <RouterView></RouterView>
    <FooterPlay></FooterPlay>
    <van-popup v-model:show="detailShow" position="bottom" :style="{ width: '100%', height: '100%' }">
      <MusicDetail></MusicDetail>
    </van-popup>
  </div>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import MusicDetail from '@/components/item/MusicDetail.vue';
import FooterPlay from '@/components/play/FooterPlay.vue';

export default {
  components: { FooterPlay, MusicDetail },
  setup() {
    const store = useStore();
    return { detailShow: computed(() => store.state.detailPageShow) };
  },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
input {
  outline: none;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #333;
}
.show-1row-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-clamp: 1;
}
.show-2row-text {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.icon {
  width: 1.7em;
  height: 1.7em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.clear-both::after,
.clear-both::before {
  display: table;
  content: '';
}

.clear-both::after {
  clear: both;
}
body {
  min-width: 320px;
}
</style>

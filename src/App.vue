<template>
  <div id="app">
    <RouterView></RouterView>
    <FooterPlay></FooterPlay>
  </div>
</template>
<script>
import FooterPlay from '@/components/play/FooterPlay.vue';
export default {
  components: { FooterPlay },
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

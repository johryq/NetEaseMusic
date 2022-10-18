<template>
  <div class="swipe">
    <van-swipe :autoplay="0" lazy-render>
      <van-swipe-item v-for="(image, index) in data.images" :key="index">
        <img :src="image.imageUrl ? image.imageUrl : image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import { reactive, onMounted } from 'vue';
import homeApi from '@/api/home.js';

export default {
  setup() {
    const data = reactive({
      images: ['https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg', 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg'],
    });
    onMounted(async () => {
      let res = homeApi.reqBanner();
      if (res !== null) {
        await res.then((val) => {
          data.images = val;
        });
      }
    });
    return { data };
  },
};
</script>
<style lang="less" scoped>
.van-swipe {
  width: 100%;
  height: 3rem;
  .van-swipe-item {
    padding: 0 0.1rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 0.2rem;
    }
  }
}
</style>

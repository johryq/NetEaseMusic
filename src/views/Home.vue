<template>
  <div class="home">
    Home
    <van-button @click="getBanner" type="primary">主要按钮</van-button>
  </div>
</template>

<script>
// @ is an alias to /src
import homeApi from "@/api/home.js";

export default {
  name: "Home",
  components: {},
  methods: {
    getBanner() {
      let res = homeApi.reqBanner();
      res.then((val) => {
        console.log(val);
      });
    },
  },
};
</script>

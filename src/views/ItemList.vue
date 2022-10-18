<template>
  <div class="item-list">
    <ItemMusicTop :playlist="data.playList"></ItemMusicTop>
    <ItemMusic :detaillist="data.detailList" :trackcount="data.playList.trackCount" :subscribedcount="data.playList.subscribedCount"></ItemMusic>
  </div>
</template>
<script>
import ItemTop from '../components/item/ItemTop.vue';
import ItemMusicTop from '../components/item/ItemMusicTop.vue';
import ItemMusic from '../components/item/ItemMusic.vue';
import { useRoute } from 'vue-router';
import { reactive, onMounted } from 'vue';
import itemApi from '@/api/item.js';

export default {
  components: { ItemTop, ItemMusicTop, ItemMusic },
  setup() {
    const data = reactive({
      playList: {},
      detailList: {},
    });
    onMounted(async () => {
      let itemId = useRoute().query.id;
      // 歌单信息
      let res = await itemApi.reqItemList(itemId);
      if (res !== null) {
        data.playList = res.data.playlist;
      }
      sessionStorage.setItem('itemDetail', JSON.stringify(data));
      // 详细歌单
      let res2 = await itemApi.reqItemDetailList(itemId);
      if (res2 !== null) {
        data.detailList = res2.data;
      }
    });
    return { data };
  },
};
</script>
<style lang="less" scoped></style>

<template>
  <div class="home">
    <TopNav></TopNav>
    <Swipe></Swipe>
    <IconNav></IconNav>
    <FindPlayList></FindPlayList>
  </div>
</template>

<script>
// @ is an alias to /src
import homeApi from '@/api/home.js';
import Swipe from '@/components/home/Swipe';
import TopNav from '@/components/home/TopNav';
import IconNav from '@/components/home/IconNav';
import FindPlayList from '@/components/home/FindPlayList';

export default {
  name: 'Home',
  components: {
    Swipe,
    TopNav,
    IconNav,
    FindPlayList,
  },
  methods: {},
};
</script>

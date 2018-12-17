<template>
  <div class="home">
    <img alt="" src="../img/my.jpg">
    <HelloWorld msg="欢迎使用"/>
    <Table/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; 

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>

<template>
  <div class="home">
    asd11111
    <img alt="Vue logo" src="../img/my.jpg">
    <HelloWorld msg="niub2122"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>

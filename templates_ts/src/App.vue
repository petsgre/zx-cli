<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class App extends Vue {}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  display: flex;
  background-color: red;
}
</style>

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script lang="ts">
import _ from 'lodash';
// var _ = require('lodash');
// console.log(lodash);
const a = _.chunk(['a', 'b', 'c', 'd'], 2);
console.log(process.env.API_ROOT);

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

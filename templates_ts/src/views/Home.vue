<template>
  <div class="home">
    asd11111
    <img alt="Vue logo" src="../img/my.jpg">
    <HelloWorld msg="niub2122"/>
    <Table/>
  </div>
</template>

<script lang="ts">
import lodash from 'lodash';
import $ from 'jquery';
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
console.log($('body'));
var p = new Promise(function(reslove,reject){
  setTimeout(function(){
    reslove(123)
  },1000)
})
p.then((data)=>{
  console.log(data);
  
})
// const lodash = require('lodash');
@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>

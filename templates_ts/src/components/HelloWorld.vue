<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1 @click='say()'>{{ my }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class HelloWorld extends Vue {
  public my?: string = 'asd';
  @Prop()
  private msg!: number;
  public mounted() {
    // console.log(123);
  }
  public say() {
    console.log('say hei');
  }
  public agree() {
    // console.log(123);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

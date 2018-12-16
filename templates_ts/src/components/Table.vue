<template>
  <div class="123">
    <div class>
      <!-- {{daa}} -->
    </div>
    <!-- <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table> -->
  </div>
</template>

<script lang="ts">
// import aaa,{my} from './module.js'
// var axx = require('./module.js')
// console.log('***********')
// console.log(axx)
// // import axios from 'axios'

// function run (callback) {
//   console.log('自己执行了')
//   callback()
//   console.log('cakkback执行了')
// }
// run(function (a, b) {
//   console.log(a, b)
// })
export default {
  data() {
    return {
      tableData: [
        {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
    };
  },
  computed: {
    // daa () {
    //   return this.$store.state.userInfo.name
    // }
  },
  mounted() {
    // console.log(axios)
    const root = process.env.API_ROOT;
    console.log('***********1');
    console.log(root);
  },
};
</script>

<template>
  <div class="home">
    <div class="home_title1">
      <h2>用户信息</h2>
    </div>
    <div class="home_title2">
      <h2>添加用户</h2>
    </div>
    <div>
      <table class="user_table">
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',

}
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  //background-color: #42b983;
  position: absolute;
  box-shadow: 0 0 10px #ddd;
}

.home_title2 {
  width: 200px;
  height: 70px;
  background-color: #3662ed;
  position: absolute;
  left: 10%;
}

.home_title1 {
  width: 200px;
  height: 70px;
  background-color: #3662ad;
  position: absolute;
}
.user_table{
  width: 1000px;
  height: 600px;
  background-color: darkgrey;
  top: 100px;
  left: 300px;
}
</style>

<template>
  <div id="login_photo">
    <div class="login_box">
      <div class="avatat_box">
        <img src="../assets/image/zenglong.jpg">
      </div>
      <!--登录表单区-->
      <el-form :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_from" ref="loginFormRef">
        <!--用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-yonghu"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-chakan" type="password"></el-input>
        </el-form-item>
        <!--按钮区域-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      //这是登录表单的数据绑定对象
      loginForm: {
        username: 'zhangsan',
        password: 'admin123'
      },
      //表单验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        username: [
          {required: true, message: '请输入登录名称', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在2-10个字符', trigger: "blur"}
        ],
        //验证密码是否合法
        password: [
          {required: true, message: '请输入登录密码', trigger: 'blur'},
          {min: 5, max: 15, message: '长度在5-15个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    //点击重置按钮，重置登录按钮
    resetLoginForm() {
      console.log(this);
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return;
        console.log(this.loginForm)
        const {data: res} = await this.$http.post('/login', this.$qs.stringify(this.loginForm));
        if (res.code != 200) {
          alert(res.message);
          return console.log("登录失败");
        }
        console.log(res.message);
        alert(res.message)
        this.$router.push({name: 'user'})
      })
    }
  }

}
</script>

<style lang="less" scoped>
/**
设置登录背景图片
*/
#login_photo {
  background: url("../assets/image/2035154.jpg");
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
}

/**
  登录框
*/
.login_box {
  width: 400px;
  height: 500px;
  background-color: #fff; //颜色
  border-radius: 25px; //圆框
  position: absolute;
  opacity: 0.9; //北京透明度
  left: 50%; //左50
  //top: 50%; //右50
  transform: translate(-50%, +50%); //上下偏移量50%
}

.avatat_box {
  height: 130px;
  width: 130px;
  border: 0px solid #eee;
  border-radius: 70%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 35%;
  top: 10%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eeeeee;
  }
}

.login_from {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 40px; //距离边框
  box-sizing: border-box; //超出部分自动对齐
  top: 47%;

}

</style>
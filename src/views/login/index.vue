<script src="../../store/modules/user.js"></script>
<script src="../../../mock/user.js"></script>
<script src="../../../mock/utils.js"></script>
<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="pwdlogin?loginForm:loginCodeForm" :rules="pwdlogin?loginRules:loginCodeRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">管理登陆</h3>
      </div>

      <div v-show="pwdlogin" class="pwdlogin">
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="用户名"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="密码"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登 陆</el-button>
      </div>

      <!--      验证码登陆-->
      <div v-show="!pwdlogin" class="codelogin">
        <el-form-item prop="phone">
          <span class="svg-container">
            <svg-icon icon-class="phone" />
          </span>
          <el-input
            ref="phone"
            v-model="loginCodeForm.phone"
            placeholder="手机号"
            name="phone"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="code">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              ref="code"
              v-model="loginCodeForm.code"
              placeholder="验证码"
              name="code"
              tabindex="2"
              autocomplete="on"
              @keyup.enter.native="handleCodeLogin"
            >
              <div class="btn" slot="suffix"><el-button type="primary" @click="sendCode">{{codeMsg}}</el-button></div>

            </el-input>


          </el-form-item>
        </el-tooltip>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleCodeLogin">登 陆</el-button>
      </div>

      <div style="position:relative">
        <!--        <div class="tips">-->
        <!--          <span>Username : admin</span>-->
        <!--          <span>Password : any</span>-->
        <!--        </div>-->
        <!--        <div class="tips">-->
        <!--          <span style="margin-right:18px;">Username : editor</span>-->
        <!--          <span>Password : any</span>-->
        <!--        </div>-->

        <!--        <el-button class="thirdparty-button" type="primary" @click="showDialog=true">-->
        <!--          Or connect with-->
        <!--        </el-button>-->
      </div>
      <div class="gotoreg" style="position:relative;color: white;text-align: right">
        <a v-show="pwdlogin" @click="pwdlogin=false">手机验证码登陆</a>
        <a v-show="!pwdlogin" @click="pwdlogin=true">密码登陆</a>
        <span style="margin:0 10px">|</span>
        <router-link :to="{path:'/register'}"> 注册</router-link>
      </div>
    </el-form>

    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
    <div class="botText" style="position: absolute;bottom: 8px;display: flex;width: 100%;justify-content: center;font-size: 16px;color: #e6e6e6"><a href="https://beian.miit.gov.cn/" target="_blank">渝ICP备2020012345号-1</a></div>

  </div>
</template>

<script>
import { validUsername,validPhone,validVeriCode } from '@/utils/validate'
import SocialSign from './components/SocialSignin'
import {register, codelogin, codeGet} from "@/api/user";

export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('用户名格式错误'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (!validVeriCode(value)) {
        callback(new Error('验证码格式错误'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('密码必须大于3位'))
      } else {
        callback()
      }
    }
    return {
      pwdlogin:true,
      loginForm: {
        username: '',
        password: ''
      },
      loginCodeForm: {
        phone: '',
        code: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
      },
      loginCodeRules:{
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
       // code: [{ required: true, trigger: 'blur', validator: validateCode }],
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      countdown:30,
      //按钮上的文字
      codeMsg:'获取验证码',
      //定时器
      timer:null,
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    //倒计时
    setTime(){
      let _this = this;
      this.timer = setInterval(() => {
        if (_this.countdown > 0 && _this.countdown <= 30) {
          _this.countdown--;
          if (_this.countdown !== 0) {
            _this.codeMsg = "重新发送(" + _this.countdown + ")";
          } else {
            clearInterval(_this.timer);
            _this.codeMsg = "获取验证码";
            _this.countdown = 30;
            _this.timer = null;
          }
        }
      }, 1000)
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCodeLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/codelogin', this.loginCodeForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    sendCode(){
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          codeGet(this.loginCodeForm)
            .then(() => {
              this.$notify({
                title: '提示',
                message: '发送成功',
                type: 'success',
                duration: 2000
              })
              this.setTime()
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        }  else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;
.el-input__suffix{
  display: flex!important;
  align-items: center!important;
}
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>

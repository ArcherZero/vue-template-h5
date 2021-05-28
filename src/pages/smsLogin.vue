<template>
  <div class="login">
    <p class="hi">嗨！您好！</p>
    <p class="welcome">欢迎回来，请登录！</p>

    <div class="input-wrap">
      <van-field
        v-model="tel"
        label-width="45"
        left-icon="i iconfont iconshouji"
        type="tel"
        label="手机号"
      />
      <van-field
        v-model="sms"
        center
        clearable
        left-icon="i iconfont iconmima-01"
        label-width="45"
        label="验证码"
        placeholder="请输入验证码"
      >
        <template #button>
          <van-button
            class="sms"
            size="small"
            type="info"
            plain
            hairline
            round
            color="#999"
            :disabled="time !== 60"
            @click="sendSms"
          >
            {{ text }}
          </van-button>
        </template>
      </van-field>
    </div>
    <div class="login-wrap">
      <van-button
        class="login-btn"
        type="primary"
        block
        color="linear-gradient(90deg, #71D8FF 0%, #3F9EFF 100%)"
        @click="login"
      >
        <span class="mr-20">登</span>陆
      </van-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import * as CommonAction from '@/api/common'

export default {
  data () {
    return {
      tel: '',
      sms: '',
      time: 60,
      sending: false
    }
  },
  computed: {
    ...mapGetters(['mobilePath']),
    text () {
      return this.time === 60 ? '发送验证码' : `${this.time}秒后再次发送`
    }
  },
  methods: {
    ...mapMutations(['clearMobilePath', 'setMobileToken']),
    async sendSms () {
      if (!this.tel) return this.$toast('请输入手机号')
      const result = /^1[0-9]{10}$/.test(this.tel)
      if (!result) return this.$toast('请输入正确的手机号')
      if (this.sending) return
      this.sending = true
      const res = await CommonAction.sms({ phone: this.tel })
      this.sending = false
      if (!res) return
      this.time -= 1
      const timer = setInterval(() => {
        this.time -= 1
        if (this.time === 0) {
          clearInterval(timer)
          this.time = 60
        }
      }, 1000)
    },
    async login () {
      if (!this.tel) return this.$toast('请输入手机号')
      const result = /^1[0-9]{10}$/.test(this.tel)
      if (!result) return this.$toast('请输入正确的手机号')
      if (!this.sms) return this.$toast('请输入验证码')
      const param = {
        deviceId: this.tel,
        validCode: this.sms
      }
      const res = await CommonAction.token(param)
      if (res) {
        this.setMobileToken(res)
        this.loginSuccess()
      }
    },
    loginSuccess () {
      const path = this.mobilePath
      if (path) {
        this.$router.replace(path)
        this.clearMobilePath()
      } else {
        this.$router.back()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  padding-top: 100px;
  // background-image: url('../../assets/img/mobile/loginBg.png');
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 100% auto;

  .hi {
    font-size: 60px;
    font-weight: 800;
    color: #373366;
    text-align: center;
  }

  .welcome {
    margin-top: 30px;
    font-size: 36px;
    font-weight: 500;
    color: #92a4b0;
    text-align: center;
  }

  .input-wrap {
    width: 100%;
    padding: 0 60px;
    margin-top: 120px;
  }

  .sms {
    padding: 0 20px;
  }

  .login-wrap {
    padding: 0 60px;
    margin-top: 50px;

    .login-btn {
      font-size: 36px;
    }
  }
}
</style>

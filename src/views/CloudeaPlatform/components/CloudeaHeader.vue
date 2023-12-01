<script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { getImageUrl } from '@/utils/getAssetFile'

  const props = defineProps({
    isIndex: {
      type: Boolean,
      default: false
    }
  })

  const headerType = props.isIndex
    ? ref('cloduea-header__bar')
    : ref('cloduea-header__bar header-fix-block')

  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }

  // header Dom
  const headerBar = ref()

  // 导航栏固定
  const windowScroll = () => {
    // 获取滚动高度
    let scrollTop =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

    // 根据滚动高度 添加/删除 类名
    if (scrollTop >= 40) {
      headerBar.value.classList.add('header-fix')
    } else {
      headerBar.value.classList.remove('header-fix')
    }
  }

  // 登录遮罩相关
  const loginMaskVisible = ref(false)
  const openLoginMask = () => {
    loginMaskVisible.value = true
  }
  const closeLoginMask = () => {
    loginMaskVisible.value = false
  }
  const loginMaskCloseButton = ref(getImageUrl('close.svg'))
  const loginType = ref(true)

  const loginUsername = ref(null)
  const loginUserPwd = ref(null)
  const pwdVisible = ref(false)
  const checkLoginValue = () => {
    return loginUsername.value && loginUserPwd.value
  }

  const loginEmail = ref()
  const loginEmailVerCode = ref()

  const handleRegister = () => {
    console.log(loginUsername.value, loginUserPwd.value)
    console.log(checkLoginValue())
  }
  const handleLoginByPwd = () => {}

  onMounted(() => {
    if (props.isIndex) {
      window.addEventListener('scroll', windowScroll)
    }
  })
  onBeforeUnmount(() => {
    if (props.isIndex) {
      window.removeEventListener('scroll', windowScroll)
    }
  })
</script>

<template>
  <div class="cloudea-header" ref="mainwidth">
    <div :class="headerType" ref="headerBar">
      <el-menu
        class="cloudea-menu"
        router
        mode="horizontal"
        :ellipsis="false"
        :collapse="false"
        background-color="#545c64"
        text-color="#fff"
        popper-effect="dark"
        active-text-color="#ffd04b"
        @select="handleSelect"
      >
        <el-menu-item index="/">
          <div class="title">
            <el-icon size="18px"><Bowl /></el-icon>
            <span>首页</span>
          </div>
        </el-menu-item>
        <el-menu-item index="/Forum/">论坛</el-menu-item>
        <el-menu-item index="/Tool/">工具箱</el-menu-item>
        <el-sub-menu>
          <template #title>其他</template>
          <el-menu-item index="/BookShelf/">书架</el-menu-item>
        </el-sub-menu>
        <div class="flex-grow"></div>
        <el-sub-menu class="menu-avatar" index="user">
          <template #title>
            <el-avatar :size="40" :src="getImageUrl('avatar.png')" />
          </template>
          <el-menu-item index="user">个人中心</el-menu-item>
          <el-menu-item index="user">退出登录</el-menu-item>
        </el-sub-menu>
        <el-menu-item @click="openLoginMask">
          <el-avatar :size="40" :src="getImageUrl('avatar.png')" />
          未登录
        </el-menu-item>
      </el-menu>
    </div>
    <div class="cloudea-mini-mask" v-show="loginMaskVisible">
      <div class="cloudea-mini-content-wp">
        <div
          class="cloudea-mini-close-icon"
          @click="closeLoginMask"
          :style="`background:url(${loginMaskCloseButton})`"
        ></div>
        <div class="cloudea-mini-login-right-wp">
          <div class="login-tab-wp">
            <div
              :class="`login-tab-item ${loginType ? 'active-tab' : null}`"
              @click="loginType = true"
            >
              密码登录
            </div>
            <div class="login-tab-line"></div>
            <div
              :class="`login-tab-item ${loginType ? null : 'active-tab'}`"
              @click="loginType = false"
            >
              邮箱登录
            </div>
          </div>
          <!-- 密码登录 -->
          <div class="login-pwd-wp" v-if="loginType">
            <form class="tab__form">
              <div class="form__item">
                <div class="form_info">账号</div>
                <input
                  autocomplete="on"
                  maxlength="32"
                  oninput="value=value.replace(/\s+/g, '')"
                  placeholder="请输入账号"
                  type="text"
                  v-model="loginUsername"
                />
              </div>
              <div class="form__separator-line"></div>
              <div class="form__item">
                <div class="form_info">密码</div>
                <input
                  autocomplete="on"
                  maxlength="32"
                  oninput="value=value.replace(/\s+/g, '')"
                  placeholder="请输入密码"
                  type="password"
                  v-model="loginUserPwd"
                />
                <div
                  class="eye-btn"
                  style="--thememini-color: #00a1d6"
                  @click="pwdVisible = !pwdVisible"
                >
                  <svg
                    data-v-1932284b=""
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    v-if="pwdVisible"
                  >
                    <path
                      data-v-1932284b=""
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.11069 9.43732C3.21647 7.77542 5.87904 4.58331 9.89458 4.58331C13.8801 4.58331 16.6483 7.72502 17.8345 9.4049C18.0905 9.76747 18.0905 10.2325 17.8345 10.5951C16.6483 12.2749 13.8801 15.4166 9.89458 15.4166C5.87904 15.4166 3.21647 12.2245 2.11069 10.5626C1.88009 10.2161 1.88009 9.7839 2.11069 9.43732ZM9.89458 3.33331C5.19832 3.33331 2.20919 7.03277 1.07001 8.74489C0.560324 9.51091 0.560323 10.4891 1.07001 11.2551C2.20919 12.9672 5.19832 16.6666 9.89458 16.6666C14.5412 16.6666 17.6368 13.0422 18.8556 11.3161C19.4168 10.5213 19.4168 9.4787 18.8556 8.68391C17.6368 6.95774 14.5412 3.33331 9.89458 3.33331ZM7.29165 9.99998C7.29165 8.50421 8.50421 7.29165 9.99998 7.29165C11.4958 7.29165 12.7083 8.50421 12.7083 9.99998C12.7083 11.4958 11.4958 12.7083 9.99998 12.7083C8.50421 12.7083 7.29165 11.4958 7.29165 9.99998ZM9.99998 6.04165C7.81385 6.04165 6.04165 7.81385 6.04165 9.99998C6.04165 12.1861 7.81385 13.9583 9.99998 13.9583C12.1861 13.9583 13.9583 12.1861 13.9583 9.99998C13.9583 7.81385 12.1861 6.04165 9.99998 6.04165Z"
                      fill="#9499A0"
                    ></path>
                  </svg>
                  <svg
                    data-v-1932284b=""
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    v-else
                  >
                    <path
                      data-v-1932284b=""
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.5753 6.85456C17.7122 6.71896 17.8939 6.63806 18.0866 6.63806C18.7321 6.63806 19.0436 7.42626 18.5748 7.87006C18.1144 8.30554 17.457 8.69885 16.6478 9.03168L18.1457 10.5296C18.2101 10.5941 18.2613 10.6706 18.2962 10.7548C18.331 10.839 18.349 10.9293 18.349 11.0204C18.349 11.1116 18.331 11.2019 18.2962 11.2861C18.2613 11.3703 18.2101 11.4468 18.1457 11.5113C18.0812 11.5757 18.0047 11.6269 17.9205 11.6618C17.8363 11.6967 17.746 11.7146 17.6548 11.7146C17.5637 11.7146 17.4734 11.6967 17.3892 11.6618C17.305 11.6269 17.2284 11.5757 17.164 11.5113L15.3409 9.68819C15.2898 9.63708 15.247 9.57838 15.2141 9.51428C14.4874 9.71293 13.6876 9.87122 12.8344 9.98119C12.8363 9.99011 12.8381 9.99908 12.8397 10.0081L13.2874 12.5472C13.315 12.7266 13.2713 12.9098 13.1656 13.0573C13.0598 13.2049 12.9005 13.3052 12.7217 13.3367C12.5429 13.3683 12.3589 13.3285 12.2091 13.2259C12.0592 13.1234 11.9555 12.9663 11.9202 12.7882L11.4725 10.2491C11.4645 10.2039 11.4611 10.1581 11.4621 10.1125C10.9858 10.1428 10.4976 10.1586 10.0002 10.1586C9.57059 10.1586 9.14778 10.1468 8.73362 10.1241C8.73477 10.1656 8.7322 10.2074 8.72578 10.249L8.27808 12.7881C8.24612 12.9694 8.14345 13.1306 7.99265 13.2362C7.84186 13.3418 7.65528 13.3831 7.47398 13.3512C7.29268 13.3192 7.1315 13.2166 7.0259 13.0658C6.9203 12.915 6.87892 12.7284 6.91088 12.5471L7.35858 10.008C7.35877 10.007 7.35896 10.0061 7.35915 10.0052C6.50085 9.90284 5.6941 9.75191 4.95838 9.56025C4.93012 9.60634 4.89634 9.64933 4.85748 9.68819L3.03438 11.5113C2.96992 11.5757 2.8934 11.6269 2.80918 11.6618C2.72496 11.6967 2.63469 11.7146 2.54353 11.7146C2.45237 11.7146 2.36211 11.6967 2.27789 11.6618C2.19367 11.6269 2.11714 11.5757 2.05268 11.5113C1.98822 11.4468 1.93709 11.3703 1.90221 11.2861C1.86732 11.2019 1.84937 11.1116 1.84937 11.0204C1.84937 10.9293 1.86732 10.839 1.90221 10.7548C1.93709 10.6706 1.98822 10.5941 2.05268 10.5296L3.49373 9.08855C2.6197 8.744 1.91247 8.33062 1.42559 7.87006C0.956591 7.42636 1.26799 6.63816 1.91359 6.63816C2.10629 6.63816 2.28789 6.71896 2.42489 6.85456C2.70009 7.12696 3.19529 7.45886 3.98459 7.77796C5.54429 8.40856 7.73699 8.77016 10.0001 8.77016C12.2632 8.77016 14.4558 8.40856 16.0156 7.77796C16.8049 7.45886 17.3001 7.12696 17.5753 6.85456Z"
                      fill="#9499A0"
                    ></path>
                  </svg>
                </div>
                <div class="clickable">忘记密码？</div>
                <div class="forget-tip" style="display: none">
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKoAAABLCAMAAADXsOyXAAAAY1BMVEUAAAAODg4LCwsGBgYMDAwHBwcFBQUDAwP9/f3+/v7t7e2lpaV9fX309PT09PTExMSysrL6+vrx8fHLy8v19fXj4+Pt7e27u7ujo6P+/v7n5+f09PSVlZX+/v76+vre3t7////QvYHdAAAAIHRSTlMABQcJCw0QE+HviTIiloY/L9N3KqZsaCwb0nulG/GjOfvtLI4AAARmSURBVGje7ZnrcuIwDIVrg5PANrTQG7Dd1u//lBvrajMtjCAx/OC0zUw60+Eb6ViS1Ye77rrrrrvuGk3uwTl4yvvNKcEhI6AiobtBVCCEB4veb4k0sZSQXlEB1N1MZHNI7/HhfRnZKweX3aigICdPxb1iXDWtOaUENX9D0qvSuiyewMSawTcqkcJjwLyaC1yeeCeYg+CBT0VGXad0SfY9k84AtZAXudy3FeUQUkGBikI5xx95ohvYtfUDW1gUEBEONFut5iT2gpcCVtmxZFPPohjOibWPsWfW9FsKulj2oRotfBKFNKUXw4mUIcw/v+Kg188QiLW0LZDWQ9WYUuqZM8zD5y6Cdtv0VhgBSKuaQMtT6dGEFj66SOo+QpL4gA6Y4k4t7DveOSUFTAAlUmWdAyzw5i6oULOkR3k+94lhACU1QKqszxjX9KWurRlXIvUeQZMSZmiap0UstHhqmoZhQVxnK4RVZxO1KIAmvTOpsr41CRZIQ0DDsg0mZaWz6x0lHwSJB23iD9o0BDvHwNayAHJqfYLEMuky/qhlg8JjN7AK7YRjrCObpk+CjwzKWZKWrG0LqI2ULgCdDtWBpI1K6lFt28df1QMrwMrhwpFgGlYkdXTymZRBH1/jEf19bNkE6AGYC6aqrzLy4bBXgA6ku3hU68e2ZVpuXegCarGTTFI0QyWbMmj7p4sn1P0hVvAANa8p4urKaorJN5ASa1YKsj7Lq4IRi5Q0fayQBlJhpVIA0sblx7saOERN0pAqKTbT01o8ASvB5hMBWcCNSqqFn0Hbt5Ok2mThDzJWoB2zwOrVhJOfke6jQXuNqzQugwVspFillHQZTVoKK3VZnrdpqTDW1URtWpLaWUE4cGNcHWqUo6/Z15BCM7Wqz/zKrH5Gc9ZI2fdEyqjHmumJJlvCzpJ0C3fxhKLpV9J1PEtrYGXSIFUAddFtn1Ep++Fo4Tc2A7XrRQMBLUXl7OOd4xJSZdWzJSXrErsSqaafSRsiHYO1jKtDnbnsk4WUGvVoMzU0WUTluMqofY6KYUpjerSZGpqsHq0kXhZK37IPqNqk1Kj7OIL2yqqrF+cV1F6oeDGho/QyjqJlWQWSZPdmtGp5pJKphHRM1pB0MLg4GymjHhq1j6OpL5uWZ9RzDJA7FVHtzfT0TRYvWwSrM5bdqsVd6lQztTfZ0gIzx6yG/Bf3UzbqcxdHVvfMFpglqQfsKx9QACHpJKxSsOwd67BRzZV0AtYgBQthB0wjqp7/ADI0U2OTDaB8m3nOhkJu/UHWvOOzvtPBUtYHZ4lpQtU5pdnECbXh0qrDoIH1YEOxipNqxW61TlicfllQmEntrEBqX2E4UHb++zi5eihX1hVx0agG1O1XrKDXbTZeeWce/30i3cUqWm/zfdvAYPkXKuT/pYuV1L0AqaG1uqKt1iBVVg/5J1SLV6uRKmsWVuNC7ftfrKrFN8QVu4Bp+/NejVSbrOGfxc7J9m8Tr6ANt1ZL/lfxKlr92gH+A2phwRjU8Di5AAAAAElFTkSuQmCC"
                    alt=""
                    class="arrow"
                  />
                  <div class="forget-tip-line">
                    <p class="title">发送短信快速登录</p>
                    <p class="desc">未注册或绑定哔哩哔哩的手机号，将帮你注册新账号</p>
                  </div>
                  <div class="forget-tip-line">
                    <p class="title">去找回密码</p>
                    <p class="desc">通过绑定的手机号/邮箱重置密码</p>
                  </div>
                </div>
              </div>
            </form>
            <div class="dialog__mask" style="display: none">
              <div class="dialog__outline">
                <div class="dialog__body">
                  <div class="body__title">二次校验</div>
                  <div class="body__captcha-img_wp">
                    <div class="captcha-img__img"></div>
                    <div class="captcha-img__btn">换一张</div>
                  </div>
                  <input placeholder="输入图片中的内容" maxlength="5" class="body__captcha-input" />
                </div>
                <div class="dialog__footer">
                  <div>取消</div>
                  <div class="footer__submit_disabled">确定</div>
                </div>
              </div>
            </div>
            <div class="btn_wp">
              <div class="btn_other" @click="handleRegister">注册</div>
              <div class="btn_primary disabled" @click="handleLoginByPwd">登录</div>
            </div>
          </div>
          <!-- 邮箱登录 -->
          <div class="login-sms-wp" v-else>
            <form class="tab__form">
              <div class="form__item">
                <div class="login-sms-wp__cid">邮箱</div>
                <input
                  maxlength="15"
                  oninput="value=value.replace(/[^\d]/g, '')"
                  placeholder="请输入邮箱"
                  v-model="loginEmail"
                />
                <div class="login-sms-wp__vertical-line"></div>
                <div class="login-sms-send clickable disable">获取验证码</div>
              </div>
              <div class="form__separator-line"></div>
              <div class="form__item">
                <div>验证码</div>
                <input
                  placeholder="请输入验证码"
                  maxlength="6"
                  oninput="value=value.replace(/[^\d]/g, '')"
                  v-model="loginEmailVerCode"
                />
              </div>
            </form>
            <div data-v-327e145a="" class="btn_wp" style="justify-content: center">
              <!---->
              <div data-v-327e145a="" class="btn_primary">登录/注册</div>
            </div>
            <div class="dialog__mask" style="display: none">
              <div class="dialog__outline">
                <div class="dialog__body">
                  <div class="body__title">二次校验</div>
                  <div class="body__captcha-img_wp">
                    <div class="captcha-img__img"><!----></div>
                    <div class="captcha-img__btn">换一张</div>
                  </div>
                  <input placeholder="输入图片中的内容" maxlength="5" class="body__captcha-input" />
                </div>
                <div class="dialog__footer">
                  <div>取消</div>
                  <div class="footer__submit_disabled">确定</div>
                </div>
              </div>
            </div>
          </div>
          <div class="login-sns-wp">
            <div class="login-sns-title">其他方式登录</div>
            <div class="login-sns-content">
              <div class="login-sns-item">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAgVBMVEUAAABXu0BYt0BQt0BXu0BWu0BXu0BXu0BXu0BWukBWukBXvEBXu0BXvEBXvEBYukBVukBXu0BWt0BXukBXuEBXu0D////1+/Pq9+fV7s/A5rer3aBsw1jg89uBzHBiwEy14auL0Xug2ZOW1YeBzG93yGSW1YjL6sO14azL6cN2yGP3XpzOAAAAFXRSTlMA3yAQ78+/r5+AUI9w74BgYEBAkHDBb56KAAACF0lEQVRIx52W6XKDIBRGwT3GZmsRUXFP0vb9H7AKGS8aiCXnR0TCmU/gOoh0uJck8jEZwUGYXND/cOPggyz4CE//0HZgKeDIsdSA3Qs1Bk2XejLF7ckGe1fnOT7ZBDsaDxNiZ4Jna4Jnb7rgbeKrK7QnFuzBOxIrYrsJAth9iIdl/9CwLE0pv/elqfoegWpfXdAUYINW9GRkRIBWakBemiOVGRbpE1lpijwaPDANCxvCc8qBbcVF47vq5EQ1YjCK3nyXiXE3QqrpSseeu+jptc96XgWmHSGDEGtCmDHygpK5nUuRdr2MvvfNdMvzXCN+KVNk6RO0qOpr37fXJzFCwdzmT9532THZovmqFHxlF3/WcdWQGUsBI2g3K/G3WG3o4oEVsVqOK4RHaTpfaKkXCVsWzPTL65pPN7X4kxnEX6qIXS4mJqfOH5tVKSJWzJsiXqlcklxe5AI0yuL4RDUpiKkGphRrRFRK+lLk88AQSg4KXVC9TvwSRQ4MU5m1xZ2xlmnEm1LkrqeKTVbU5rcaNtJDCAWqCOutq90CpjiKMTFQZuuah/9Oo+h6ZtPkYTSxI0YKReWLtxFBpJ5bzjOasWYsoBp6HQSRW5R5tz4C4HS0PltjO/H05sH6iQDXtz0d3/94ANPes/9Asjd9572PwE8X6Tm+DPViZMQ5mLUDxGnVCFtqwDH0VlYQS22bcxIGIhn7UXLWWn+10s6FZo+4YQAAAABJRU5ErkJggg=="
                  class="login-sns-item-icon"
                /><span class="login-sns-name">微信登录</span>
              </div>
              <!-- <div class="login-sns-item">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAh1BMVEUAAADXQDjTQDzaQzfcRTfbRDfcRDbcQzbbRDbbRDfcQzbaQzbbRDbbRDbaRDfcQzbbRDfaQjjaQjXcQzfYRDfbRDTbRDf////gW1D99PPtoZvyubT76Ob20M3pioLdT0Tvrajkc2n20c3rlo7mfnb0xcD43NrrlY7kcmniZ1343driZ1z0xMEgvW1iAAAAFnRSTlMAIBDf34Dv78+/n1BAj7CvcGBgkHBwDUc+aAAAAmpJREFUSMeVlueCqjAQRgOI0qy7m0YVsN297/98OwEdCUQ05w8WDt/MkIjEhJv8RIFHAS/c/CTkM9w4XFKN5ebwgeaDNWURObYa4s+oMWrG1MOruDV9w9o1eU5A37JwDN6CUksTPWsTPXvTRe89wXBCa2rB+ukd6By3K6ca8WcNVoyxLB26i0ex/mxgzRTiMlx990A6C09PZ6XKwXbpIyP6Fn4C8zKONHVYFrJ4tJWfoUMJ5k2PPBi0igHZrX8j4HVLITPXB7udeK1gHem9ziJjouTwQYmnhCCuxh5UhSJO9qKmWwxrTcZeyh5UpcyFyOH0Bi5SaYNNyG7qYeK95CttWUWlJn6PW5RsSgVtlyqxoEhEQs1rNEPrldf5cI8Qb+hxYRKlaVsSY4NZKqU81aynpQY0kTNF3pS4fsDFvTESx4Gi0b4vMqWKdl4UcHWukmSeZXnRV9Gb5VgcDucIJ3B11JbckSmKyXAC7V7I52hxI2WmyYYk0m7+Dbd8JR7boTYlbshOE9WBsYb+MglBZ6r4p8TxXL+Hi7zov2dCnY1N8v7ViIS4z21V9q3U7Ap9YkzOulnrLAkZLtYTA4f+CpYLHEjFgCMdtwhiTBGedT+D/NwtIHU2V3li4tE9iO5qaILQwvF4LNUtTLsr8InnTX6Pebfq8qopmup/V29W0CkRIaNISDmxJwLqNeEYHwG8repzltVpA/Ua8UmP61ErPHy2xnbiniBflg9WxA0sCnXJAMezadDSRM/aRM/eDMCb4n7Z/glE9rOhq5i8xPFfaz7GmdXIs9aw4O1qZIUxam9IdtuwS/aCaJcYrT+uh9kYccQkXQAAAABJRU5ErkJggg=="
                  class="login-sns-item-icon"
                /><span class="login-sns-name">微博登录</span>
              </div> -->
              <div class="login-sns-item">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAb1BMVEUAAABMouVIn+NEn99MouVMouVMo+ZMouVKouRKouJMn+NMouZLouRLo+VMoeNMouZLoeVLoeVNn+RMouX///+83Pal0PL0+v6x1vRireiay/FXqOfS6Pl5uevH4vePxe+Ev+1utOrp9Pzp8/yEv+7XzqLPAAAAE3RSTlMA3yAQ74C/n2BQQK9wz5CPz7BwJ8NfpgAAAbNJREFUSMe1lutygjAQhTeEOyi2AQIC3t//GcvYqk3OYsh0+v1yMN+czc4mQBwyL5ONUDMiLsqc1iGzOFQGYZGu0KLZQkQSrNSQ6I2aGRqkpktxlXJQSc4LNsqJCBhPOCQwwXOa6PmbErxlNpJeVMqD6uWliqOfprPiyN5tcOp0PaObntnmo9hIAV39pFNA9BOogKb+RQN/h9+RCfzR1gbtQqSArtQmemAjUy4QI7GxBTy92qKGJfEshlgp0DO15srmhuIRFuX0Cc/2KO5hUUkF1xt3dxKKuUS3uCPBjA0w4rySwqYyDLCM+EqxVrd45UTtFm81ywlEuzkHXhyhOfY1DArfntg+jRMY/PB80CeODaLhHigpt7fYNSgeuvpgD7k0j9V4Gfbc6RjN7oRE1rCeejVo27vMD4/WFokynB33qUpnUYb+t5zg7+OhNYrVxx5PIzGRJ9ijniwxIC7y3DV3urZ9/DrDfQxvR793a+YnpvRk6+Nt6YXceRQq//rxgKb/h87/fVrtAmKQW2c/JfGkb0PDjBYJomUtMuJQTcRKDUmL0LLiDDWevCzie7LYJGXOWl/BnLhvbq/sWgAAAABJRU5ErkJggg=="
                  class="login-sns-item-icon"
                /><span class="login-sns-name">QQ登录</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import url('@/assets/css/base-position.css');

  .cloudea-header {
    position: relative;
    margin: 0 auto;
    max-width: 2560px;
    width: 100%;
    z-index: 101;
  }

  .cloduea-header__bar {
    position: fixed;
    top: 0;
    z-index: var(--z-index-navbar);
    padding: 0 24px;
    max-width: 2560px;
    width: 100%;
    height: var(--header-height);
  }

  .header-fix {
    background-color: rgba($color: #000000, $alpha: 0.5) !important;
    background-image: radial-gradient(transparent 1px, #ffffff 1px);
    background-size: 2px 2px;
    backdrop-filter: saturate(50%) blur(1px);
  }

  .header-fix-block {
    position: fixed;
    background-color: rgba($color: #000000, $alpha: 1) !important;
  }

  .flex-grow {
    flex-grow: 1;
  }

  :deep(.cloudea-menu) {
    background-color: rgba($color: #000000, $alpha: 0) !important;
    border: 0;
    height: var(--header-height);
    line-height: 64px;
  }

  :deep(.cloudea-menu > .el-menu-item:hover) {
    background-color: rgba($color: #000000, $alpha: 0.5) !important;
  }

  :deep(.cloudea-menu .el-sub-menu__title) {
    background-color: rgba($color: #000000, $alpha: 0) !important;
  }

  :deep(.cloudea-menu .el-sub-menu__title:hover) {
    background-color: rgba($color: #000000, $alpha: 0.5) !important;
  }

  .cloudea-menu .title {
    display: flex;
    align-items: center;
  }

  :deep(.menu-avatar .el-sub-menu__title) {
    padding: 0 20px;
  }

  :deep(.menu-avatar .el-sub-menu__icon-arrow) {
    display: none;
  }
</style>

<style scoped>
  .clickable {
    color: #00a1d6;
    cursor: pointer;
  }

  .cloudea-mini-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    font-size: 14px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10010;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .cloudea-mini-content-wp,
  .cloudea-mini-mask {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  .cloudea-mini-content-wp {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 520px;
    min-height: 400px;
    background: #fff;
    border-radius: 8px;
    padding: 52px 60px 29px 60px;
    /* background-image: url(https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login-v2/img/22_open.4ea5f239.png),
      url(https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login-v2/img/33_open.f7d7f655.png); */
    background-position:
      0 100%,
      100% 100%;
    background-repeat: no-repeat, no-repeat;
    background-size: 14%;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .cloudea-mini-close-icon {
    width: 32px;
    height: 32px;
    position: absolute;
    top: 20px;
    right: 20px;
    background: no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    z-index: 2;
  }

  .cloudea-mini-login-right-wp {
    width: 400px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .login-tab-wp {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-line-pack: center;
    align-content: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-bottom: 36px;
  }

  .login-pwd-wp {
    position: relative;
  }
  .login-sns-wp {
    margin-top: 24px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .login-tab-line {
    width: 1px;
    height: 20px;
    background: #e3e5e7;
    border-radius: 8px;
    margin: 0 21px;
  }

  .login-tab-item {
    font-weight: 500;
    font-size: 18px;
    line-height: 20px;
    color: #505050;
    cursor: pointer;
  }

  .active-tab {
    color: #4fa5d9;
    cursor: not-allowed;
  }
  .tab__form {
    width: 400px;
    height: 90px;
    border: 1px solid #e3e5e7;
    border-radius: 8px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #212121;
  }

  .tab__form .form__item {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 44px;
    padding: 12px 20px;
  }
  .tab__form .form__separator-line {
    display: block;
    width: 100%;
    height: 0;
    border-bottom: 1px solid #e3e5e7;
  }
  .tab__form .form__item input {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    min-width: 0;
    -webkit-box-shadow: 0 0 0 1000px #fff inset;
    box-shadow: inset 0 0 0 1000px #fff;
    margin-left: 20px;
  }

  .cloudea-mini-content-wp input,
  .cloudea-mini-content-wp select,
  .cloudea-mini-content-wp textarea {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    border: none;
    overflow: visible;
  }

  .cloudea-mini-content-wp a,
  .cloudea-mini-content-wp i,
  .cloudea-mini-content-wp input,
  .cloudea-mini-content-wp li,
  .cloudea-mini-content-wp ol,
  .cloudea-mini-content-wp p,
  .cloudea-mini-content-wp ul {
    margin: 0;
    padding: 0;
    border: 0;
    font-weight: 400;
    vertical-align: baseline;
  }

  .eye-btn,
  .eye-btn svg {
    width: 20px;
    height: 20px;
  }

  .eye-btn {
    position: relative;
    display: inline-block;
    cursor: pointer;
    margin-right: 10px;
  }

  .clickable {
    color: #00a1d6;
    cursor: pointer;
  }

  .forget-tip {
    position: absolute;
    top: 60px;
    right: -115px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 332px;
    height: 120px;
    background: #fff;
    -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.21);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.21);
    border-radius: 5px;
    z-index: 1;
  }

  .btn_wp {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-top: 24px;
    width: 400px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
  }

  .btn_other {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 194px;
    height: 40px;
    cursor: pointer;
    color: #18191c;
    background: #fff;
    border: 1px solid #e3e5e7;
    border-radius: 8px;
  }

  .btn_primary {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 194px;
    height: 40px;
    cursor: pointer;
    color: #fff;
    background: #00aeec;
    border-radius: 8px;
  }

  .btn_primary.disabled {
    cursor: not-allowed;
    background: #00aeec !important;
    opacity: 0.5;
  }

  .login-sns-wp {
    margin-top: 36px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .login-sns-title {
    text-align: center;
    color: #9499a0;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
  }

  .login-sns-content,
  .login-sns-item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .login-sns-content {
    margin-top: 12px;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  .login-sns-item {
    margin-right: 30px;
    /* cursor: pointer; */
    cursor: not-allowed;
    /* background-color: red; */
    opacity: 0.4;
  }

  .login-sns-item-icon {
    width: 28px;
    height: 28px;
    margin-right: 8px;
  }

  .login-sns-name {
    text-align: center;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    color: #9499a0;
  }

  .area-code-select {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    overflow-y: auto;
    width: 220px;
    height: 200px;
    padding: 6px 0;
    background: #fff;
    border: 1px solid #e3e5e7;
    -webkit-box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    z-index: 10;
    scrollbar-width: none;
    -ms-overflow-style: none;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }

  .area-code-select::-webkit-scrollbar {
    display: none;
  }

  .login-sms-wp {
    position: relative;
  }

  .login-sms-wp .area-code-select {
    position: absolute;
    top: 46px;
  }

  .login-sms-wp__cid {
    position: relative;
    width: 42px;
  }

  .login-sms-wp__vertical-line {
    width: 1px;
    height: 26px;
    border-left: 1px solid #e3e5e7;
    margin-right: 20px;
  }

  .login-sms-wp .disable {
    color: #c9ccd0 !important;
    cursor: not-allowed;
  }

  .area-code-select .checked {
    color: #00aeec;
  }
  .area-code-select .option {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    padding: 6px 12px;
    cursor: pointer;
  }
</style>

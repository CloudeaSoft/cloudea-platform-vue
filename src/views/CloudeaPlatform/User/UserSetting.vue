<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import UserCard from './components/UserCard.vue'
  import { useUserStore } from '@/store'

  const userStore = useUserStore()
  const userName = ref()
  const query = ref({
    Id: '',
    NickName: ''
  })

  const handleEditProfile = () => {
    console.log(query.value)
  }

  onMounted(() => {
    query.value.Id = userStore.profile?.Id
    userName.value = userStore.profile?.UserName
    query.value.NickName = userStore.profile?.NickName
  })
</script>

<template>
  <UserCard>
    <template #header> 我的信息 {{ ' ID: ' + query.Id }}</template>
    <div class="user-setting-warp">
      <div>
        <el-form label-width="95px" :model="query">
          <el-form-item class="user-nick-name" label="昵称">
            <el-input v-model="query.NickName" placeholder="输入昵称"></el-input>
          </el-form-item>
          <el-form-item class="user-rel-name" label="用户名"
            ><span>{{ userName }}</span></el-form-item
          >
          <el-form-item class="user-my-sign" label="签名"
            ><el-input
              type="textarea"
              placeholder="设置您的签名- ( ゜- ゜)つロ"
              resize="none"
              rows="4"
            ></el-input
          ></el-form-item>
          <el-form-item class="user-my-sex" label="性别">
            <el-radio-group>
              <el-radio :label="3">男</el-radio>
              <el-radio :label="6">女</el-radio>
              <el-radio :label="9">保密</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="user-my-date" label="生日">
            <el-date-picker type="date" placeholder="选择日期" size="default" />
          </el-form-item>
          <el-form-item class="user-my-btn" label-width="0">
            <div class="padding-dom"></div>
            <div class="user-my-btn-warp">
              <el-button color="slateblue" :dark="false" @click="handleEditProfile">保存</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </UserCard>
</template>

<style scoped>
  .user-setting-warp {
    padding: 20px 20px 0;
    position: relative;
  }

  :deep(.el-form-item__label) {
    margin-right: 24px;
    padding-right: 0;
  }

  .user-nick-name .el-input,
  .user-nick-name .el-input-inner {
    float: left;
    width: 220px;
    height: 30px;
    margin-right: 40px;
  }

  .user-setting-warp .padding-dom {
    width: 789px;
    height: 39px;
    border-bottom: 1px solid #e5e9ef;
    margin-bottom: 40px;
  }

  .user-my-btn-warp {
    float: left;
    width: 789px;
    height: 36px;
    position: relative;
  }

  .user-my-btn .el-button {
    width: 110px;
    position: absolute;
    top: 50%;
    left: 50%;
    height: 40px;
    transform: translate(-50%, -50%);
    /* background: var(--User-Main-Color); */
  }
</style>

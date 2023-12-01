<script setup lang="ts">
  import TestCard from '../TestCard.vue'
  import * as signalR from '@microsoft/signalr'
  import { onMounted, ref } from 'vue'

  const isShow = ref(true)

  const myshowChan = () => {
    isShow.value = !isShow.value
  }

  const showclass = () => {
    return isShow.value ? 'come' : 'go'
  }

  // let connection: signalR.HubConnection

  // const state = ref({
  //   userMsg: '',
  //   messages: []
  // })

  // const txtMsgOnkeypress = async (e: any) => {
  //   if (e.keyCode != 13) return
  //   await connection.invoke('SendMessage', state.value.userMsg)
  //   state.value.userMsg = ''
  // }

  // onMounted(async () => {
  //   connection = new signalR.HubConnectionBuilder()
  //     .withUrl('ws://localhost:7165/ChatRoomHub', {
  //       skipNegotiation: true,
  //       transport: signalR.HttpTransportType.WebSockets
  //     })
  //     .withAutomaticReconnect()
  //     .build()
  //   await connection.start()
  //   connection.on('PublicMsgReceived', (msg: never) => {
  //     state.value.messages.push(msg)
  //   })
  // })
</script>

<template>
  <TestCard>
    <template #header>15</template>
    <button @click="myshowChan">s</button>
    <div class="blo">
      <Transition appear><div v-show="isShow">Blank</div></Transition>
    </div>
    <span>aaa</span>
    <!-- <input type="text" v-model="state.userMsg" v-on:keypress="txtMsgOnkeypress" />
    <div>
      <ul>
        <li v-for="(msg, index) in state.messages" :key="index">{{ msg }}</li>
      </ul>
    </div> -->
  </TestCard>
</template>

<style>
  .blo {
    width: 150px;
    height: 70px;
    background-color: #ccc;
    padding: 20px;
  }

  .v-enter-active {
    animation: myshow 1s linear;
  }

  .v-leave-active {
    animation: myshow 1s reverse;
  }

  @keyframes myshow {
    from {
      transform: translateX(-100px);
    }
    to {
      transform: translateX(0px);
    }
  }
</style>

<script setup lang="ts">
  import { ref } from 'vue'

  const posiX = ref(0)
  const posiY = ref(0)
  const cursorInner = ref()
  document.addEventListener(
    'mousemove',
    (e) => {
      posiX.value = e.clientX
      posiY.value = e.clientY
      cursorInner.value.style.opacity = 1
    },
    false
  )

  document.body.onmouseleave = function () {
    cursorInner.value.style.opacity = 0
  }

  document.body.onmouseenter = function () {
    cursorInner.value.style.opacity = 1
  }

  document.oncontextmenu = function () {
    return false
  }
</script>

<template>
  <div
    id="cursor"
    class="cursor"
    :style="{
      transform: `translate(${posiX}px, ${posiY}px)`
    }"
  >
    <div class="inner" ref="cursorInner">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="skyblue"
      >
        <path
          opacity="0.1"
          d="M10.448 17.184L8.09782 10.6557C7.52461 9.06344 9.06479 7.52326 10.657 8.09647L17.1853 10.4467C19.1195 11.143 18.8709 13.9539 16.8445 14.2999L16.0686 14.4324C15.2319 14.5752 14.5766 15.2306 14.4337 16.0672L14.3013 16.8431C13.9553 18.8695 11.1443 19.1181 10.448 17.184Z"
          fill="#323232"
        />
        <path
          d="M10.4465 17.1843L8.09636 10.656C7.52315 9.0638 9.06333 7.52363 10.6556 8.09684L17.1839 10.447C19.118 11.1433 18.8694 13.9543 16.843 14.3003L16.0671 14.4327C15.2305 14.5756 14.5751 15.231 14.4323 16.0676L14.2998 16.8435C13.9538 18.8699 11.1428 19.1185 10.4465 17.1843Z"
          stroke="#323232"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
</template>

<style>
  * {
    cursor: none !important;
  }
</style>

<style scoped>
  @media (hover: none) {
    #cursor {
      display: none;
    }
  }
  #cursor {
    pointer-events: none;
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
  }

  #cursor::after {
    content: '';
    opacity: 0;
    transition: all 0.3s ease;
    background-color: #fff;
    background-size: 100%;
    width: 1.36666666667rem;
    height: 1.46666666667rem;
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transform: translate(-50%, -30%);
  }

  #cursor.hover::after {
    opacity: 1;
  }

  #cursor .inner {
    box-shadow: initial !important;
    border-radius: initial !important;
    background-size: 100% !important;
    width: 1.4333333333rem !important;
    height: 1.7333333333rem !important;
    display: inline-block !important;
    transition: all 0.3s ease;
    transform: translate(-0.33333333333rem) !important;
    opacity: 0;
  }

  #cursor .inner svg {
    transform: scale(2) translate(-5%, -5%);
  }
</style>

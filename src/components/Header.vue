<template>
  <header id="Header" :class="['header', { 'header--open': isOpen }]">
    <nav id="HeaderNav" class="header__nav">
      <button
        class="header__toggle"
        :aria-expanded="isOpen.toString()"
        @click="toggle"
      >
        Menu
      </button>
      <ul class="header__list">
        <li><a href="#" class="header__link">Home</a></li>
        <li><a href="#" class="header__link">About</a></li>
        <li><a href="#" class="header__link">Contact</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isOpen = ref(false)

function toggle() {
  isOpen.value = !isOpen.value
}

// 模拟 global.js 的 ESC、Tab 键逻辑
function handleKeydown(e) {
  if (e.key === 'Escape') {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

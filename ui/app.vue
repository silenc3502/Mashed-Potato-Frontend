<template>
  <div>
    <v-app class="app-background" @mousemove="handleMouseMove">
      <div class="neon-cursor" ref="neonCursor"></div>
      <NavigationBar/>
      <v-main>
        <NuxtPage/>
      </v-main>
    </v-app>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const mouseX = ref(0);
const mouseY = ref(0);
const neonCursor = ref(null);

// 마우스 위치 추적
const handleMouseMove = (event) => {
  
  mouseX.value = event.clientX;
  mouseY.value = event.clientY;

  if (neonCursor.value) {
    neonCursor.value.style.top = `${mouseY.value}px`;
    neonCursor.value.style.left = `${mouseX.value}px`;
  }
};

// 커서 숨기기 및 초기화
onMounted(() => {
  document.body.appendChild(neonCursor.value);
  // document.body.style.cursor = 'none';  // 기본 커서 숨기기
});
</script>

<style scoped>
.app-background {
  background-color: black;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

/* 마우스를 따라가는 핑크 네온 + 흰색 중심 원 */
.neon-cursor {
  position: fixed;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 20, 147, 0.8) 40%, rgba(255, 20, 147, 0.3) 70%, rgba(255, 20, 147, 0) 100%);
  box-shadow: 
    0 0 15px 4px rgba(255, 20, 147, 0.8),
    0 0 30px 10px rgba(255, 20, 147, 0.6),
    0 0 50px 20px rgba(255, 20, 147, 0.3);
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9999; /* 다른 요소 위에 존재 */
  animation: pulse 1.5s infinite alternate;
  transition: transform 0.05s ease, box-shadow 0.1s ease;
}

/* 깜빡이는 애니메이션 */
@keyframes pulse {
  0% {
    box-shadow: 
      0 0 10px 3px rgba(255, 20, 147, 1),
      0 0 25px 8px rgba(255, 20, 147, 0.7),
      0 0 40px 15px rgba(255, 20, 147, 0.4);
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    box-shadow: 
      0 0 18px 5px rgba(255, 20, 147, 1),
      0 0 35px 12px rgba(255, 20, 147, 0.8),
      0 0 60px 25px rgba(255, 20, 147, 0.5);
    transform: translate(-50%, -50%) scale(1.1);
  }
}
</style>

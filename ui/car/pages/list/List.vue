<template>
  <v-container>
    <h2>판매 차량 모델</h2>
      <!-- 상품 등록 링크 -->
    <div style="text-align: left; margin: 15px;">
     <!-- name을 가지고 Nuxt 상의 라우터를 연결함
          즉 링크를 누르면 register 페이지가 구동됨(URL 이동) -->
     <NuxtLink :to="{ name: 'CarRegisterPage' }" class="register-link">
        차량 모델 등록
      </NuxtLink>
    </div>
  </v-container>
</template>

<script setup lang="ts">

import { ref, computed, onMounted, watch } from 'vue'
import { useCarStore } from '../../stores/carStore'
import { useRouter } from 'vue-router'
import {resolve} from "path";

const carStore = useCarStore()
const carList = computed(() => carStore.carList);

const totalPages = computed(() => carStore.totalPages);
const currentPage = ref(1)
const perPage = 8

// 라우터 설정
const router = useRouter()

interface ImageModule {
  default: string;
}

</script>

<style scoped>
h2 {
  color: white;
  text-align: center;
  margin-top: 20px;
}

/* NuxtLink 스타일 */
.register-link {
  color: white;
}
</style>
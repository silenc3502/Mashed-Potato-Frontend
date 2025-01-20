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

    <!-- 상품 목록 -->
    <!-- Data Server에 리스트를 요청하여 개수가 0보다 큰지 확인 -->
    <v-row v-if="carList.length > 0">
        <v-col v-for="(car, index) in carList" :key="index" sm="3">
            <v-card class="neon-card" @click="goToCarReadPage(car.id)">
                <v-img :src="getCarImageUrl(car.image)" aspect-ratio="1" class="neon-image">
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular indeterminate color="grey lighten-5"/>
                        </v-row>
                    </template>
                </v-img>
            <v-card-title>{{ car.title }}</v-card-title>
             <v-card-subtitle>{{ car.price + '원'}}</v-card-subtitle>
            </v-card>
        </v-col>
    </v-row>

    <!-- 상품이 없을 경우 안내 메시지 -->
    <!-- 위쪽에 v-if 의 경우 조건을 만족한다면 아래는 신경쓰지 않음
         반면 if 조건이 만족되지 않으면 아래 코드가 대신 실행됨 -->
    <v-row v-else>
      <v-col cols="12" class="text-center">
        <v-alert type="info" class="custom-alert">등록된 차량 모델이 없습니다!</v-alert>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="text-center">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="5"
          :prev-icon="'mdi-chevron-left'"
          :next-icon="'mdi-chevron-right'"
          :first-icon="'mdi-chevron-double-left'"
          :last-icon="'mdi-chevron-double-right'"/>
        <p>현재 페이지: {{ currentPage }}</p>
      </v-col>
    </v-row>
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

// 상품 이미지 URL을 반환하는 함수
const images = import.meta.glob('@/assets/images/uploadImages/*', { eager: true }) as Record<string, ImageModule>;
for (const [key, value] of Object.entries(images)) {
    console.log(`Key: ${key}`);
    console.log(`Value:`, value);
}

const getCarImageUrl = (imageName: string) => {
    console.log(`imageName: ${imageName}`)
    console.log(`images[\`@/assets/images/uploadImages/${imageName}\`]`)
    console.log(`images: ${images}`)
    const imagePathKey = `/assets/images/uploadImages/${imageName}`
    console.log(`imagePathKey: ${imagePathKey}`)
    const imagePath = images[imagePathKey];
    //console.log(`imagePath: ${imagePath.default}`)

    if (imagePath) {
        return imagePath.default;
    }
    return '/assets/images/default-image.jpg';
}

// 상품 상세 페이지로 이동하는 함수
const goToCarReadPage = (id: string) => {
  router.push({
    name: 'CarRead',
    params: { id },
  })
}

watch (currentPage, (newPage) => {
  carStore.requestCarList(newPage, perPage)
})


// 컴포넌트 마운트 시 상품 목록 요청
onMounted(() => {
  carStore.requestCarList()
})
</script>

<style scoped>
h2 {
  color: white;
  text-align: center;
  margin-top: 20px;
}

/* 전체 텍스트 폰트 색상 흰색 */
.v-container, h2, p, .v-card-title, .v-card-subtitle, .register-link, .custom-alert {
  color: white !important;
}

/* NuxtLink 스타일 */
.register-link {
  color: white;
}

/* 커스텀 알림 스타일 */
.custom-alert {
  background-color: rgba(40, 0, 60, 0.8) !important; /* 보라색 반투명 배경 */
  color: #ffffff !important; 
  border: 2px solid rgba(255, 0, 255, 0.5) !important; /* 테두리: 핑크 네온 */
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.5) !important; /* 네온 글로우 효과 */
  border-radius: 12px !important; /* 둥근 모서리 */
  font-size: 16px; /* 텍스트 크기 */
  text-shadow: 0 0 8px rgba(255, 0, 255, 0.7); /* 네온 텍스트 효과 */
}

/* 차량 카드 네온 스타일 */
.neon-card {
  background-color: rgba(20, 20, 20, 0.8); /* 다크 배경 */
  border: 2px solid rgba(255, 0, 255, 0.5); /* 핑크 네온 테두리 */
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.5); /* 네온 글로우 효과 */
  border-radius: 12px; /* 둥근 모서리 */
  overflow: hidden; /* 이미지가 테두리 밖으로 넘치지 않게 */
  transition: transform 0.3s, box-shadow 0.3s; /* 호버 효과 전환 */
}

/* 호버 시 네온 효과 강조 */
.neon-card:hover {
  transform: scale(1.05); /* 살짝 확대 */
  box-shadow: 0 0 25px rgba(255, 0, 255, 0.8); /* 네온 효과 강화 */
}

/* 이미지에 네온 효과 */
.neon-image {
  border: 2px solid rgba(255, 0, 255, 0.5); /* 핑크 네온 테두리 */
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.5); /* 네온 글로우 효과 */
  border-radius: 8px; /* 이미지 둥근 모서리 */
}

/* 이미지 호버 시 효과 */
.neon-image:hover {
  box-shadow: 0 0 25px rgba(255, 0, 255, 0.8); /* 네온 효과 강화 */
}
</style>

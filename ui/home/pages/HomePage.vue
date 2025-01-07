<template>
  <v-container fluid class="pa-0 custom-background" >
    <!-- 배경 이미지와 텍스트를 포함한 Hero 섹션 -->
    <v-row class="hero-section" style="margin-top: 50px;">
      <v-col cols="12">
        <v-img
          src="/assets/images/fixed/cyberpunk_car_main.webp"
          height="500"
          class="rounded-xl"
        >
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-col class="text-center"></v-col>
          </v-row>
        </v-img>
      </v-col>
    </v-row>

    <!-- 기능 카드 섹션 -->
    <v-row justify="center" class="mt-6">
      <v-slide-group
        show-arrows
        class="custom-slide-group"
        v-model="currentSlide"
      >
        <v-slide-item
          v-for="n in 10"
          :key="n"
        >
          <v-card class="mx-2" max-width="150">
            <v-img
              src="/assets/images/fixed/cyberTruck_test.jpeg"
              height="100"
            ></v-img>
            <v-card-title class="text-h6">사이버 트럭</v-card-title>
            <v-card-subtitle>Tesla</v-card-subtitle>
            <v-card-actions>
              <v-btn text>자세히 보기</v-btn>
            </v-card-actions>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-row>

    <!-- Footer 섹션 -->
    <v-row>
      <v-col cols="12" class="text-center">
        <v-divider></v-divider>
        <p>&copy; (주) 고카</p>
        <p>주소: 서울 금천구 가산디지털1로 25 대륭테크노타운17차, 18층</p>
        <p>고객센터: 1234-5678</p>
        <p>All rights reserved.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

// 슬라이드 상태 관리
const currentSlide = ref(0);
</script>

<style scoped>
/* 배경색 블랙 설정 및 텍스트 흰색 */
.custom-background {

  background-color: black;
  color: white;
  min-height: 100vh;

}


/* 슬라이드 그룹 스타일 */
.custom-slide-group {
  max-width: 1400px; /* 한 번에 7개의 카드가 보이도록 설정 */
  margin: 0 auto; /* 중앙 정렬 */
}

/* 카드 스타일 */
.v-card {
  background-color: #222;
  color: white;
}

.v-card-title,
.v-card-subtitle {
  color: white;
}

/* 버튼 텍스트 흰색 */
.v-btn {
  color: white;
}
</style>

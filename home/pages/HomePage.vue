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
      v-for="(car, index) in carList"
      :key="index"
    >
      <v-card class="mx-2" max-width="150">
        <v-img
          :src="getCarImageUrl(car.image) || '/assets/images/fixed/cyberTruck_test.jpeg'"
          height="100"
        ></v-img>
        <v-card-title class="text-h6">{{ car.title }}</v-card-title>
        <v-card-subtitle>{{ car.category }}</v-card-subtitle>
        <v-card-actions>
          <v-btn text @click="goToCarReadPage(car.id)">자세히 보기</v-btn>
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
import { ref, computed, onMounted, watch } from 'vue'
import { useCarStore } from '../../car/stores/carStore'
import { useRouter } from 'vue-router'

const currentSlide = ref(0);
const carStore = useCarStore()
const carList = computed(() => carStore.carList);


// 라우터 설정
const router = useRouter()

// 상품 상세 페이지로 이동하는 함수
const goToCarReadPage = (id) => {
  router.push({
    path: '/car/:id',
    name: 'CarRead',
    component: () => import('@/car/pages/read/Read.vue'),
    params: { id },
  })
}

// 상품 이미지 URL을 반환하는 함수
const images = import.meta.glob('@/assets/images/uploadImages/*', { eager: true });
for (const [key, value] of Object.entries(images)) {
    console.log(`Key: ${key}`);
    console.log(`Value:`, value);
}

const getCarImageUrl = (imageName) => {
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


// 컴포넌트 마운트 시 상품 목록 요청
onMounted(() => {
  carStore.requestCarList(1,20)
})

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

<style scoped>
/* 배경색 블랙 설정 및 텍스트 흰색 */
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

/* 카드 기본 스타일 */
.v-card {
  background-color: #222;
  color: white;
  transition: all 0.3s ease; 
  border: 1px solid transparent; 
}

/* 마우스 오버 시 네온사인 효과 */
.v-card:hover {
  background-color: #776175; 
  box-shadow: 0 0 15px rgb(239, 81, 213), 0 0 30px rgb(239, 81, 213);
  border-color:  rgb(239, 81, 213); 
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
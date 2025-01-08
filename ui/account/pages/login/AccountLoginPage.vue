<template>
  <v-container 
    fluid 
    class="d-flex justify-center align-center pa-0" 
    :style="{ backgroundColor: '#000', height: '100vh' }"
  >
    <v-row justify="center" align="center" class="fill-height ma-0">
      <v-col cols="12" sm="8" md="6" class="text-center">
        <div 
          class="background-box"
          :style="{ backgroundImage: `url(${loginBgImage})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '300px', height: '300px', margin: 'auto' }"
        >
        </div>
        <v-btn class="kakao-login-btn" @click="goToKakaoLogin" block>
          <!-- 카카오 로그인 -->
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import loginBgImage from '@/assets/images/fixed/home_button.webp';

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useKakaoAuthenticationStore } from '../../../kakaoAuthentication/stores/kakaoAuthenticationStore';

const router = useRouter();
const kakaoAuthentication = useKakaoAuthenticationStore();

const goToKakaoLogin = async () => {
  await kakaoAuthentication.requestKakaoLoginToDjango();
};
</script>

<style scoped>
/* 로그인 및 회원가입 버튼 설정 */
.v-btn {
  width: 100%;
  height: 50px;
  margin: 1.3vh auto;
}

/* 중앙 배치된 이미지 스타일 */
.background-box {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/images/fixed/home_button.webp");
  background-size: contain !important; /* 이미지 비율 유지 */
  background-repeat: no-repeat !important; /* 이미지 반복 안 함 */
  background-position: center !important; /* 이미지 중앙 배치 */
  background-color: transparent;
  border-radius: 12px; /* 모서리 둥글게 */
  width: 500px !important; /* 가로 크기 강제 적용 */
  height: 500px !important; /* 세로 크기 강제 적용 */
}


.kakao-login-btn {
  position: relative;
  top: 20px;
  width: 200px !important; /* 가로 크기 */
  height: 50px !important; /* 세로 크기 */
  background-image: url("@/assets/images/fixed/btn_login_kakao.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent; /* 배경색 제거 */
  cursor: pointer;
}

</style>

<template>
    <v-app-bar app color="black" dark class="custom-app-bar">
        <!-- 로고 및 홈으로 이동 버튼 -->
        <v-btn @click="goToHome" text class="logo-button">
            <img src="/assets/images/fixed/home_button.webp" alt="GO!Car Logo" class="logo-image" />
        </v-btn>
        <v-spacer></v-spacer>

        <!-- 로그인/로그아웃 버튼 -->
        <template v-if="!kakaoAuthentication.isAuthenticated">
            <v-btn text @click="signIn" class="btn-text">
                <v-icon left>mdi-login</v-icon>
                로그인
            </v-btn>
        </template>
        <template v-else>
            <v-btn text @click="signOut" class="btn-text">
                <v-icon left>mdi-logout</v-icon>
                로그아웃
            </v-btn>
        </template>
    </v-app-bar>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useKakaoAuthenticationStore } from '~/kakaoAuthentication/stores/kakaoAuthenticationStore';

const router = useRouter();
const kakaoAuthentication = useKakaoAuthenticationStore();

const goToHome = () => {
  router.push('/');
};

const signIn = () => {
  console.log('로그인 클릭');
  router.push('/account/login');
};

const signOut = () => {
  console.log('로그아웃 클릭');
  const userToken = localStorage.getItem('userToken');

  if (userToken) {
    kakaoAuthentication.requestLogout(userToken);
  } else {
    console.log('userToken이 없습니다');
  }

  localStorage.removeItem('userToken');
  kakaoAuthentication.isAuthenticated = false;
  router.push('/');
};

onMounted(async () => {
  const userToken = localStorage.getItem('userToken');

  if (userToken) {
    const isValid = await kakaoAuthentication.requestValidationUserToken(userToken);
    kakaoAuthentication.isAuthenticated = isValid;
  }
});
</script>

<style scoped>
/* 텍스트 버튼 스타일 */
.btn-text {
  color: white;
  font-weight: bold;
}

/* Vuetify의 기본 스타일로 아이콘 및 텍스트 정렬 */
.v-btn {
  display: flex;
  align-items: center;
  background-color: transparent !important; /* 버튼 배경색 제거 */
  box-shadow: none; /* 버튼 그림자 제거 */
}

/* 로고 이미지 스타일 */
.logo-image {
  height: 50px; /* 로고 크기 조정 */
  width: 50px; /* 크기를 고정 */
  cursor: pointer;
  border-radius: 50%; /* 이미지를 둥글게 표시 */
  object-fit: cover; /* 이미지 비율 유지 */
}

/* 로고 버튼 */
.logo-button {
  padding: 0; /* 여백 제거 */
}

/* 네비게이션 바 스타일 */
.custom-app-bar {
  background-color: black !important; /* 배경색 블랙 */
  border-bottom: 4px solid white; /* 아래 흰색 라인 추가 */
}
</style>

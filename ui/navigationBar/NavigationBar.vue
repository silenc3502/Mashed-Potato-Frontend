<template>
    <v-app-bar app color="deep-purple-accent-4" dark>
        <!-- 로고 및 홈으로 이동 버튼 -->
        <v-btn @click="goToHome" text>
            <v-toolbar-title class="text-h6 font-weight-bold">GO!Car</v-toolbar-title>
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
}
</style>

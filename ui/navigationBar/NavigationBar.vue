<template>
    <v-app-bar app color="black" dark class="custom-app-bar">
        <!-- 로고 및 홈으로 이동 버튼 -->
        <v-btn @click="goToHome" text class="logo-button">
            <img src="/assets/images/fixed/home_button.webp" alt="GO!Car Logo" class="logo-image" />
        </v-btn>
        <v-spacer></v-spacer>

         <!-- 판매차종 메뉴 -->
        <v-menu
            v-model="menuOpen"
            close-on-content-click
            open-on-hover
            offset-y
        >
            <template v-slot:activator="{ props }">
                <v-btn
                    color="white"
                    v-bind="props"
                    class="menu-activator"
                >
                    <v-icon left>mdi-car</v-icon>
                    <b>모델</b>
                </v-btn>
            </template>
            <v-list>
                <v-list-item @click="filterVehicles('승용차 및 SUV')">
                    <v-list-item-title>승용차 및 SUV</v-list-item-title>
                </v-list-item>
                <v-list-item @click="filterVehicles('상용차 및 픽업트럭')">
                    <v-list-item-title>상용차 및 픽업트럭</v-list-item-title>
                </v-list-item>
                <v-list-item @click="filterVehicles('버스 및 대형')">
                    <v-list-item-title>버스 및 대형</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <!-- 리뷰게시판 버튼 -->
        <v-btn text @click="goToBoardList" class="btn-text">
            <v-icon left>mdi-notebook-multiple</v-icon>
            <span>리뷰 게시판</span>
        </v-btn>
        <!-- 카트 버튼 -->
        <v-btn text @click="goToCart" class="btn-text">
            <v-icon left>mdi-cart-outline</v-icon>
            <span>카트</span>
        </v-btn>

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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useKakaoAuthenticationStore } from '~/kakaoAuthentication/stores/kakaoAuthenticationStore';

const menuOpen = ref(false);

const router = useRouter();
const kakaoAuthentication = useKakaoAuthenticationStore();

const goToHome = () => {
    router.push('/');
};

// 전체 차종 페이지 이동
const navigateToAllVehicles = () => {
    router.push('/all-vehicles');
};

// 카테고리별 필터링
const filterVehicles = (category) => {
    console.log(`${category} 카테고리 선택됨`);
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
  background-color: transparent !important;
  box-shadow: none; /* 버튼 그림자 제거 */
}

.menu-activator {
  position: relative;
  cursor: pointer;
}

/* 로고 이미지 스타일 */
.logo-image {
  height: 50px;
  width: 50px;
  cursor: pointer;
  border-radius: 50%;
  object-fit: cover;
}

/* 로고 버튼 */
.logo-button {
  padding: 0;
}

/* 네비게이션 바 스타일 */
.custom-app-bar {
  background-color: black !important;
  border-bottom: 4px solid white;
}
</style>

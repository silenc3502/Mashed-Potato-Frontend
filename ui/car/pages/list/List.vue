<template>
  <v-container>
    <h2>판매 차량 모델</h2>
  </v-container>
</template>

<script setup lang="ts">

import { ref, computed, onMounted, watch } from 'vue'

import { useRouter } from 'vue-router'
import {resolve} from "path";

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
</style>
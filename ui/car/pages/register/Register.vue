<template>
  <v-container>
    <v-row>
      <!-- bootstrap이라는 UI 꾸미는 녀석이 있음
           기본적으로 화면은 12개의 열로 구성됨 -->
      <v-col cols="12">
        <v-text-field v-model="gameSoftwareTitle" label="모델명" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field v-model="gameSoftwarePrice" label="가격" type="number" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-textarea v-model="gameSoftwareDescription" label="모델 세부 정보" auto-grow />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-file-input v-model="gameSoftwareImage" label="모델 이미지 파일" prepend-icon="mdi-camera" />
      </v-col>
    </v-row>

    <v-row v-if="uploadedFileName">
      <v-col cols="12">
        <p>업로드된 파일: {{ uploadedFileName }}</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="text-right">
        <v-btn color="primary" @click="onSubmit">작성 완료</v-btn>
        <v-btn color="error" @click="onCancel" class="ml-2">취소</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
definePageMeta({
  name: 'CarRegisterPage'
})

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameSoftwareStore } from '../../stores/carStore'

const router = useRouter()
const carStore = usecarStore()


</script>
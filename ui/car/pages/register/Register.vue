<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="carTitle" label="모델명" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field v-model="carCategory" label="분류종" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field v-model="carPrice" label="가격" type="number" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-textarea v-model="carDescription" label="모델 세부 정보" auto-grow />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-file-input v-model="carImage" label="모델 이미지 파일" prepend-icon="mdi-camera" />
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
import { useCarStore } from '../../stores/carStore'

const router = useRouter()
const carStore = useCarStore()

const carTitle = ref('')
const carCategory = ref('')
const carPrice = ref(0)
const carDescription = ref('')
const carImage = ref(null)
const uploadedFileName = ref('')

const onSubmit = async () => {
  console.log('상품 등록 버튼 눌렀음')

  try {
    if (carImage.value) {
      const formData = new FormData()
      formData.append('carTitle', carTitle.value)
      formData.append('carCategory', carCategory.value)
      formData.append('carPrice', carPrice.value.toString())
      formData.append('carDescription', carDescription.value)
      formData.append('carImage', carImage.value)

      await carStore.requestCreateCar(formData)

      uploadedFileName.value = carStore.uploadedFileName

      router.push({ name: 'CarList' })
    } else {
      console.error('이미지 파일을 선택하세요!')
    }
  } catch (error) {
    console.error('상품 등록 실패:', error)
  }
}

const onCancel = () => {
  console.log('취소 버튼 눌렀음')
  router.back()
}
</script>

<style scoped>
/* 텍스트 필드와 텍스트 에어리어의 배경을 네온 스타일로 설정 */
:deep(.v-text-field, .v-textarea, .v-file-input) {
  background-color: rgba(0, 0, 0, 0.6) !important; /* 반투명한 어두운 배경 */
  border: 2px solid rgba(255, 0, 255, 0.6) !important; /* 보라색 네온 테두리 */
  border-radius: 12px !important; /* 둥근 모서리 */
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.5) !important; /* 네온 글로우 효과 */
  color: #00ffff !important; /* 텍스트 색상: 네온 블루 */
  font-family: 'Orbitron', sans-serif; /* 사이버펑크 느낌의 글꼴 */
}

/* 입력 필드 라벨 스타일 */
:deep(.v-label) {
  color: #ff00ff !important; /* 라벨 색상: 핑크 네온 */
  text-shadow: 0 0 8px rgba(255, 0, 255, 0.7); /* 네온 효과 */
  font-family: 'Orbitron', sans-serif;
  font-size: 14px;
}

/* 입력 필드 포커스 상태 */
:deep(.v-input:focus-within) {
  border-color: #00ffff !important; /* 포커스된 필드의 테두리 색상 */
  box-shadow: 0 0 25px rgba(0, 255, 255, 0.7) !important; /* 블루 네온 글로우 */
}

/* 버튼 스타일 */
.v-btn {
  background-color: rgba(0, 0, 0, 0.8) !important; /* 어두운 배경 */
  color: #00ffff !important; /* 텍스트 색상: 네온 블루 */
  border: 2px solid rgba(255, 0, 255, 0.6) !important; /* 보라색 테두리 */
  border-radius: 12px; /* 둥근 모서리 */
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.5) !important; /* 네온 효과 */
  font-family: 'Orbitron', sans-serif;
}

/* 버튼 호버 효과 */
.v-btn:hover {
  background-color: #ff00ff !important; /* 호버 시 배경색 변경 */
  color: #000 !important; /* 텍스트 색상: 검정 */
  box-shadow: 0 0 20px rgba(255, 255, 0, 0.8) !important; /* 강한 네온 효과 */
}

/* 파일 업로드된 파일명 스타일 */
:deep(.v-file-input__text) {
  color: #00ffff !important;
  font-family: 'Orbitron', sans-serif;
}

/* 컨테이너 기본 텍스트 색상 */
v-container {
  color: #00ffff !important; /* 텍스트 색상: 네온 블루 */
  font-family: 'Orbitron', sans-serif; /* 사이버펑크 글꼴 */
}

/* 필드 간격 조정 */
:deep(.v-row) {
  margin-bottom: 20px;
}
</style>

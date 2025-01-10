<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="8" offset-md="2">
                <v-card>
                    <v-card-title>리뷰 등록</v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model="isValid" lazy-validation>
                            <v-select
                                v-model="board.carModel"
                                :items="carModels"
                                label="구매한 차 상품"
                                :rules="[rules.required]"
                                required
                            />
                            <v-text-field
                                v-model="board.rating"
                                label="평점 (1-5)"
                                type="number"
                                :rules="[rules.required, rules.range]"
                                required
                            />
                            <v-btn
                                :disabled="!isValid"
                                color="primary"
                                @click="submitBoard"
                            >
                                등록하기
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useBoardStore } from "~/board/stores/boardStore"; // Pinia store

const router = useRouter();
const boardStore = useBoardStore();

const board = ref({
    carModel: '',
    rating: null
});

const carModels = ["스텔라 세단", "네오 SUV", "사이버 트럭 ", "오로라 미니버스", "퓨전 전기 버스","펄스 컴팩트카","루미너스 리무진","솔라 SUV","타이탄 카고 트럭","에스트라 세단","제타 컴팩트","오메가 컴팩트"];

const isValid = ref(false);

const rules = {
    required: value => !!value || '필수 입력 항목입니다.',
    range: value => (value >= 1 && value <= 5) || '평점은 1에서 5 사이여야 합니다.',
};

// 게시글 등록
const submitBoard = async () => {
    const userToken = localStorage.getItem('userToken');

    try {
        const response = await boardStore.requestCreateBoard({
            ...board.value,
            userToken, // 사용자 토큰 추가
        });

        if (response !== null) {
            // 게시글이 성공적으로 등록되면 리스트 페이지로 돌아가기
            router.push('/board/list');
        } else {
            alert('게시글 등록에 실패했습니다.');
        }
    } catch (error) {
        console.error('게시글 등록 중 에러 발생:', error);
        alert('게시글 등록 중 문제가 발생했습니다.');
    }
};
</script>

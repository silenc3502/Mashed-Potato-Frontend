<template>
    <v-container class="dark-background">
        <h2 class="centered-title">리뷰 등록</h2>
        <v-row>
            <v-col cols="12" md="8" offset-md="2">
                <v-card class="neon-card">
                  
                    <v-card-text>
                        <v-form ref="form" v-model="isValid" lazy-validation>
                            <v-select
                                v-model="board.carModel"
                                :items="carModels"
                                label="구매한 차 상품"
                                :rules="[rules.required]"
                                required
                                class="neon-select"
                            />
                            <v-text-field
                                v-model="board.rating"
                                label="평점 (1-5)"
                                type="number"
                                :rules="[rules.required, rules.range]"
                                required
                                class="neon-text-field"
                            />
                            <v-btn
                                :disabled="!isValid"
                                class="neon-button"
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
import { useBoardStore } from "~/board/stores/boardStore";

const router = useRouter();
const boardStore = useBoardStore();

const board = ref({
    carModel: '',
    rating: null,
});

const carModels = [
    "스텔라 세단", "네오 SUV", "사이버 트럭", "오로라 미니버스",
    "퓨전 전기 버스", "펄스 컴팩트카", "루미너스 리무진",
    "솔라 SUV", "타이탄 카고 트럭", "에스트라 세단",
    "제타 컴팩트", "오메가 컴팩트",
];

const isValid = ref(false);

const rules = {
    required: value => !!value || '필수 입력 항목입니다.',
    range: value => (value >= 1 && value <= 5) || '평점은 1에서 5 사이여야 합니다.',
};

const submitBoard = async () => {
    const userToken = localStorage.getItem('userToken');

    try {
        const response = await boardStore.requestCreateBoard({
            ...board.value,
            userToken,
        });

        if (response !== null) {
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

<style scoped>
.dark-background {
    background-color: black;
    min-height: 100vh;
    padding: 20px;
}

.centered-title {
    color: white;
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.8rem;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.7);
}

.neon-card {
    background-color: rgba(20, 20, 20, 0.8);
    border: 2px solid rgba(255, 0, 255, 0.5);
    box-shadow: 0 0 15px rgba(255, 0, 255, 0.5);
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
}

.neon-button {
    background-color: rgba(255, 0, 255, 0.5);
    color: white;
    box-shadow: 0 0 10px rgba(255, 0, 255, 0.7);
    transition: transform 0.3s, box-shadow 0.3s;
}

.neon-button:hover {
    background-color: rgba(255, 0, 255, 0.7);
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 0, 255, 1);
}

.neon-select, .neon-text-field {
    background-color: rgba(30, 30, 30, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: white;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.neon-select:hover, .neon-text-field:hover {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
}
</style>

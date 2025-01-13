<template>
    <v-container class="dark-background pa-4">
        <h2 class="centered-title">평점 수정</h2>
        <v-row>
            <v-col cols="12" md="8" offset-md="2">
                <v-card class="neon-card">
                    <v-card-subtitle class="neon-card-subtitle">
                        <v-row class="mt-2">
                            <v-col cols="12">
                                <strong>작성자:</strong> {{ boardDetails.writer.nickname }}
                            </v-col>
                        </v-row>
                    </v-card-subtitle>

                    <v-divider />

                    <v-card-text>
                        <v-select
                            v-model="boardDetails.carModel"
                            :items="carModels"
                            label="구매한 차 상품"
                            outlined
                            class="neon-select"
                        ></v-select>

                        <v-text-field
                            v-model="boardDetails.rating"
                            label="평점 (1-5)"
                            type="number"
                            outlined
                            class="neon-text-field"
                            :rules="ratingRules"
                        ></v-text-field>
                    </v-card-text>

                    <v-divider />

                    <v-card-actions class="neon-card-actions mb-2">
                        <v-btn @click="updateBoard" class="neon-button">
                            수정 완료
                        </v-btn>
                        <v-btn @click="goToListPage" class="neon-button red-button">
                            취소
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useBoardStore } from '~/stores/boardStore';

const router = useRouter();
const boardStore = useBoardStore();

// boardId를 route에서 가져옴
const boardId = router.currentRoute.value.params.boardId;
const boardDetails = ref({
    carModel: '',
    writer: '',
    createDate: '',
    rating: ''
});

const carModels = [
    "스텔라 세단", "네오 SUV", "사이버 트럭", "오로라 미니버스", 
    "퓨전 전기 버스", "펄스 컴팩트카", "루미너스 리무진", "솔라 SUV", 
    "타이탄 카고 트럭", "에스트라 세단", "제타 컴팩트", "오메가 컴팩트"
];

const ratingRules = [
    value => (value >= 1 && value <= 5) || '평점은 1에서 5 사이여야 합니다.'
];

// 게시글 정보를 요청하는 함수
const fetchBoardDetails = async () => {
    try {
        await boardStore.requestReadBoard(boardId);
        if (boardStore.board) {
            boardDetails.value = {
                carModel: boardStore.board.carModel,
                rating: boardStore.board.rating,
                writer: { nickname: boardStore.board.nickname },
                createDate: boardStore.board.createDate,
            };
        } else {
            console.error("게시글 정보를 가져오는 데 실패했습니다.");
        }
    } catch (error) {
        console.error("게시글 요청 중 에러 발생:", error);
    }
};

// 게시글 수정 함수
const updateBoard = async () => {
    const userToken = localStorage.getItem("userToken");

    const boardData = {
        carModel: boardDetails.value.carModel,
        rating: boardDetails.value.rating,
        userToken: userToken,
    };

    try {
        await boardStore.requestModifyBoard(boardId, boardData);
        router.push('/board/list');
    } catch (error) {
        console.error("게시글 수정 중 에러 발생:", error);
    }
};

// 목록 페이지로 이동하는 함수
const goToListPage = () => {
    router.push('/board/list');
};

onMounted(fetchBoardDetails);
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
}

.neon-card-title, .neon-card-subtitle {
    color: white;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
}

.neon-select, .neon-text-field {
    background-color: rgba(30, 30, 30, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: white;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
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

.red-button {
    background-color: rgba(255, 0, 0, 0.5);
    box-shadow: 0 0 10px rgba(255, 0, 0, 0.7);
}

.red-button:hover {
    background-color: rgba(255, 0, 0, 0.7);
    box-shadow: 0 0 20px rgba(255, 0, 0, 1);
}
</style>

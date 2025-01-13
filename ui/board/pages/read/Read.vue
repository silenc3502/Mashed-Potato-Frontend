<template>
    <v-container class="dark-background pa-4">
        <h2 class="centered-title">게시글 상세</h2>
        <v-row>
            <v-col cols="12" md="8" offset-md="2">
                <v-card class="neon-card">
                    <v-card-subtitle class="neon-card-subtitle">
                        <v-row class="mt-2">
                            <v-col cols="6">
                                <strong>작성자:</strong> {{ boardDetails.writer.nickname }}
                            </v-col>
                            <v-col cols="6" class="text-right">
                                <strong>작성일:</strong> {{ formatDate(boardDetails.createDate) }}
                            </v-col>
                        </v-row>
                    </v-card-subtitle>

                    <v-divider />

                    <!-- 구매한 차 상품 -->
                    <v-card-text>
                        <div class="font-weight-bold neon-text">구매한 차 상품: {{ boardDetails.carModel }}</div>
                    </v-card-text>

                    <v-divider /> <!-- 상품과 평점 사이의 구분선 -->

                    <!-- 평점 -->
                    <v-card-text>
                        <div class="font-weight-bold neon-text">평점: {{ boardDetails.rating }}</div>
                    </v-card-text>

                    <v-divider />

                    <v-card-actions class="neon-card-actions mb-2">
                        <v-btn @click="goToListPage" class="neon-button">
                            목록으로
                        </v-btn>
                        <v-btn @click="goToEditPage" class="neon-button orange-button">
                            수정
                        </v-btn>
                        <v-btn @click="deleteBoard" class="neon-button red-button">
                            삭제
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

// 게시글 정보를 요청하는 함수
const fetchBoardDetails = async () => {
    try {
        await boardStore.requestReadBoard(boardId);
        if (boardStore.board) {
            boardDetails.value = {
                carModel: boardStore.board.carModel,
                writer: { nickname: boardStore.board.nickname },
                createDate: boardStore.board.createDate,
                rating: boardStore.board.rating
            };
        } else {
            console.error("게시글 정보를 가져오는 데 실패했습니다.");
        }
    } catch (error) {
        console.error("게시글 요청 중 에러 발생:", error);
    }
};

// 날짜 형식 포맷 함수
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

// 목록 페이지로 이동하는 함수
const goToListPage = () => {
    router.push('/board/list');
};

// 수정 페이지로 이동하는 함수
const goToEditPage = () => {
    router.push(`/board/modify/${boardId}`);
};

// 게시글 삭제 함수
const deleteBoard = async () => {
    const confirmDelete = confirm("정말로 게시글을 삭제하시겠습니까?");
    if (confirmDelete) {
        try {
            const userToken = localStorage.getItem("userToken")
            await boardStore.requestDeleteBoard(boardId, userToken);
            router.push('/board/list');
        } catch (error) {
            console.error("게시글 삭제 중 에러 발생:", error);
        }
    }
};

// 컴포넌트가 마운트될 때 데이터 요청
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

.neon-text {
    color: white;
    text-shadow: 0 0 10px rgba(255, 0, 255, 0.7);
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

.orange-button {
    background-color: rgba(255, 165, 0, 0.5);
    box-shadow: 0 0 10px rgba(255, 165, 0, 0.7);
}

.orange-button:hover {
    background-color: rgba(255, 165, 0, 0.7);
    box-shadow: 0 0 20px rgba(255, 165, 0, 1);
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

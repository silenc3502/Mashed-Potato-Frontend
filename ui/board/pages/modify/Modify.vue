<template>
    <v-container class="pa-4">
        <v-row>
            <v-col cols="12" md="8" offset-md="2">
                <v-card>
                    <v-card-title>
                        <span class="headline">평점 수정</span>
                        <v-spacer />
                        <v-btn color="primary" @click="goToListPage" icon>
                            <v-icon>mdi-arrow-left</v-icon>
                        </v-btn>
                    </v-card-title>

                    <v-card-subtitle>
                        <v-row>
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
                        ></v-select>

                        <v-text-field
                            v-model="boardDetails.rating"
                            label="평점 (1-5)"
                            type="number"
                            outlined
                            :rules="ratingRules"
                        ></v-text-field>
                    </v-card-text>

                    <v-divider />

                    <v-card-actions>
                        <v-btn color="primary" @click="updateBoard">수정 완료</v-btn>
                        <v-btn color="red" @click="goToListPage">취소</v-btn>
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

const carModels = ["스텔라 세단", "네오 SUV", "사이버 트럭 ", "오로라 미니버스", "퓨전 전기 버스","펄스 컴팩트카","루미너스 리무진","솔라 SUV","타이탄 카고 트럭","에스트라 세단","제타 컴팩트","오메가 컴팩트"];


const ratingRules = [
    value => (value >= 1 && value <= 5) || '평점은 1에서 5 사이여야 합니다.'
];

// 게시글 정보를 요청하는 함수
const fetchBoardDetails = async () => {
    try {
        await boardStore.requestReadBoard(boardId);
        if (boardStore.board) {
            // 응답 데이터에서 필요한 필드를 boardDetails에 매핑
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

// 게시글 수정 함수
const updateBoard = async () => {
    const userToken = localStorage.getItem("userToken");

    // 서버가 예상하는 데이터 형식에 맞게 구성
    const boardData = {
        carModel: boardDetails.value.carModel,
        rating: boardDetails.value.rating,
        userToken: userToken,  // userToken을 포함시킴
    };

    try {
        await boardStore.requestModifyBoard(boardId, boardData);
        router.push('/board/list');  // 수정 후 목록 페이지로 리디렉션
    } catch (error) {
        console.error("게시글 수정 중 에러 발생:", error);
    }
};

// 목록 페이지로 이동하는 함수
const goToListPage = () => {
    router.push('/board/list');
};

// 컴포넌트가 마운트될 때 데이터 요청
onMounted(fetchBoardDetails);
</script>

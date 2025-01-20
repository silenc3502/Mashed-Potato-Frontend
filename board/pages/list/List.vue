<template>
    <v-container class="dark-background">
        <h2 class="centered-title">Review List</h2>
        <v-row>
            <v-col cols="12">
                <v-card class="neon-card">
                    <v-card-title>
                        <v-btn
                            @click="goToCreateBoard"
                            class="neon-button"
                        >
                            게시글 작성하기
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <div v-if="boardList.length === 0">
                            <v-alert type="info" class="custom-alert">등록한 평점이 없습니다.</v-alert>
                        </div>

                        <v-data-table
                            v-else
                            :items="boardList"
                            :headers="headerTitle"
                            :items-per-page="pagination.itemsPerPage"
                            :page="pagination.page"
                            @update:page="pagination.page = $event"
                            @update:items-per-page="pagination.itemsPerPage = $event"
                            class="elevation-1 neon-table"
                            @click:row="goToDetail"
                            item-value="boardId"
                            dense
                        >
                            <template v-slot:[`item.createDate`]="{ item }">
                                {{ formatDate(item.createDate) }}
                            </template>
                        </v-data-table>

                        <v-pagination
                            v-model="currentPage"
                            :length="totalPages"
                            class="mt-3"
                        ></v-pagination>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useBoardStore } from '~/stores/boardStore';

const router = useRouter();
const boardStore = useBoardStore();

const boardList = computed(() => {
    return boardStore.boardList.map(board => ({
        boardId: board.boardId,
        carModel: board.carModel,
        rating: board.rating,   
        nickname: board.nickname,
        createDate: board.createDate
    }));
});

const totalPages = computed(() => boardStore.totalPages);
const currentPage = computed({
    get: () => boardStore.currentPage,
    set: (page) => {
        boardStore.currentPage = page;
    },
});

const pagination = ref({
    page: 1,
    itemsPerPage: 10
});

const headerTitle = [
    { title: 'No', align: 'start', sortable: true, key: 'boardId' },
    { title: '구매한 차 상품', align: 'end', key: 'carModel' },
    { title: '평점 (1-5)', align: 'end', key: 'rating' },
    { title: '작성자', align: 'end', key: 'nickname' },
    { title: '작성일자', align: 'end', key: 'createDate' },
];

const pageSize = ref(10);

watch(currentPage, async (newPage) => {
    await fetchBoardList(newPage);
});

const fetchBoardList = async (page = 1) => {
    await boardStore.requestBoardList({
        page,
        perPage: pageSize.value,
    });
};

const goToDetail = (event, { item }) => {
    if (item && item.boardId) {
        router.push({ path: `/board/read/${item.boardId}` });
    } else {
        console.error("게시글 ID가 없습니다:", item);
    }
};

const goToCreateBoard = () => {
    router.push({ path: '/board/register' });
};

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

onMounted(() => fetchBoardList(currentPage.value));
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
}

.custom-alert {
    background-color: rgba(40, 0, 60, 0.8);
    color: #ffffff;
    border: 2px solid rgba(255, 0, 255, 0.5);
    box-shadow: 0 0 15px rgba(255, 0, 255, 0.5);
    border-radius: 12px;
    font-size: 16px;
    text-shadow: 0 0 8px rgba(255, 0, 255, 0.7);
}

.neon-card {
    background-color: rgba(20, 20, 20, 0.8);
    border: 2px solid rgba(255, 0, 255, 0.5);
    box-shadow: 0 0 15px rgba(255, 0, 255, 0.5);
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
}

.neon-table {
    background-color: rgba(30, 30, 30, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: white;
}

.neon-table th {
    background-color: rgba(50, 50, 50, 0.9);
    color: white;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

.neon-table td {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
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
</style>

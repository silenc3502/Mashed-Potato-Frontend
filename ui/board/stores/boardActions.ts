import * as axiosUtility from "../../utility/axiosInstance"

export const boardAction = {
    async requestBoardList(payload) {
        const { djangoAxiosInstance } = axiosUtility.createAxiosInstances()

        const { page, perPage } = payload

        try {
            const res = await djangoAxiosInstance.get(`/board/list?page=${page}&perPage=${perPage}`);

            console.log("Response Data:", res.data);

            // 서버 응답 데이터 구조 확인 후 필요한 값만 추출
            const { dataList, totalItems, totalPages } = res.data;
            console.log(`boardList: ${dataList}, totalItems: ${totalItems}, totalPages: ${totalPages}`)

            // 데이터 설정
            this.boardList = dataList || [];        // boardList가 없으면 빈 배열
            this.totalPages = totalPages || 0;      // totalPages가 없으면 0
            this.totalItems = totalItems || 0;      // totalItems가 없으면 0
            this.currentPage = page;                // 현재 페이지는 요청한 page로 설정
        } catch (error) {
            console.error("requestBoardList() 중 에러:", error);

            // 에러가 발생하면 상태를 초기화
            this.boardList = [];
            this.totalPages = 0;
            this.totalItems = 0;
            this.currentPage = 1;                   // 실패 시 페이지는 1로 초기화
        }
    },
    
    
    
}
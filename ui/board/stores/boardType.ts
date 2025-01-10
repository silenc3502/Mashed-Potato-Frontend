export interface BoardState {
    boardList: Board[]
    board: Board | null
  
    currentPage: Number
    totalPages: Number
  }
  
  export interface Board {
    id: number;
    carModel: string;
    rating: number; // 평점 추가
    writer: string;
    createDate: string;
}

    
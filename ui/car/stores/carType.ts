export interface CarState {
    carList: Car[]
    car: Car | null
  
    currentPage: Number
    totalPages: Number
  }
  
  export interface Car {
    id: number
    title: string
    category: string
    price: string
    description: string
    image: string
  }
    
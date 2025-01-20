import { Car } from "./carType";

export const carState = () => ({
    carList: [] as Car[],
    car: null as Car | null,

    currentPage: 1,
    totalPages: 0
  })
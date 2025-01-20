import { defineStore } from "pinia";
import { carState } from "./carState";
import { carAction } from "./carActions";

export const useCarStore = defineStore('carStore', {
    state: carState,
    actions: carAction,
})
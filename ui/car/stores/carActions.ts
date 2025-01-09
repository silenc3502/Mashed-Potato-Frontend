import * as axiosUtility from "../../utility/axiosInstance"

export const carAction = {
    async requestCarList(page: number = 1, perPage: number = 8): Promise<void> {
        const { djangoAxiosInstance } = axiosUtility.createAxiosInstances()

        try {
            const res = await djangoAxiosInstance.get('/car/list', {
                params: { page, perPage }
            })
            console.log('Response Data:', res.data)

            this.carList = res.data.dataList
            this.totalPages = res.data.totalPages
            this.currentPage = page
        } catch (error) {
            console.log('requestCarList() 중 에러1:', error)
        }
    },
    async requestCreateCar(imageFormData: FormData): Promise<void> {
        console.log(`requestCreateCar(): ${imageFormData}`)
        const { djangoAxiosInstance } = axiosUtility.createAxiosInstances()

        try {
            const res = await djangoAxiosInstance.post('/car/create', 
                imageFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )
            console.log('Response Data:', res.data)
        } catch (error) {
            console.log('requestCreateCar() 중 에러2:', error)
        }
    },
    async requestCarById(id: string): Promise<any> {
        const { djangoAxiosInstance } = axiosUtility.createAxiosInstances();

        try {
            const res = await djangoAxiosInstance.get(`/car/read/${id}`);
            console.log('Response Data:', res.data);
            return res.data;
        } catch (error) {
            console.log('requestCarById() 중 에러:', error);
            throw error;
        }
    }
}
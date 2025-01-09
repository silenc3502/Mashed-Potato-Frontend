import { defineNuxtModule } from '@nuxt/kit';
import { resolve } from 'path';

export default defineNuxtModule({
    meta: {
        name: 'car',
        configKey: 'car',
    },

    setup(moduleOptions, nuxt) {
        const themeDir = resolve(__dirname, '..');

        nuxt.hook('pages:extend', (pages) => {
            // 판매 차량 모델 페이지 추가
            pages.push({
                name: 'CarList', // 라우트 이름
                path: '/car/list', // URL 경로
                file: resolve(themeDir, 'car/pages/list/List.vue'), // 페이지 파일 경로
            });
        
            pages.push({
                name: 'CarRegister',
                path: '/car/register',
                file: resolve(themeDir, 'car/pages/register/Register.vue'),
            });

            pages.push({
                name: 'CarRead',
                path: '/car/read/:id',
                file: resolve(themeDir, 'car/pages/read/Read.vue'),
            });
        });

        nuxt.hook('imports:dirs', (dirs) => {
            dirs.push(resolve(__dirname, 'store'));
        });
    },
});

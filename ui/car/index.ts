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
        });

        nuxt.hook('imports:dirs', (dirs) => {
            // Store 디렉토리 추가
            dirs.push(resolve(__dirname, 'store'));
        });
    },
});

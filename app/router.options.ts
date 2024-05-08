import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig>{
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }

        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
                top: 30,
            };
        }
        return { x: 0, y: 0, behavior: 'smooth' };
    },
};

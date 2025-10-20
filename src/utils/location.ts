import { createI18n } from 'vue-i18n';
import {es, en} from '@/constants'

export const i18n = createI18n({
    locale: 'es',
    fallbackLocale: 'en',
    messages: {
        es,
        en
    }
});

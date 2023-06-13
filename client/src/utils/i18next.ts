import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import httpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(httpBackend)
.use(LanguageDetector)
.use(initReactI18next)
.init({
    supportedLngs:['en','ka'],
    fallbackLng:'ka',
    debug:false,
    detection:{
        order:['cookie','localStorage','htmlTag'],
        caches:['cookie']
    },
    backend:{
        loadPath:`/assets/locales/{{lng}}/translation.json`
    }
})


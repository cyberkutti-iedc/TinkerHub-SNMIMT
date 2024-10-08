import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './en.json';
import ml from './ml.json';

Vue.use(VueI18n);

const messages = {
  en,
  ml,
};

const i18n = new VueI18n({
  locale: 'en', // default locale
  messages,
});

export default i18n;

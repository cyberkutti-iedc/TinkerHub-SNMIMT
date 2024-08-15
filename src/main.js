import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';
import './assets/main.css';
import './assets/tailwind.css';

// Import translation files
import en from './locales/en.json';
import ml from './locales/ml.json';

// Import FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

// Add FontAwesome icons to the library
library.add(faSun, faMoon);

// Create i18n instance
const i18n = createI18n({
  locale: 'en', // Default locale
  messages: {
    en,
    ml
  }
});

// Create and mount Vue app
const app = createApp(App);
app.use(router);
app.use(i18n);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');

import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import light from './light_theme.js';
import dark from './dark_theme.js';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: { light, dark },
    },
});

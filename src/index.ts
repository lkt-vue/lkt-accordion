
import {App, Plugin} from "vue";
import "../style.css";
import { default as accordion } from "./lib-components/LktAccordion.vue";
export const LktAccordion: Plugin = {
    install: (app: App, options?: {}) => {
        app.component('lkt-accordion', accordion);
    },
};
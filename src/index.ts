
import {App, Component, Plugin} from "vue";
import "../style.css";
import { default as accordion } from "./lib-components/LktAccordion.vue";
import {Settings} from "./settings/Settings";


const LktAccordion: Plugin = {
    install: (app: App) => {
        if (app.component('lkt-accordion') === undefined) app.component('lkt-accordion', accordion)
    },
};

export default LktAccordion;

export const setAccordionToggleSlot = (component: string|Component) => {
    Settings.toggleSlot = component;
    return true;
}
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from "primevue/confirmationservice";
import DialogService from "primevue/dialogservice";
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import Toolbar from "primevue/toolbar";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import SelectButton from "primevue/selectbutton";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Textarea from "primevue/textarea";
import Card from "primevue/card";
import i18n from "./i18n.js";

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
}).use(ConfirmationService)
    .use(DialogService)

app.component('pv-button', Button)
    .component('pv-avatar', Avatar)
    .component('pv-toolbar', Toolbar)
    .component('pv-input-text', InputText)
    .component('pv-float-label', FloatLabel)
    .component('pv-select-button', SelectButton)
    .component('pv-data-table', DataTable)
    .component('pv-column', Column)
    .component('pv-card', Card)
    .component('pv-textarea', Textarea)
    .component('pv-select-button', SelectButton);

app.use(i18n);

app.use(router);

app.mount('#app')
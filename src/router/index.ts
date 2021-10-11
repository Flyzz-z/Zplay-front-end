import {createRouter, createWebHistory} from "vue-router";
import Live from "../view/Live.vue";
import Video from "../view/Video.vue";
import Index from  "../view/Index.vue"


const routes = [
    { 
        path: "/", 
        component: Index,
        name: "index",
    },
    {
        path: "/video/:id",
        component: Video,
        name: "video",
        alias: "/v/:id"
    }
];



const router = createRouter({
    history: createWebHistory(),
    routes: routes, 
});

export default router;
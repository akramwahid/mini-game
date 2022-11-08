import Vue from 'vue'
import VueRouter from "vue-router";
import LeaderBoard from '@/components/LeaderBoard'
import GameGrid from '@/components/GameGrid'
import NewPlayer from '@/components/NewPlayer'

import store from '../store'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: LeaderBoard
        },

        {
            path: '/game/player',
            name: 'player',
            component: NewPlayer
        },

        {
            path: '/game/start',
            name: 'start',
            component: GameGrid
        },
    ]
});

router.beforeEach((to, from, next) => {

    if (to.name === 'home') {
        store.dispatch("fetchGameList");
        store.dispatch("fetchPlayerList");

    }
    next()
})
export default router;
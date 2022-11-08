import firebase from '@/utils/firebase'

const state = {
    gameList: [],
    progressGame: null
}

const getters = {
    getGameList(state) {
        return state.gameList
    },
    getProgressGame() {
        return state.progressGame
    }
}

const mutations = {
    setGameList(state, data) {
        state.gameList = data;
    },
    setProgressGame(state, data) {
        state.progressGame = data;
    }
}

const actions = {
    fetchGameList({commit}) {
        firebase.ref("games").on('value', games => {
            let items = [];
            games.forEach(data => {
                items.push({"id": data.key, ...data.val()})
            });

            commit('setGameList', []);
            if (items.length) {
                commit('setGameList', items);
            }
        });
    },
    fetchProgressGame({commit}, id) {
        firebase.ref("games").child(id).on('value', game => {
            let item = {
                "id": game.key, ...game.val()
            };

            commit('setProgressGame', null);
            if (item) {
                commit('setProgressGame', item);
            }
        });
    },
    addGame({commit, dispatch}, game) {
        return new Promise((resolve, reject) => {
            firebase.ref('games').push(game)
                .then((game) => {
                    dispatch("fetchGameList");
                    dispatch("fetchProgressGame", game.key);
                    localStorage.setItem('progressGame', JSON.stringify(game.key));
                    resolve();
                })
                .catch(err => {
                    console.log(err);
                })
        })
    },

    updateGame({commit, dispatch, state}, game) {
        return new Promise((resolve, reject) => {
            firebase.ref('games').child(state.progressGame.id).update(game)
                .then((game) => {
                    dispatch("fetchGameList");
                    commit('setProgressGame', null);

                    resolve();
                })
                .catch(err => {
                    console.log(err);
                })
        });

    }
}

export default ({
    state,
    mutations,
    getters,
    actions,
});

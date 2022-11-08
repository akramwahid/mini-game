import firebase from '@/utils/firebase'

const state = {
    playerList: [],
    playerDetails: null
}

const getters = {
    getPlayerList() {
        return state.playerList;
    },
    getPlayerDetails() {
        return state.playerDetails
    }
}

const mutations = {
    setPlayerList(state, data) {
        state.playerList = data;
    },
    setPlayerDetails(state, data) {
        state.playerDetails = data;
    }
}

const actions = {
    fetchPlayerList({commit}) {
        firebase.ref("players").on('value', player => {
            let items = [];
            player.forEach(data => {
                items.push({"id": data.key, ...data.val()})
            });

            commit('setPlayerList', []);
            if (items.length) {
                commit('setPlayerList', items);
            }
        });
    },
    fetchPlayerDetails({commit}, id) {
        return new Promise((resolve, reject) => {

            firebase.ref("players").child(id).on('value', player => {
                let item = {
                    "id": player.key, ...player.val()
                };

                commit('setPlayerDetails', null);
                if (item) {
                    commit('setPlayerDetails', item);
                }
                resolve();
            });


        })

    },
    addPlayer({commit, dispatch}, player) {
        return new Promise((resolve, reject) => {
            firebase.ref('players').push(player)
                .then((player) => {
                    dispatch("fetchPlayerList");
                    dispatch("fetchPlayerDetails", player.key);
                    localStorage.setItem('player', JSON.stringify(player.key));
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

<template>
    <section class="bg-light">
        <div class="container p-lg">
            <div class="row text-center">
                <div class="col-lg-12">
                    <h1>Leader Board</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-md-10">
                    <div class="hpanel">
                        <div class="panel-heading">
                            <h3>Highest Standings</h3>
                        </div>
                        <div class="panel-body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped fa-2x" cellspacing="1" cellpadding="1">
                                    <thead>
                                    <tr>
                                        <th class="text-center" style="width: 150px;">Rank</th>
                                        <th>Player Name</th>
                                        <th class="text-center" style="width: 150px;">Highest Score</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    <tr v-for="(game, index) in gameListSorted" :key="index">
                                        <td class="text-center">{{ (index + 1) }}</td>
                                        <td>{{ game.playerName }}</td>
                                        <td class="text-center">{{ game.score }}</td>
                                    </tr>


                                    <tr v-if="!gameListSorted.length">
                                        <td colspan="3">
                                            <div class="alert alert-warning">
                                                No records found.
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="col-md-2">
                    <div class="text-center m-t-xxxl">
                        <router-link :to="{name: 'player'}" class="fa-2x">
                            <i class="fa fa-gamepad text-success fa-4x"></i> <br>
                            New Player <i class="fa fa-arrow-right"></i>
                        </router-link>
                    </div>

                    <div class="text-center m-t-xxxl" v-if="player">
                        <router-link :to="{name: 'start'}" class="fa-2x">
                            <i class="fa fa-gamepad text-success fa-4x"></i> <br>
                            Last Player ({{ player.name }}) <i class="fa fa-arrow-right"></i>
                        </router-link>
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import * as _ from 'lodash';

    export default {
        name: 'LeaderBoard',
        computed: {
            gameListSorted() {
                const result = _.map(
                    _.groupBy(this.$store.getters.getGameList, 'playerKey'),
                    g => _.maxBy(g, 'score'),
                )
                return _.orderBy(result, ['score'], ['desc']);
                ;
            },

            player(){

                if (localStorage.getItem("player")) {
                    let playerId = JSON.parse(localStorage.getItem('player'));
                    this.$store.dispatch("fetchPlayerDetails", playerId);
                    return this.$store.getters.getPlayerDetails;
                }

                return null;
            }

        }
    }
</script>
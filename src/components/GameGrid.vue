<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="hpanel">
                    <div class="panel-body">
                        <div class="row text-center">
                            <div class="col-md-3 pull-left text-primary">
                                <i class="fa fa-certificate text-success fa-4x"></i>
                                <h1 class="m-xs">{{ scores }}</h1>
                                <h3 class="font-extra-bold no-margins ">
                                    Your Score
                                </h3>
                            </div>

                            <div class="col-md-3 pull-right text-primary">
                                <GameTimer/>
                            </div>
                        </div>

                        <div class="row ">
                            <div class="col-md-12 text-center">
                                <GameField
                                        :squareSize="squareSize"
                                        :unit="unit"
                                        @increase-points="increasePoints()"
                                />
                            </div>
                        </div>

                        <GameControl/>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import GameField from "./GameField";
    import GameTimer from "./GameTimer";
    import GameControl from "./GameControl";

    import constants from "../utils/constants";

    export default {
        name: "GameGrid",
        components: {
            GameField,
            GameTimer,
            GameControl
        },
        data() {
            return {
                squareSize: parseInt(constants.squareSize),
                unit: parseInt(constants.unitRow),
                scores: 0,
                scoreIncrementBy: constants.scoreIncrementBy
            };
        },
        methods: {

            async startGame() {
                this.$eventBus.$emit('game-started');

                //handle user state using cookie on page refresh,
                if (localStorage.getItem("player")) {
                    let playerId = JSON.parse(localStorage.getItem('player'));
                    await this.$store.dispatch("fetchPlayerDetails", playerId);
                }

                //let's save game info in firebase
                let player = this.$store.getters.getPlayerDetails;

                const game = {
                    score: 0,
                    playerKey: player.id,
                    playerName: player.name,
                    startedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                };

                await this.$store.dispatch("addGame", game);
                this.scores = 0;
            },

            async stopGame() {
                const game = {
                    score: this.scores
                }
                await swal('Game Over!', `You've scored ${this.scores} points.`, 'info');
                await this.$store.dispatch("updateGame", game);

                localStorage.removeItem("progressGame");
                this.$router.push({name: 'home'})
            },

            increasePoints() {
                this.scores += parseInt(this.scoreIncrementBy);
            },
        },

        mounted() {
            // begin a game
            this.startGame();
        },

        created() {
            this.$eventBus.$on('game-over', this.stopGame);
            this.$eventBus.$on('time-out', this.stopGame);
        },

        beforeDestroy() {
            this.$eventBus.$off('game-over');
            this.$eventBus.$off('time-out');
        }
    };
</script>




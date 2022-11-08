<template>
    <div>
        <div class="row text-right">
            <div class="col-md-4 pull-left text-left text-primary">
                <p class="font-extra-bold">Consider the direction based on where the Robot is facing.
                    Click "Rotate Right" to turn this side when Robot is Downward Facing </p>
            </div>
            <div class="col-md-4 pull-right text-right text-primary">
                <p class="font-extra-bold">Consider the direction based on where the Robot is facing.
                    Click "Rotate Left" to turn this side when Robot is Downward Facing </p>
            </div>

        </div>

        <div class="row m-t-lg m-b-xl">

            <div class="col-md-4 text-center">
                <GameControlButton @buttonClick="handleManeuver('rotateLeft')">
                    <i class="fa fa-rotate-left"></i><br>
                    Rotate Left
                </GameControlButton>
            </div>

            <div class="col-md-4 text-center">
                <GameControlButton @buttonClick="handleManeuver('rotateRight')">
                    <i class="fa fa-rotate-right"></i> <br>
                    Rotate Right
                </GameControlButton>
            </div>

            <div class="col-md-4 text-center">
                <GameControlButton @buttonClick="handleManeuver('moveAhead')">
                    <i class="fa fa-arrow-up"></i><br>
                    Move Ahead
                </GameControlButton>
            </div>
        </div>
    </div>
</template>
<script>
    import GameControlButton from "./GameControlButton";

    export default {
        name: "GameControl",
        components: {
            GameControlButton
        },
        methods: {
            handleManeuver(action){
                switch (action) {
                    case "rotateLeft" :
                        this.$eventBus.$emit('rotateLeft', -90);
                        break;

                    case "rotateRight":
                        this.$eventBus.$emit('rotateRight', 90);
                        break;

                    case "moveAhead":
                        this.$eventBus.$emit('moveAhead');
                        break;
                }
            }
        }

    }
</script>
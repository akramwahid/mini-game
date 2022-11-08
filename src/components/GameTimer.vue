<script>
    import constants from '../utils/constants';

    export default {
        name: "GameTimer",
        data() {
            return {
                timer: null,
                timespan: parseInt(constants.timeSpan)
            }
        },
        computed: {
            timePadded() {
                return (this.timespan < 10 ? '0' : '') + this.timespan;
            }
        },
        methods: {
            countdown: function () {
                if (this.timespan >= 1) {
                    this.timespan--;
                } else {
                    this.timespan = 0;
                    //trigger time out event, any listener can take necessary action
                    this.$eventBus.$emit('time-out');
                }
            },
            startTimer: function () {
                this.timer = setInterval(() => this.countdown(), 1000);
            },
            endTimer: function () {
                clearInterval(this.timer);
                this.timer = null;
            }
        },

        created() {
            this.$eventBus.$on('game-over', this.endTimer);

            /**
             * the timer run if timer is enabled in .env file,
             * set a boolean value in .env file named VUE_APP_ENABLE_TIME to enable/disable the timer
             * timer will start if game started event fired
             */
            if (constants.timerEnabled) {
                this.$eventBus.$on('game-started', this.startTimer);
            }
        },


        beforeDestroy() {
            this.$eventBus.$off('game-over');

            if (constants.timerEnabled) {
                this.$eventBus.$off('game-started');
            }

            //prevent memory leaks
            if (this.timer != null) {
                clearInterval(this.timer);
            }
        },
    }
</script>
<template>
    <div>
        <i class="fa fa-clock-o fa-4x text-danger"></i>
        <h1 class="m-xs ">{{ timePadded }}</h1>
        <h3 class="font-extra-bold no-margins ">
            Time Left
        </h3>
    </div>
</template>

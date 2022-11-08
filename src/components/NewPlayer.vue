<template>
    <div class="login-container">
        <div class="row">
            <div class="col-md-12">
                <div class="text-center m-b-md">
                    <h3 class="text-primary"><i class="fa fa-user-o fa-3x"></i></h3>
                </div>
                <div class="hpanel">
                    <div class="panel-body">
                        <form @submit.prevent="onSubmitForm" id="loginForm">
                            <div class="form-group">
                                <label class="control-label" for="name">Enter Your Name</label>
                                <input type="text" v-model="player.name" id="name" class="form-control input-lg">
                            </div>

                            <div class="text-center m-t-lg">
                                <button type="submit" class="btn btn-primary fa-2x">Start Game <i
                                        class="fa fa-arrow-right"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="col-md-12">
                <div class="hpanel">
                    <div class="panel-body">
                        <div class="row float-e-margins">
                            <div class="col-md-6">
                                <button class="btn btn-block btn-default" type="button"><i class="fa fa-cogs fa-2x"></i> <br>Game
                                    Settings
                                </button>
                            </div>

                            <div class="col-md-6">
                                <button class="btn btn-block btn-default" type="button"><i class="fa fa-question-circle fa-2x"></i> <br>Need
                                    Help
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'NewPlayer',
        data() {
            return {
                player: {
                    name: ''
                }
            }
        },
        methods: {
            async onSubmitForm() {
                if (this.player.name == '') {
                    toastr.error('Please enter your name');
                    return;
                }
                await this.$store.dispatch("addPlayer", this.player);
                this.$router.push({name: 'start'});
            }
        }
    }
</script>
<template>
    <div id="app">
        <div id="header">
            <div class="color-line">
            </div>
            <nav role="navigation">
                <router-link class="header-link" :to="{name: 'home'}"><i class="fa fa-home"></i></router-link>
                <div class="small-logo">
                    <span class="text-primary">Mini Game</span>
                </div>

            </nav>
        </div>

        <div id="wrapper">
            <div class="content">
                <router-view/>
            </div>
            <footer class="footer">Interview Task.
            </footer>
        </div>
    </div>

</template>

<script>
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'font-awesome/css/font-awesome.css';

    export default {
        name: 'App'
    }
</script>

<style src='./assets/vendor/metisMenu/dist/metisMenu.css'></style>
<style src='./assets/vendor/animate.css/animate.css'></style>
<style src='./assets/styles/style.css'></style>
<style src='./assets/styles/custom.css'></style>
<style src='./assets/styles/menu/css/style.css'></style>

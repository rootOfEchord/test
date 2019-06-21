<template>
    <div id="app">
        <!-- <test-scroll></test-scroll> -->
        <!-- <Emotions></Emotions> -->
        <Test></Test>
    </div>
</template>

<script>
    // import TestScroll from './components/test-scroll'
    // import Emotions from './components/Emotions'
    import Test from "./components/test";

    export default {
        name: 'app',
        components: {
            // TestScroll,
            // Emotions,
            Test
        },
        mounted() {
            // console.log('process.env', process.env)
        }
    }
</script>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>

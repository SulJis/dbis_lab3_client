<template>
    <button type="button" v-bind:class="colors[color]">{{ text }}</button>
</template>

<script>
    export default {
        name: "OutlineButton",
        props: {
            text: String,
            color: String
        },
        data(){
            return {
                colors: {
                    "red": "btn btn-outline-danger",
                    "yellow": "btn btn-outline-warning",
                    "green": "btn btn-outline-success",
                    "cyan": "btn btn-outline-info",
                    "blue": "btn btn-outline-primary",
                    "grey": "btn btn-outline-secondary"
                }
            }
        }
    }
</script>

<style scoped>

</style>
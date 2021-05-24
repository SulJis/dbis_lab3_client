<template>
    <div>
        <span>{{ linkDesc }} </span>
        <a v-bind:href="path" class="link-primary">{{ linkText }}</a>
    </div>
</template>

<script>
    export default {
        name: "TextLink",
        props: ["linkText", "linkDesc", "path"],
        data(){
            return {

            }
        }
    }
</script>

<style scoped>

</style>
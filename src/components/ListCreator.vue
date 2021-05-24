<template>
    <div class="d-flex">
        <FormInputText placeholder="List title..."
                       v-model="title"/>
        <OutlineButton text="New list"
                       color="blue"
                       v-on:click.native="createList"/>
    </div>
</template>

<script>
    import OutlineButton from "@/components/OutlineButton";
    import FormInputText from "@/components/FormInputText";
    export default {
        name: "ListCreator",
        components: {FormInputText, OutlineButton},
        data() {
            return {
                title: null
            }
        },
        methods: {
            createList() {
                this.$emit("list-creation", {title: this.title});
            }
        }
    }
</script>

<style scoped>
    .form-floating{
        width: 70%;
    }

    .d-flex{
        min-width: 300px;
        width: 50%;

        justify-content: space-around;
        padding: 10px;
    }
    button{
        margin-left: 10px;
        width: 150px;
    }
</style>
<template>
    <div >
        <div class="d-flex justify-content-between create-label-sec">
            <input type="text" class="form-control" placeholder="Input label title..."
                   v-model="labelData.text">
            <FormSelect
                    v-bind:options="colors"
                    title="color"
                    v-model="labelData.color"/>
            <OutlineButton
                    text="Create"
                    color="blue"
                    v-on:click.native="createLabel"/>
        </div>
    </div>
</template>

<script>
    import FormSelect from "@/components/FormSelect";
    import OutlineButton from "@/components/OutlineButton";
    export default {
        name: "LabelCreator",
        components: {OutlineButton, FormSelect},
        props: {
          listId: Number
        },
        data(){
            return {
                colors: ["blue", "green", "cyan", "yellow", "red", "dark"],
                createNew: false,
                labelData: {
                    listId: this.listId,
                    text: null,
                    color: null
                }
            }
        },
        methods: {
            createLabel(){
                this.$emit("label-creation", this.labelData);
            },
        }
    }
</script>

<style scoped>
    .create-label-sec{
        width: 100%;
        margin-bottom: 10px;
    }
    .d-flex{
        /*margin-top: 10px;*/
        flex-wrap: wrap;
        align-items: center;
    }
    .d-flex *{
        margin: 0 10px;
    }

    .form-control, .form-flating{
        margin-top: 0 !important;
    }
    .labels{
        width: 100%;
        margin: 0 10px;
    }
    button{
        margin: 0 !important;
        height: 38px;
        white-space: nowrap;
    }
</style>
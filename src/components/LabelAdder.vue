<template>
    <div class="add-label-sec">
        <FormSelect
                v-bind:options="labelTitles"
                title="Labels"
                v-model="label"/>
        <OutlineButton
                text="Add"
                color="blue"
                v-on:click.native="labelAdding"/>
    </div>
</template>

<script>
    import OutlineButton from "@/components/OutlineButton";
    import FormSelect from "@/components/FormSelect";
    import axios from "axios";
    import getToken from "@/utils/routine";
    export default {
        name: "LabelAdder",
        components: {FormSelect, OutlineButton},
        props: {
            listId: Number,
        },
        data() {
            return {
                labels: null,
                labelTitles: [],
                label: null
            }
        },
        methods: {
            labelAdding(){
                const data = {
                    labelId: this.getLabelId(this.label),
                    listId: this.listId,
                    labelText: this.label
                };
                // bus.$emit("label-addition", data);
                this.$emit("label-addition", data);
            },

            getLabelId(){
                return this.labels.filter(label => label.text === this.label)[0].id;
            }
        },
        mounted(){
            axios.get(`${process.env.VUE_APP_SERVER_URL}/api/get/labels`, {
                headers: getToken()
            }).then(res => {
                if (res.status === 200){
                    this.labels = res.data.labels;
                    this.labels.forEach(label => this.labelTitles.push(label.text));
                    this.label = this.labelTitles[0];
                }
            });
        }
    }
</script>

<style scoped>
    .add-label-sec{
        display: flex;
        flex-direction: row;
        height: 22px;
        margin: 0 0 10px 10px;
    }
    button{
        height: 31px;
        line-height: 31px;
        padding: 0 10px;
        margin-left: 10px;
    }
    /deep/.form-select{
        padding: 0 30px 0 0;
        height: 31px;
    }
    /deep/.form-flating{
        padding: 0 5px 0 0;
    }
</style>
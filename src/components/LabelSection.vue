<template>
    <div class="label-section">
        <ul class="flex-column list-group">
            <Label v-for="label in labels"
                    :key="label.id"
                    v-bind:id="label.id"
                    v-on:label-deletion="deleteLabel"/>
            <LabelShimmer v-if="fetchingNewLabel"/>
        </ul>
        <LabelCreator v-if="creatingNewLabel" v-on:label-creation="createLabel"/>
        <OutlineButton text="New label" color="green" v-on:click.native="creatingNewLabel = !creatingNewLabel"/>
        <OutlineButton text="Clear filters" color="grey"
        v-on:click.native="clearFilters"/>
    </div>
</template>

<script>
    import LabelCreator from "@/components/LabelCreator";
    import OutlineButton from "@/components/OutlineButton";
    import Label from "@/components/Label";
    import bus from "@/bus";
    import LabelShimmer from "@/components/LabelShimmer";
    import axios from "axios";
    import getToken from "@/utils/routine";
    export default {
        name: "LabelSection",
        components: {LabelShimmer, Label, OutlineButton, LabelCreator},
        data(){
            return{
                labels: null,
                creatingNewLabel: false,
                fetchingNewLabel: false
            }
        },
        methods: {
            createLabel(labelData){
                this.fetchingNewLabel = true;
                this.creatingNewLabel = false;
                axios.post(`${process.env.VUE_APP_SERVER_URL}/api/create/label`, labelData, {
                    headers: getToken()
                }).then(res => {
                    if (res.status === 200){
                        this.labels.push(res.data);
                        this.fetchingNewLabel = false;
                    }
                }).catch(() => this.fetchingNewLabel = false);
            },

            deleteLabel(labelId){
                axios.delete(`${process.env.VUE_APP_SERVER_URL}/api/delete/label/${labelId}`, {
                    headers: getToken()
                }).then( res => {
                    if (res.status === 200){
                        this.labels = this.labels.filter(label => {
                            return label.id !== labelId
                        });
                        bus.$emit("list-label-deletion", labelId);
                    }
                });
            },

            clearFilters(){
                bus.$emit("clear-filters");
            }
        },

        mounted() {
            axios.get(`${process.env.VUE_APP_SERVER_URL}/api/get/labels`, {
                headers: getToken()
            }).then(res => {
                if (res.status === 200){
                    this.labels = res.data.labels;
                }
            });
        }

    }
</script>

<style scoped>
    .label-section{
        width: 200px;
        min-width: 200px;
        margin: 98px 20px 0 0;
    }
    .label:last-child{
        margin-bottom: 10px;
    }
    .btn{
        width: 100%;
        margin-bottom: 5px;
    }
    /deep/.form-flating, /deep/.form-control{
        margin: 5px 0;
    }
    .label-yellow{
        color: #d99236;
        border: 1px solid #ffca10;
    }

    .label-red{
        color: #dc3545;
        border: 1px solid #dc3545;
    }
    .label-blue{
        color: #0d6efd;
        border: 1px solid #0d6efd;
    }
    .label-green{
        color: #198754;
        border: 1px solid #198754;
    }
    .label-grey{
        color: #6c757d;
        border: 1px solid #6c757d;
    }
    .label-dark{
        color: #212529;
        border: 1px solid #212529;
    }
    .label-cyan{
        color: #0d778e;
        border: 1px solid #0dcaf0;
    }
</style>
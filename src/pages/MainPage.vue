<template>
    <div class="container">
        <LabelSection v-bind:labels="labels"/>
        <div class="list-container">
            <div class="list-creator-sec">
                <ListCreator v-on:list-creation="createList"/>
            </div>
            <div class="row">
                <div class="col" v-if="fetchingNewList">
                    <ListShimmer/>
                </div>
                <div class="col" v-for="list in lists" :key="list.id">
                    <List
                        :id="list.id"
                        :title="list.title"
                        v-on:list-deletion="deleteList"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import List from "@/components/List";
    import ListCreator from "@/components/ListCreator";
    import LabelSection from "@/components/LabelSection";
    import bus from "@/bus";
    import getToken from "@/utils/routine";
    import ListShimmer from "@/components/ListShimmer";

    export default {
        name: "MainPage",
        components: {ListShimmer, LabelSection, ListCreator, List},
        data(){
            return {
                user: null,
                lists: null,
                labels: null,
                fetchingNewList: false
            }
        },

        methods: {
            setLists(res){
                this.lists = res.data.lists;
            },

            setUser(res){
                this.user = {
                    id: res.data.id,
                    email: res.data.email
                }
            },

            setLabels(res){
              this.labels = res.data.labels;
            },

            async createList(listData){
                this.fetchingNewList = true;
                const res = await axios.post(`${process.env.VUE_APP_SERVER_URL}/api/create/list`, listData, {
                    headers: getToken()
                });
                if (res.status === 200) {
                    this.lists.unshift(res.data);
                    this.fetchingNewList = false;
                }
                this.fetchingNewList = false;
            },

            async deleteList(listId){
                const res = await axios.delete(`${process.env.VUE_APP_SERVER_URL}/api/delete/list/${listId}`, {
                    headers: getToken()
                });
                if (res.status === 200) {
                    this.lists = this.lists.filter(list => {
                        return list.id !== listId;
                    });
                }
            },


            async filterByLabel(labelId){
                const res = await axios.get(`${process.env.VUE_APP_SERVER_URL}/api/get/lists/by-label/${labelId}`, {
                    headers: getToken()
                });
                if (res.status === 200){
                    this.lists = res.data.lists;
                }
            },

            async clearFilters(){
                const listsRes = await axios.get(`${process.env.VUE_APP_SERVER_URL}/api/get/lists`, {
                    headers: getToken()
                });
                this.lists = listsRes.data.lists;
            }
        },

        created(){
            axios.get(`${process.env.VUE_APP_SERVER_URL}/api/get_user`, {
                headers: getToken()
            })
            .then(res => {
                this.setLists(res);
                this.setUser(res);
                this.setLabels(res);
            })
            .catch(err => {
                console.log(err);
                this.$router.push("/login");
            });
        },
        mounted(){
            bus.$on("filter-by-label", this.filterByLabel);
            bus.$on("clear-filters", this.clearFilters);
        }
    }
</script>

<style scoped>
    .list-group{
        /*width: 350px;*/
        text-align: start;
    }

    .list-creator-sec{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
    }

    .container{
        margin: 0;
        width: 100%;
        max-width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .list-container{
        width: 100%;
    }
</style>
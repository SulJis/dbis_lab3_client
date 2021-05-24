<template>
    <ListShimmer v-if="fetching"/>
    <div class="card mb-3 border-dark" v-else>
        <div class="card-header">
            <p contenteditable v-on:blur="updateTitle">{{ title }}
            </p>
            <div class="d-flex label-container">
                <div class="d-flex">
                    <ListLabel
                            v-for="label in labels"
                            :key="label.text"
                            v-bind:list-id="id"
                            v-bind:label-id="label.id"
                            v-bind:text="label.text"
                            v-bind:color-value="label.color"
                            v-on:label-unpinning="unpinLabel"/>
                    <ListLabelShimmer v-if="fetchingNewLabel"/>
                    <ListLabel
                            text="+"
                            color-value="green"
                            v-bind:editable="false"
                            v-on:click.native="addingLabel = !addingLabel"/>
                </div>
                <LabelAdder v-bind:list-id="id"
                            v-if="addingLabel"
                            v-on:label-addition="addLabel"/>
            </div>
        </div>
        <div class="card-body text-dark">
            <Note v-for="note in notes"
                  :key="note.id"
                  v-bind:note-id="note.id"
                  v-on:note-deletion="deleteNote"/>
            <NoteShimmer v-if="fetchingNewNote"/>
        </div>
        <NoteCreator v-bind:list-id="id"
                     v-if="creatingNewNote"
                     v-on:note-creation="createNote"/>
        <div class="button-container d-flex">
            <OutlineButton
                    text="New note"
                    color="green"
                    v-on:click.native="creatingNewNote=!creatingNewNote"/>
            <OutlineButton
                    text="Remove list"
                    color="red"
                    v-on:click.native="deletion"/>
        </div>
    </div>
</template>

<script>
    import Note from "@/components/Note";
    import OutlineButton from "@/components/OutlineButton";
    import NoteCreator from "@/components/NoteCreator";
    import LabelAdder from "@/components/LabelAdder";
    import ListLabel from "@/components/ListLabel";
    import axios from "axios";
    import getToken from "@/utils/routine";
    import NoteShimmer from "@/components/NoteShimmer";
    import ListLabelShimmer from "@/components/ListLabelShimmer";
    import ListShimmer from "@/components/ListShimmer";
    import bus from "@/bus";
    export default {
        name: "List",
        components: {ListShimmer, ListLabelShimmer, NoteShimmer, ListLabel, LabelAdder, NoteCreator, OutlineButton, Note},
        props: {
            id: Number
        },
        data(){
            return {
                title: null,
                notes: null,
                labels: null,
                creatingNewNote: false,
                addingLabel: false,
                fetching: true,
                fetchingNewNote: false,
                fetchingNewLabel: false
            }
        },
        methods: {
            deletion(){
                this.$emit("list-deletion", this.id);
            },

            createNote(noteData){
                this.creatingNewNote = false;
                this.fetchingNewNote = true;
                axios.post(`${process.env.VUE_APP_SERVER_URL}/api/create/note`, noteData, {
                    headers: getToken()
                }).then(res => {
                    if (res.status === 200){
                        const note = res.data;
                        this.notes.push(note);
                        this.fetchingNewNote = false;
                    }
                }).catch(() => this.fetchingNewNote = false);
            },

            deleteNote(noteId){
                axios.delete(`${process.env.VUE_APP_SERVER_URL}/api/delete/note/${noteId}`, {
                    headers: getToken()
                }).then(res => {
                    if (res.status === 200){
                        this.notes = this.notes.filter(note => {
                            return note.id !== noteId;
                        });
                    }
                });
            },

            updateTitle(e){
                this.listTitle = e.target.textContent.trim();
                console.log(this.listTitle);
                axios.put(`${process.env.VUE_APP_SERVER_URL}/api/update/list/${this.id}`, {
                    title: this.listTitle
                }, {
                    headers: getToken()
                }).then(res => console.log(res.data));
            },

            addLabel(labelData){
                this.addingLabel = false;
                this.fetchingNewLabel = true;
                axios.put(
                `${process.env.VUE_APP_SERVER_URL}/api/update/list/${labelData.listId}/add-label/${labelData.labelId}`,
                {}, {
                    headers: getToken()
                }).then(res => {
                    if (res.status === 200){
                        this.labels.push(res.data.label);
                        this.fetchingNewLabel = false;
                    }
                }).catch(() => this.fetchingNewLabel = false);
            },

            unpinLabel(data){
                axios.put(`${process.env.VUE_APP_SERVER_URL}/api/update/list/${data.listId}/unpin/${data.labelId}`,
                {}, {
                    headers: getToken()
                }).then(res => {
                    if (res.status === 200){
                        this.labels = this.labels.filter(label => label.id !== data.labelId);
                    }
                });
            },

            changeLabel(labelData){
                this.labels.forEach(label => {
                    if (label.id === labelData.id){
                        label.text = labelData.text;
                        label.color = labelData.color;
                    }
                });
            },
            deleteLabel(labelId){
                this.labels = this.labels.filter(label => label.id !== labelId);
            }
        },
        created(){
          bus.$on("change-label", this.changeLabel);
          bus.$on("list-label-deletion", this.deleteLabel);
        },

        mounted(){
            axios.get(`${process.env.VUE_APP_SERVER_URL}/api/get/list/${this.id}`, {
                headers: getToken()
            }).then(res => {
                if (res.status === 200){
                    this.title = res.data.title;
                    this.notes = res.data.notes;
                    this.labels = res.data.labels;
                    this.fetching = false;
                }
            });
        }
    }
</script>

<style scoped>
    .card{
        min-width: 400px;
        max-width: 600px;
    }
    .button-container{
        padding: 16px;
        justify-content: space-between;
    }
    .badge{
        margin: 0 10px;
    }
    .label-container{
        flex-wrap: wrap;
        gap: 10px;
        /*height: 26px;*/
    }

    .label{
        line-height: 20px;
    }
    /deep/.label:last-child{
        width: 30px;
    }
    /deep/.label:last-child > .badge:hover{
        color: white;
        background-color: #198754;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }

    /deep/.form-floating{
        height: 40px;
    }
</style>
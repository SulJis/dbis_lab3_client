<template>
    <NoteShimmer v-if="fetching"/>
    <div class="list-group-item d-flex w-100 justify-content-between" v-else
            v-bind:class="{'checked': noteParams.checked}">
            <div class="d-flex">
                <input class="form-check-input me-1"
                       type="checkbox"
                       value=""
                       aria-label="..."
                       v-bind:checked="noteParams.checked"
                       v-model="noteParams.checked"
                       v-on:change="updateChecked">
                <div class="note-text-container">
                    <p contenteditable="true"
                       v-on:blur="textBlur"
                        v-bind:class="{'striked': noteParams.checked}">
                        {{ noteParams.text }}
                    </p>
                </div>
            </div>
            <div class="d-flex justify-content-between date-button">
                <CustomDatePicker
                        v-model="noteParams.deadline"
                        v-bind:value="noteParams.deadline"
                        v-on:change="updateDeadline"/>
                <OutlineButton
                        text="Delete"
                        color="red"
                        v-on:click.native="deletion"/>
            </div>
    </div>
</template>

<script>
    import CustomDatePicker from "@/components/CustomDatePicker";
    import OutlineButton from "@/components/OutlineButton";
    import axios from "axios";
    import getToken from "@/utils/routine";
    import NoteShimmer from "@/components/NoteShimmer";

    export default {
        name: "Note",
        components: {NoteShimmer, OutlineButton, CustomDatePicker},
        props: {
            noteId: Number
        },
        data(){
            return {
                editing: true,
                fetching: true,
                noteParams: {
                    noteId: null,
                    listId: null,
                    text: null,
                    checked: null,
                    deadline: null
                }
            }
        },
        methods: {
            textBlur(e){
                this.noteParams.text = e.target.textContent.trim();
                axios.put(`${process.env.VUE_APP_SERVER_URL}/api/update/note/${this.noteId}`, {
                    text: this.noteParams.text
                }, {
                    headers: getToken()
                }).then(res => console.log(res.data));
            },

            updateChecked(){
                axios.put(`${process.env.VUE_APP_SERVER_URL}/api/update/note/${this.noteId}`, {
                    checked: this.noteParams.checked
                }, {
                    headers: getToken()
                }).then(res => console.log(res.data));
            },

            updateDeadline(){
                axios.put(`${process.env.VUE_APP_SERVER_URL}/api/update/note/${this.noteId}`, {
                    deadline: this.noteParams.deadline
                }, {
                    headers: getToken()
                }).then(res => console.log(res.data));
            },

            deletion(){
                this.$emit("note-deletion", this.noteId);
            }
        },

        mounted(){
            axios.get(`${process.env.VUE_APP_SERVER_URL}/api/get/note/${this.noteId}`, {
                headers: getToken()
            }).then(res => {
                if (res.status === 200){
                    this.noteParams = res.data;

                    console.log(this.noteParams);
                    this.fetching = false;
                }
            });
        }
    }
</script>

<style scoped>
    .list-group-item{
        align-items: center;
        flex-wrap: wrap;
        gap: 15px;
    }
    .form-check-input{
        min-width: 15px;
    }
    p{
        text-align: justify;
        margin: 0 10px;
    }
    /deep/ .mx-datepicker{
        width: 115px;
    }
    .btn{
        height: 34px;
    }

    .date-button{
        width: 100%;
    }

    p{
        overflow-wrap: anywhere;
    }
    .striked{
        text-decoration: line-through;
    }
    .checked{
        background-color: #f2f4f5;
    }
</style>
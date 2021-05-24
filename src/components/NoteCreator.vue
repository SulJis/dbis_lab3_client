<template>
    <div class="list-group-item">
        <div>
            <textarea class="form-control" placeholder="Input your note here..." id="floatingTextarea2"
                      v-model="noteData.text"
                      v-on:input="auto_grow"
            ></textarea>
        </div>
        <div class="d-flex justify-content-between">
            <CustomDatePicker v-model="noteData.deadline"/>
            <OutlineButton text="Create" color="blue" v-on:click.native="createNote"/>
        </div>
    </div>
</template>

<script>
    import CustomDatePicker from "@/components/CustomDatePicker";
    import OutlineButton from "@/components/OutlineButton";
    export default {
        name: "NoteCreator",
        components: {OutlineButton, CustomDatePicker},
        props: {
          listId: Number
        },
        data(){
            return {
                noteData: {
                    listId: this.listId,
                    text: null,
                    deadline: null
                }
            }
        },
        methods: {
            auto_grow(e) {
                const element = e.target;
                element.style.height = (element.scrollHeight)+"px";
            },

            createNote(){
                // bus.$emit("note-creation", this.noteData);
                this.$emit("note-creation", this.noteData);
            }
        }
    }
</script>

<style scoped>
    /deep/.mx-datepicker{
        width: 120px;
    }
    button{
        height: 34px;
    }

    textarea{
        margin-bottom: 10px;
        height: 60px;
        min-height: 60px;
    }

</style>
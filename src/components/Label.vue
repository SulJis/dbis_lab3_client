<template>
    <LabelShimmer v-if="fetching"/>
    <div class="label badge d-flex list-group-item" v-else
         tabindex="1"
         v-bind:class="colors[color]">
        <div class="d-flex label-default">
            <div class="tag-span">
                <TagIcon
                    v-on:click.native="filter"
                />
                <span
                    v-bind:contenteditable="editing"
                    v-on:blur="editText">
                    {{ text }}</span>
            </div>
            <SlidersIcon v-on:click.native="editing = !editing"/>
        </div>
        <div class="edit-sec" v-if="editing">
            <FormSelect
                    v-bind:options="Object.keys(colors)"
                    v-bind:selected-value="color"
                    v-model="color"/>
            <div class="buttons">
                <OutlineButton
                        style="margin-right: 5px"
                        text="Save"
                        color="blue"
                        v-on:click.native="confirmEditing"/>
                <OutlineButton
                        text="Delete"
                        color="red"
                        v-on:click.native="deletion"/>
            </div>
        </div>
    </div>
</template>

<script>
    import FormSelect from "@/components/FormSelect";
    import OutlineButton from "@/components/OutlineButton";
    import TagIcon from "@/components/TagIcon";
    import SlidersIcon from "@/components/SlidersIcon";
    import axios from "axios";
    import bus from "@/bus";
    import getToken from "@/utils/routine";
    import LabelShimmer from "@/components/LabelShimmer";
    export default {
        name: "Label",
        components: {LabelShimmer, SlidersIcon, TagIcon, OutlineButton, FormSelect},
        props: {
            id: Number,
            editable: {
              type: Boolean,
              default: true
            },
        },
        data(){
            return {
                editing: false,
                fetching: true,
                text: null,
                color: null
                ,
                colors: {
                    "blue": "label-blue",
                    "grey": "label-grey",
                    "green": "label-green",
                    "red": "label-red",
                    "yellow": "label-yellow",
                    "cyan": "label-cyan",
                    "dark": "label-dark"
                }
            }
        },
        methods: {
            filter(e){
                e.stopPropagation();
                bus.$emit("filter-by-label", this.id);
            },
            editText(e){
              this.text = e.target.textContent.trim();
            },

            confirmEditing(){
                const data = {
                    id: this.id,
                    text: this.text,
                    color: this.color
                }
                axios.put(`${process.env.VUE_APP_SERVER_URL}/api/update/label/${this.id}`, data, {
                    headers: getToken()
                }).then(res => {
                    if (res.status === 200) {
                        bus.$emit("change-label", data);
                        }
                    }
                );
                this.editing = false;

            },
            deletion(){
                this.$emit("label-deletion", this.id);
            },
        },
        mounted(){
            axios.get(`${process.env.VUE_APP_SERVER_URL}/api/get/label/${this.id}`, {
                headers: getToken()
            }).then(res => {
                if (res.status === 200){
                    this.text = res.data.text;
                    this.color = res.data.color ? res.data.color : "blue";
                    this.fetching = false;
                }
            });
        }
    }
</script>

<style scoped>
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

    .label{
        display: flex;
        flex-direction: column;
        font-size: 0.8em;
        padding: 10px;
        margin-bottom: 2px;
        transition: border-color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        border: 1px solid;
    }

    .bi-tag{
        margin-right: 10px;
        cursor: pointer;
    }
    .bi-sliders{
        cursor: pointer;
    }
    .tag-span{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .label-default{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    /deep/.form-flating{
        display: block;
        height: 30px;
        font-size: 5px;
        margin-bottom: 10px !important;

    }
    /deep/.form-select{
        padding: 5px;
    }

    .buttons{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 10px;
    }
    button{
        height: 25px;
        padding: 0;
        margin: 0;
        font-size: 1em;
        width: 100%;
    }
    .edit-sec > *{
        margin-top: 10px;
    }
</style>
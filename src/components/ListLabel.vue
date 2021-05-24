<template>
    <div class="label badge d-flex justify-content-center"
         tabindex="1"
         v-bind:class="colors[color]"
         v-on:focus="editing = true"
         v-on:blur.capture="onBlur">
        <span>{{ text }}</span>
        <OutlineButton text="✖" color="red"
                       v-if="editable && editing"
                       v-on:mousedown.native="unpinLabel"
        />
    </div>
</template>

<script>
    import OutlineButton from "@/components/OutlineButton";
    export default {
        name: "ListLabel",
        components: {OutlineButton},
        props: {
            labelId: Number,
            listId: Number,
            text: String,
            editable: {
                type: Boolean,
                default: true
            },
            colorValue: {
                type: String
            }
        },
        data(){
            return {
                editing: false,
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
        computed: {
            color(){
                return this.colorValue ? this.colorValue : "blue";
            }
        },
        methods: {
            onBlur(e){
                e.stopPropagation();
                this.editing = false
            },
            unpinLabel(e){
                e.preventDefault();
                const data = {
                    listId: this.listId,
                    labelId: this.labelId
                };
                this.$emit("label-unpinning", data);
            }
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
        display: inline;
    }
    .badge{
        cursor: pointer;
    }

    .d-flex{
        align-items: center;
    }

    button{
        margin-left: 5px;
        padding: 0;
        width: 25px;
        line-height: 18px;
    }
</style>
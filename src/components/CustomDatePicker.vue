<template>
    <date-picker
            v-model="time"
            valueType="format"
            v-bind:placeholder="title"
            v-on:change="$emit('change', $event)">
    </date-picker>
</template>

<script>
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    export default {
        components: { DatePicker },
        model: {
            prop: "time",
            event: "change"
        },
        props: ["title", "value"],
        data() {
            return {
                time: this.value,
            };
        },
        methods: {
            change(){
                return this.time;
            }
        },
    };
</script>

<style scoped>
    /deep/.mx-datepicker{
        width: 100%;
    }
</style>
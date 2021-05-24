<template>
    <div class="form-floating">
        <input v-bind:type="type"
               class="form-control"
               v-on:input="$emit('input', $event.target.value)"
               v-bind:id="id"
               v-bind:placeholder="placeholder">
        <label v-bind:for="id">{{ placeholder }}</label>
    </div>
</template>

<script>
    export default {
        name: "FormInputText",
        model: {
          prop: "value",
          event: "input"
        },
        props:{
            type: String,
            id: String,
            placeholder: String,
            value: String
        }
    }
</script>

<style scoped>

</style>
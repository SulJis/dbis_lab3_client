<template>
    <div class="form-flating">
        <select
                class="form-select"
                v-on:change="$emit('change', $event.target.value)">
            <option
                    disabled
                    value=""
                    v-if="title !== ''">{{ title }}</option>
            <option
                    v-for="val in options"
                    :key="val"
                    v-bind:value="val"
                    v-bind:selected="selectedValue === val">{{ val }}</option>
        </select>
    </div>
</template>

<script>
    export default {
        name: "FormSelect",
        model: {
            prop: "value",
            event: "change"
        },
        props: {
            title: String,
            options: Array,
            selectedValue: String
        }
    }
</script>

<style scoped>

</style>
<template>
    <div>
        <VueSkeletonLoader
                :width="width"
                :height="30"
                :rounded="true"
                style="margin: 0 10px"
        />
    </div>

</template>

<script>
    import VueSkeletonLoader from 'skeleton-loader-vue';
    export default {
        components: { VueSkeletonLoader },
        props: {
            width: {
                type: Number,
                default: 100
            }
        },
        data(){
            return {
                animationStyle: "fade"
            }
        }
    };
</script>

<style scoped>

</style>
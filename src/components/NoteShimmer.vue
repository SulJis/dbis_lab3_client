<template>
    <div class="list-group-item d-flex w-100 justify-content-between">
        <div class="d-flex">
            <VueSkeletonLoader
                type="rect"
                :rounded="true"
                :width="20"
                :height="20"
                :animation="animationStyle"
        />

            <VueSkeletonLoader
                    class="text-shimmer"
                    type="rect"
                    :rounded="true"
                    :width="300"
                    :height="20"
                    :animation="animationStyle"/>
        </div>
        <div class="d-flex justify-content-between date-button">
            <VueSkeletonLoader
                    type="rect"
                    :rounded="true"
                    :width="115"
                    :height="34"
                    :animation="animationStyle"/>
            <VueSkeletonLoader
                    type="rect"
                    :rounded="true"
                    :width="73"
                    :height="34"
                    :animation="animationStyle"/>
        </div>
    </div>
</template>

<script>
    import VueSkeletonLoader from 'skeleton-loader-vue';
    export default {
        components: { VueSkeletonLoader },
        data(){
            return {
                animationStyle: "fade"
            }
        }
    };
</script>

<style scoped>
    .text-shimmer{
        margin: 0 10px;
    }
    .list-group-item{
        align-items: center;
        flex-wrap: wrap;
        gap: 15px;
    }

    .date-button{
        width: 100%;
    }
</style>
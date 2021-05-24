<template>
    <div class="label-shimmer badge d-flex">
        <div class="d-flex">
            <VueSkeletonLoader
                    :width="20"
                    :height="20"
                    :rounded="true"
            />
            <VueSkeletonLoader
                    style="margin-left: 5px"
                    :width="100"
                    :height="20"
                    :rounded="true"
                />
        </div>
        <VueSkeletonLoader
                :width="20"
                :height="20"
                :rounded="true"
        />
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
    .label-shimmer{
        justify-content: space-between;
        margin-bottom: 2px;
        border: 1px solid #212529;
        height: 38px;
        align-items: center;
    }
</style>
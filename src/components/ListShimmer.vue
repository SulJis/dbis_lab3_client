<template>
    <div class="card mb-3 border-dark">
        <div class="card-header d-flex justify-content-center">
            <VueSkeletonLoader class="list-title"
                :width="100"
                :height="24"
                :rounded="true"
            />
            <div class="d-flex label-container">
                <ListLabelShimmer/>
                <ListLabelShimmer :width="70"/>
                <ListLabelShimmer :width="80"/>
                <ListLabelShimmer :width="30"/>
            </div>
        </div>
        <div class="card-body text-dark">
            <NoteShimmer/>
        </div>
        <div class="button-container d-flex">
            <VueSkeletonLoader
                :width="94"
                :height="38"
                :rounded="true"
            />
            <VueSkeletonLoader
                    :width="110"
                    :height="38"
                    :rounded="true"
            />
        </div>
    </div>
</template>

<script>
    import VueSkeletonLoader from 'skeleton-loader-vue';
    import NoteShimmer from "@/components/NoteShimmer";
    import ListLabelShimmer from "@/components/ListLabelShimmer";
    export default {
        components: {ListLabelShimmer, NoteShimmer, VueSkeletonLoader },
        data(){
            return {
                animationStyle: "fade"
            }
        }
    };
</script>

<style scoped>
    .card{
        min-width: 400px;
        padding: 0;
        /*max-width: 600px;*/
    }
    .list-title{
        margin-bottom: 16px;
    }
    .card-header{
        flex-direction: column;
        align-items: center;
    }
    .label-container{
        justify-content: flex-start;
        width: 100%;
    }
    .button-container{
        padding: 16px;
        justify-content: space-between;
    }
</style>
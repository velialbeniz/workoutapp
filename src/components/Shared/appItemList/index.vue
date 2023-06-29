<template>
    <div class="col-md-9 p-3">
        <div class="row text-center">
            <ListItem v-for="item in items" :key="item.id" :item="item" @show-details="$emit('show-details', $event)" />
        </div>
    </div>
    
</template>
<script>
    import ListItem from "./ListItem.vue"
    export default {
        components: {
            ListItem,
        },
        props: {
            items : {
                type: Array,
                required : true,
                default : () => []
            }
        }
    }
</script>
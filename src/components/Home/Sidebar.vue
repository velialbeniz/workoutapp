<template>
    <div class="col-md-3">
        <aside class="sidebar">
            <a v-for="category in categoryList" :key="category.id" @click.prevent="$emit('category-changed', category.id)" href="#" class="sidebar-item button btn btn-secondary">
                {{ category.name }}
            </a>
            <a @click.prevent="$emit('category-changed', null)" href="#" class="sidebar-item button btn btn-secondary">
                Show All
            </a>
            
        </aside>

    </div>
</template>

<script>
export default {
    emits: ['category-changed'],
    data(){
        return {
            categoryList: []
        }
    },
    created(){
        this.$appAxios.get("/categories").then(category_response => {
        console.log('category_response :>> ', category_response);
        this.categoryList = category_response.data || []
    })
    }
}

</script>

<style lang="scss">
    .sidebar {
        padding: 36px;

        .sidebar-item {
            display: block;
            margin-top: 16px;
        }
    }
</style>
<template>
    <app-header></app-header>
    <main class="account">
        <div class="row g-0 w-100">
            <Sidebar />
            <!-- <appItemList :items="workoutList"/> -->
            <component :is="$route.meta.componentName" :items="workoutList" />
        </div>
    </main>
</template>

<script>
import Sidebar from '../components/Account/Sidebar.vue';
export default {
    components: {
        Sidebar
    },
    data() {
            return {
                workoutList : [],
                isOpen: false
            }
        },
        created() {
            this.$appAxios.get("/newworkoutdata?_expand=category&_expand=user").then(workout_list_response => {
                console.log('workout_list_response :>> ', workout_list_response);
                this.workoutList = workout_list_response?.data || []
                console.log('workoutList :>> ', this.workoutList);
            })
        },
}
</script>
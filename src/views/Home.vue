<template>
    <app-header />
    <main class="home">
        <div class="row g-0 w-100">
            <Sidebar @category-changed="updateWorkout" />
            <appItemList :items="workoutList" @show-details="showDetails"/>
        </div>
    </main>

</template>
<script>
    import Sidebar from "@/components/Home/Sidebar.vue"
    export default {
        components: {
            Sidebar,
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

            // this.$appAxios.get("/users").then(user_like_response => {
            //     this.$store.commit("setLikes", user_like_response?.data)
            //     console.log('user_like_response :>> ', user_like_response);
            // })
        },
        methods: {
            showDetails(){
                return this.isOpen = !this.isOpen
            },
            updateWorkout(categoryID){
                const url = categoryID ? `/newworkoutdata?_expand=category&_expand=user&categoryId=${categoryID}` : `/newworkoutdata?_expand=category&_expand=user`
                this.$appAxios.get(url).then(workout_list_response => {
                this.workoutList = workout_list_response?.data || []
            })
            }
        },
        // mounted() {
        //     console.log('DDD :>> ', this.workoutList);
        // },
    }
</script>

<style lang="scss">
    p {
        margin: 0;
    }
    .popup{
        position: absolute;
        background-color: white;
    }
</style>
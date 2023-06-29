<template>
    <header>
        <nav class="d-flex align-items-center px-2 w-100">
            <div class="row w-100 g-0">
                <div class="col-md-2 col-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><g fill="currentColor"><path d="M8.27 8.074c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97H8.27Z"/><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm3.5 4.002h2.962C10.045 4.002 11 5.104 11 6.586c0 1.494-.967 2.578-2.55 2.578H6.784V12H5.5V4.002Z"/></g></svg>
                    PPL Builder
                </div>
                <div v-if="_isAuth" class="col-md-10 col-4 d-flex justify-content-end">
                    <router-link :to="{ name: 'NewItem'}" class="button btn btn-secondary mx-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="fill-current" height="16" viewBox="0 0 24 24" width="16">
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                        </svg>
                        New
                    </router-link>
                    <div class="dropdown">
                        <a class="btn btn-secondary dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        </a>

                        <ul class="dropdown-menu">
                            <li>
                                <router-link :to="{name: 'Settings'}" class="dropdown-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" class="fill-current mr-1" viewBox="0 0 24 24" width="24">
                                        <path d="M0 0h24v24H0V0z" fill="none" />
                                        <path
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"
                                        />
                                    </svg>
                                Account
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{name: 'Favorites'}" class="dropdown-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current mr-1" height="24" viewBox="0 0 24 24" width="24">
                                        <path d="M0 0h24v24H0V0z" fill="none" />
                                        <path d="M15 7v12.97l-4.21-1.81-.79-.34-.79.34L5 19.97V7h10m4-6H8.99C7.89 1 7 1.9 7 3h10c1.1 0 2 .9 2 2v13l2 1V3c0-1.1-.9-2-2-2zm-4 4H5c-1.1 0-2 .9-2 2v16l7-3 7 3V7c0-1.1-.9-2-2-2z" />
                                    </svg>
                                    Likes
                                </router-link>
                            </li>
                            <li>
                                <a @click="onLogout" class="dropdown-item" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" class="fill-current mr-1" height="24" viewBox="0 0 24 24" width="24">
                                        <g><path d="M0,0h24v24H0V0z" fill="none" /></g>
                                        <g>
                                            <path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z" />
                                        </g>
                                    </svg>
                                    Logout
                                </a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import { mapGetters } from 'vuex';
import { RouterLink } from 'vue-router';
    export default {
    computed: {
        ...mapGetters(["_isAuth"])
    },
    methods: {
        onLogout() {
            this.$store.commit("logoutUser"); //! store' daki state' i çekmek
            this.$router.push({ name: "LoginPage" });
        }
    },
    components: { RouterLink }
}
</script>

<style lang="scss">
    header{
        height: 80px;
        display: flex;
        align-items: center;
        z-index: 9;
        box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
    }

</style>
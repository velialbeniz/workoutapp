<template>
    <div class="login-wrapper">
        <div class="container">
            <div class="row h-100">
                <div class="card my-auto col-md-6 offset-md-3">
                    <h3 class="text-center py-3">Login</h3>
                    <div class="form-floating mb-3">
                        <input v-model="userData.username" type="text" class="form-control" id="floatingUsername" placeholder="Username">
                        <label for="floatingUsername">Username</label>
                    </div>
                    <div class="form-floating">
                        <input v-model="userData.password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
                        <label for="floatingPassword">Password</label>
                    </div>
                    <button @click="onSubmit" class="btn btn-primary w-100 my-3">Login</button>
                    <div class="my-3 w-100 text-center">
                        <span >
                            I'm not a member,
                            <router-link :to="{ name: 'RegisterPage'}" class="text-reset text-decoration-none fw-bold">
                                Register!
                            </router-link>
                        </span>
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
    import Cryptojs from "crypto-js" 
    export default {
        data(){
            return {
                userData : {
                    username: null,
                    password: null
                }
            }
        },
        methods: {
            onSubmit(){
                const password = Cryptojs.SHA256(this.userData.password, this.$store.getters._saltKey).toString()
                console.log("password", password)
                this.$appAxios.get(`/users?username=${this.userData.username}&password=${password}`).then(login_response => {
                    if(login_response?.data?.length > 0){
                        this.$store.commit("setUser", login_response.data[0])
                        this.$router.push({ name: 'HomePage'})
                    } else {
                        alert("User not found")
                    }
                    console.log(login_response)
                })
                .catch( e => console.log(e))
            }
        }
    }
</script>

<style lang="scss">
    .login-wrapper{
        height: 100vh;
        overflow-x: hidden;
        display: flex;
        align-items: center;
    }
</style>
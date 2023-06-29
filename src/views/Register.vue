<template>
    <div class="register-wrapper">
        <div class="container">
            <div class="row h-100">
                <div class="card my-auto col-md-6 offset-md-3">
                    <h3 class="text-center py-3">Register</h3>
                    <div class="form-floating mb-3">
                        <input v-model="userData.username" type="text" class="form-control" id="floatingUsername" placeholder="Password">
                        <label for="floatingUsername">Username</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input v-model="userData.email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating">
                        <input v-model="userData.password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
                        <label for="floatingPassword">Password</label>
                    </div>
                    <button @click="onSave" class="btn btn-primary w-100 mt-3">Register</button>
                    <div class="my-3 w-100 text-center">
                        <span >
                            Already member,
                            <router-link :to="{ name: 'LoginPage'}" class="text-reset text-decoration-none fw-bold">
                                Login!
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
                    username : null,
                    email: null,
                    password : null
                }
            }
        },
        methods: {
            onSave(){
                const password = this.userData.password
                const key = "pushpulllegs123?456!"
                const cryptedPassword = Cryptojs.SHA256(password, key).toString()
                // console.log(cryptedPassword)
                // console.log(this.userData)
                this.$appAxios.post("/users", {...this.userData, password : cryptedPassword}).then(registered_user_response => {
                    console.log(registered_user_response)
                    this.$router.push({ name: 'HomePage'})
                })
            }
        }
    }
</script>

<style lang="scss">
    .register-wrapper{
        height: 100vh;
        overflow-x: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

   a {
    transition: .4s;

    &:hover {
        opacity: 50%;
    }
   }
</style>
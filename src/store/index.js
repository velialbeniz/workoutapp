import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"

export default createStore({
    state : {
        user : null,
        saltKey : "pushpulllegs123?456!"
    },
    mutations : {
        setUser(state, user){
            state.user = user
        },
        logoutUser(state){
            state.user = null
        },
        setLikes(state, workoutIds) {
            state.user.likes = workoutIds
        }
    },
    getters: {
        _isAuth : state => state.user !== null,
        _getCurrentUser(state) {
            const user = state.user
            delete user?.password // ! Şifresiz user return etmek optional chaining ???
            return user
        },
        _saltKey : state => state.saltKey,
        _currentUserId : state => state.user.id,
        _userLikes : state => state.user.likes || []
    },
    plugins: [createPersistedState()] //! Girilen kullanıcının storageda kalması
})
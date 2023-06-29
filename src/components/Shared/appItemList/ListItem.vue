<template>
    <div class="col-6 col-md-4 card my-2 p-2">
    <!-- {{ item }} -->
        <div class="d-flex justify-content-between">
            <p class="type text center bg-danger text-white p-1">{{ item.category.name }}</p>
            <button 
                    @click="likeItem" 
                    class="like" 
                    :class="{'like-active' : alreadyLiked }"
                >
                <svg xmlns="http://www.w3.org/2000/svg" class="fill-current" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
                        <path
                        d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1z"
                        />
                </svg>
            </button>
        </div>
        <p class="name py-2">{{item.user.username }}</p>
        <p class="date text-center">{{ item.created_at }}</p>
        <button @click="$emit('show-details', showDetails)" type="button" class="btn btn-primary mt-3">
             Click Details
        </button>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

   export default {
    props : {
        item: {
            type: Object,
            required : true,
            default : () => {}
        }
    },
    data() {
        return {
            isOpen: false
        }
    }, 
    computed : {
        ...mapGetters(["_getCurrentUser", "_userLikes"]),

        alreadyLiked() {
            return this._userLikes.indexOf(this.item.id) > - 1
        },
    },
    methods: {
        showDetails() {
            return this.isOpen = !this.isOpen
        },
        likeItem(){
            let likes = [...this._userLikes]
            if(!this.alreadyLiked) {
                 likes = [...likes, this.item.id]
            } else {
                likes = likes.filter(l => l !== this.item.id)
            }
            
            this.$appAxios.patch(`/users/${this._getCurrentUser.id}`, { likes }).then(like_response => {
                this.$store.commit("setLikes", likes)
                console.log('like_response :>> ', like_response);
            })
        }
    },
   }
</script>
<style lang="scss">
    .like {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        padding: 2px;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        transition: all .5s ease;
    }

    .like-active {
        background-color: black;
       svg {
        fill: red;
       }
    }

    .type {
        display: flex;
        flex-shrink: 0;
        width: 80px;
        padding: 10px;
        justify-content: center;
        align-items: center;
    }
</style>
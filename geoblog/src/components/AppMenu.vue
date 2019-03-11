<template>
    <div class="app-menu">
        <div class="header">
            <i class="material-icons">place</i>
            GeoBlog
        </div>
        <div class="user">
            <div class="info" v-if="user">
                <span class="picture" v-if="userPicture">
                    <img :src="userPicture" alt="User Picture">
                </span>
                <span class="username">
                    {{user.profile.displayName}}
                </span>
            </div>
            <a @click="centerOnUser">
                <i class="material-icons">my_location</i>
            </a>
            <a @click="logout">
                <i class="material-icons">power_settings_new</i>
            </a>
        </div>
    </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
export default {
    // computed: {
    //     user(){
    //         //使用getter取state数据而不是直接取
    //         return this.$store.getters.user;
    //     },
    //     userPicture(){
    //         return this.$store.getters.userPicture; //TODO
    //     },
    // },

    /*使用mapGetters辅助函数，
    mapGetters(["a","b"])等价于
    {
        a(){return this.$store.getters.a},
        b(){return this.$store.getters.b}
    }*/
    computed: mapGetters([
        "user",
        "userPicture"
    ]),
    // methods: {
    //     centerOnUser(){
    //         //TODO
    //         //测试登录action
    //         this.$store.dispatch("login")
    //     },
    //     logout(){
    //         //TODO
    //         // if(!this.user){
    //         //     const userData = {
    //         //         profile:{
    //         //             displayName:"Mr Cat",
    //         //         },
    //         //     }
    //         //     this.$store.commit("user",userData)
    //         // }else{
    //         //     this.$store.commit("user",null)
    //         // }
    //         this.$store.dispatch("logout")
    //     }
    // },

    /*mapActions
    mapGetters({x:"a",y:"b"})等价于
    {
        x(){return this.$store.getters.a},
        y(){return this.$store.getters.b}
    }*/
    methods: mapActions({
        centerOnUser:"login",
        logout: "logout"
    })
}
</script>
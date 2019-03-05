<template>
    <nav class="menu">
        <router-link :to="{name:'home'}" exact>首页</router-link>
        <router-link :to="{name:'faq'}">常见问题</router-link>
        <router-link :to="{ name: 'tickets' }">需要帮助</router-link>

        <div class="spacer"></div>
        <template v-if="$state.user">
           <a>{{ $state.user.username}}</a>
           <a @click="logout">登出</a>
        </template>
        <transition name="fade" mode="out-in" v-else>
            <router-link  :to="{name:'login'}" >登录</router-link>
        </transition>
    </nav>
</template>

<style lang="stylus" scoped>
    @import "../style/imports"

    .router-link-active{
        
        border-bottom-color:$primary-color;
    }
</style>
<script>
export default {
    methods: {
       async logout(){
            const  result = await this.$fetch("logout")
            //如果用户登出，设置全局state的user为null
            if(result.status ==="ok"){
                this.$state.user= null;
            }
            //如果当前是私有页面，则跳转到首页
            
            if (this.$route.matched.some(m => m.meta.private)) {
          this.$router.push({ name: 'home' })
        }
       }
    },
}
</script>

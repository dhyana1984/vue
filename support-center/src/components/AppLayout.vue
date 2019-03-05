<template>
    <div class="app-layout">
        <header class="header">
            <div>
                <img src="../assets/logo.svg" alt="" class="img">
            </div>
            <div>
                Wee Geek Club
            </div>
        </header>
        <NavMenue/>
        <!-- 点击路由按钮后，加载的内容 -->
          <!-- 添加过渡效果 渐隐渐现效果-->
        <transition name="fade" mode="out-in">
            <router-view />
        </transition>
        
    </div>
</template>

<style lang="stylus">
    @import "../style/main";
</style>

<style lang="stylus" scoped>
.header{
    .img{
        width:64px;
        height:64px;
    }
}
</style>

<script>
import NavMenue from "./NavMenu"
export default {

    components:{
        NavMenue,
    }
}
</script>

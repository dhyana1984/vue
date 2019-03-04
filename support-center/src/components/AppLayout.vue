<template>
    <div class="app-layout">
        <header class="header">
            <div>
                <img src="../assets/logo.svg" alt="" class="img">
            </div>
            <div>
                My shirt shop
            </div>
        </header>
        <NavMenue/>
        <!-- 点击路由按钮后，加载的内容 -->
        <router-view />
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

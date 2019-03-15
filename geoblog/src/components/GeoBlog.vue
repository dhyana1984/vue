<template>
    <div class="geo-blog">
        <AppMenu />
        <!-- 地图和内容 -->
        <div class="panes">
            <BlogMap/>
        </div>
    </div>
</template>
<script>
import AppMenu from "./AppMenu.vue"
import BlogMap from "./BlogMap.vue"
export default {
    components:{
        AppMenu,
        BlogMap,
    },
    created(){

    }
}
</script>
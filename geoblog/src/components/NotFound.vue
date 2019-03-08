<template>
    <main class="not-found">
        <h1>这个页面并不存在</h1>
        <p class="more-info">
           对不起，您要访问的页面不存在<br/>
            可能是因为删除了或者更新了<br/>
            请检查您的地址拼写，或者点击回到首页.  
        </p>
        <div class="actions">
            <router-link :to="{name:'home'}" tag="button" >
                回到首页
            </router-link>
        </div>
    </main>
</template>

<style lang="stylus" scoped>
.more-info{
    text-align:center;
}
</style>

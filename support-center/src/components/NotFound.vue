<template>
    <main class="not-found">
        <h1>This page cannot be found</h1>
        <p class="more-info">
            Sorry, but we cannot find the page you are looking for.<br/>
            It might have been moved or deleted.<br/>
            Check your spelling or click below to return to the homepage.  
        </p>
        <div class="actions">
            <router-link :to="{name:'home'}" tag="button" >
                Return to home
            </router-link>
        </div>
    </main>
</template>

<style lang="stylus" scoped>
.more-info{
    text-align:center;
}
</style>

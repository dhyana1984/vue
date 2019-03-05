<template>
    <main class="tickets-layout">
        <h1>您提出的问题</h1>
        <div class="actions">
            <router-link 
                v-if="$route.name !== 'tickets'"
                tag="button"
                class="secondary"
                :to="{name:'tickets'}"
            >查看所有</router-link>
            <router-link 
                v-if="$route.name !=='new-ticket'"
                tag="button"
                :to="{name:'new-ticket'}"
            >新的问题</router-link>
             <router-view />
        </div>
    </main>
</template>
<script>

</script>
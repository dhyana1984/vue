<template>
    <ul class="movies">
        <!-- 使用Movie组件代替 -->
        <!-- <li v-for="movie of movies" class="movie">
            {{movie.title}}
        </li> -->
        
        <!-- 使用Movie组件 -->
        <Movie v-for="movie of movies" :key="movie.id" :movie="movie" />
    </ul>
</template>

<script>
import Movie from "./Movie.vue"

export default {
    components:{
        Movie,
    },
    data(){
        return{
            movies:[
                {   
                    id:0,
                    title:"Start War",
                },
                {
                    id:1,
                    title:"Blade Runner"
                }
            ]
        }
    },
}
</script>

<style >
.movies{
    list-style: none;
    padding:12px;
    background: rgba(0, 0, 0, .1);
    border-radius: 3px;
}
</style>
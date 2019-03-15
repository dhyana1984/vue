<template>
    <div class="blog-map">
        <googlemaps-map
            :center="center"
            :zoom="zoom"
            :options="mapOptions"
            @update:center="setCenter"
            @update:zoom="setZoom" 

        />
        <!-- 用户位置 -->
        <googlemaps-user-position
            @update:position = "setUserPosition" 
        
        />
        
    </div>
</template>

<script>
import {createNamespacedHelpers} from "vuex"

//使用辅助函数映射getter和action
const {
    mapGetters,
    mapActions,
} = createNamespacedHelpers("maps")
export default {
    computed:{
     ...mapGetters([
         "center",
         "zoom",
         "userPosition",
       
     ]),

     mapOptions(){
      return {
        fullscreenControl: false,
      }
     }
    },
    methods: mapActions([
        "setCenter",
        "setZoom",
        "setUserPosition",
    ])

}
</script>
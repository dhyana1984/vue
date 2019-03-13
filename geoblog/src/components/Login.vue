<template>
    <div class="welcome">
        <h1>Welcome</h1>
        <div class="actions">
            <button @click="openGoogleSignin">
                Sign in with Google
            </button>
        </div>
    </div>
</template>

<script>
import {mapActions} from "vuex"
export default {
    methods:{
        ...mapActions([
            "login",
        ]),
        openGoogleSignin(){
            //打开一个/auth/google路由的弹框，重定向到google
            //google认证成功后，服务器的回调页面会使用标准postMessageAPI发送一个消息到Vue的应用窗口
            const url = "http://localhost:3000/auth/google"
            const name = "google_login";
            const specs="width=500,height=500"
            window.open(url,name,specs)
        },
        handleMessage({data,origin}){
            //接受消息，验证消息来源是否正确（http://localhost:3000）
            if(origin !== "http://localhost:3000"){
                return
            }
            if(data==="success"){
                this.login()
            }
        }
    },
    mounted(){
        //对message事件进行监听
        window.addEventListener("message",this.handleMessage)
    },
    beforeDestroy(){
        //移除监听器
        window.removeEventListener("message",this.handleMessage)
    }
    

}
</script>
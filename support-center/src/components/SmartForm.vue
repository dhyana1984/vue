<template>
    <!-- @submit事件监听，阻止浏览器默认行为 -->
    <form @submit.prevent="submit">
        <section>
            <h2>{{title}}</h2>
            <slot/>
            <div class="actions">
                <slot name="actions" />
            </div>
            <div class="error" v-if="error">{{error}}</div>
        </section>
        <transition name="fade">
            <Loading v-if="busy" class="overlay"/>
        </transition>
    </form >
</template>
<script>
export default {
    //通过通用对象定义props的更多细节
    props:{
        title:{
            type:String,
            required:true
        },
        //operation是个返回Promise的异步操作
        operation:{
            type:Function,
            required:true,
        },
        valid:{
            type:Boolean,
            required:true,
        }
    },
    data() {
        return {
            error:null,
            busy:false,
        }
    },
    methods: {
        async submit(){
            if(this.valid && !this.busy){
                this.error = null;
                this.busy = true;
                try{
                    //这里的具体的operation方法是从Login.vue传入的
                    await this.operation();
                }catch(e){
                    this.error=e.message
                }
                this.busy=false;
            }
        }
    },
    
}
</script>
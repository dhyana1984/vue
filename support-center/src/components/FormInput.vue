
<template>
   <!-- 这里使用:value.prop用来钙素Vue直接设置DOM节点的value属性而不是设置HTML属性 -->
    <div class="row">
        <input class="input" 
        :class="inputClass" 
        :name="name"
        :type="type"
        :value.prop="text"
        :placeholder="placeholder"
        @input="update"/>
       
    </div>
</template>
<script>
export default {
    props:{
        name:{
            type:String
        },
        type:{
            type:String,
            default:"text",
        },
        text:{
            required:true
        },
        placeholder:{
            type:String
        },
        invalid:{
            type:Boolean,
            default:false,
        }
    },
    computed: {
        //无效显示，动态改变输入框的css类
        inputClass(){
            return {
                "invalid": this.invalid
            }
        }
    },
    methods: {
    update(event){
        //向父组件发射input事件，在Login组件上更新username属性
        this.$emit("update",event.currentTarget.value)
        }
    },
    model:{
        props:"text",
        event:"update",
    }
} 
</script>

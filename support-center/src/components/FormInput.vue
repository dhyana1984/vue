
<template>
   <!-- 这里使用:value.prop用来钙素Vue直接设置DOM节点的value属性而不是设置HTML属性 -->
   <!-- 用element来决定创建input或者textarea -->
   <!--注意v-bind="$attrs"，不是v-bind="$attr"  -->
    <div class="row">
        <component 
        :is="element"
        class="input" 
        :class="inputClass" 
        :name="name"
        :type="type"
        :value.prop="text"
        :placeholder="placeholder"
        @input="update"
        v-bind="$attrs"
        />
       
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
        },
        //用来确定渲染哪种input html元素
        element(){
            return this.type === "textarea" ? this.type:"input"
        }
    },
    methods: {
    update(event){
        //向父组件发射input事件，在Login组件上更新username属性
        this.$emit("update",event.currentTarget.value)
        }
    },
    model:{
        //注意这里是prop不是props
        prop:"text",
        event:"update",
    },
} 
</script>

<template>
    <div class="new-ticket">
        <h1>提交问题</h1>
        <SmartForm
            title="创建问题"
            :operation ="operation"
            :valid="valid"
        >
            <FormInput
                name="title"
                v-model="title"
                placeholder="简短的描述 (100个字符以内)"
                maxlength="100"
                required/>
     
            <FormInput
                type="textarea"
                name="description"
                v-model="description"
                placeholder="描述问题细节"
                required
                rows="4"/>
            <template slot="actions"> 
                <router-link
                    tag="button"
                    :to="{name:'tickets'}"
                    class="secondary"
                >
                    上一步
                </router-link>
                <button
                    type="submit"
                    :disabled="!valid"
                >
                    提交
                </button>
            </template>
        </SmartForm>
    </div>
</template>
<script>
import PersistantData from "../mixins/PersistantData"
export default {
    mixins:[
        PersistantData("NewTicket",[
            "title",
            "description",
        ])
    ],
    data(){
        return{
            title:"",
            description:"",
        }
    },
    computed: {
      valid(){
          //!!是空值判断
          return !!this.title && !!this.description
      }  
    },
    methods: {
        async operation(){
            const result = await this.$fetch("tickets/new",{
                method:"POST",
                body:JSON.stringify({
                    title:this.title,
                    description: this.description
                })
            })
            
            this.title = this.description=""
            //回到ticket列表
            this.$router.replace(this.$route.params.wantedRoute||
            {name:"tickets"})
        }
    },
}
</script>
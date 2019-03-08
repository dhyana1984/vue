<template>
    <main class="login">
        <h1>请先登录</h1>
        <SmartForm
            class="form"
            :title="title"
            :operation="operation"
            :valid = "valid"
        >
            <!-- 用v-model可以自动监听子组件发射的input事件并且更新username属性  -->

            <FormInput name="username" v-model="username" placeholder="Username" />
            <FormInput type="password" name="password" v-model="password" placeholder="Password" />
            <!-- 控制signup和login时的input -->
            <template v-if="mode==='signup'">
                <FormInput 
                type="password" 
                name="verify-password" 
                v-model="password2" 
                placeholder="Retry Password"
                :invalid="retypePasswordError" />
               <FormInput 
                type="email" 
                name="email" 
                v-model="email" 
                placeholder="Email"
                />
            </template>
            <!-- 控制signup和login时的按钮 -->
            <template slot="actions">
                <template v-if="mode==='login'">
                    <button
                        type="button"
                        class="secondary"
                        @click="mode='signup'">
                    
                       注册
                    </button>
                    <button
                        type="submit"
                        :disabled="!valid">
                    
                        登录
                    </button>
                </template>
                <template v-else-if="mode==='signup'">
                    <button
                        type="button"
                        class="secondary"
                        @click="mode='login'">
                       回到登录
                    </button>
                    <button
                        type="submit"
                        :disabled="!valid">
                        创建账号
                    </button>
                </template>
            </template>

        </SmartForm>
    </main>
</template>
<script>
export default {
    data(){
        return{
            mode:"login",
            username:"",
            password:"",
            password2:"",
            email:""
        }
    },
    computed: {
        title(){
            switch (this.mode) {
                case "login":
                    return "登录"
                case "signup":
                    return "创建一个新账号"
            }
        },
        //验证重新输入密码时重新输入的密码不等于第一个密码
        retypePasswordError(){
            return this.password2 && this.password !== this.password2
        },
        //验证必填
        signupValid(){
            return this.password2 && this.email && !this.retypePasswordError
        },
        valid(){
            return this.username && this.password &&
            (this.mode !== "signup" || this.signupValid)
        }

    },
    methods: {
        //从这里把要提交的方法传入SmartForm.vue
        //如果是登录就传入login方法，注册就传入signup方法
        //在SmartForm.vue中的submit方法中动态调用提交表单的方法
        async operation() {
            await this[this.mode]()
        },
        async signup(){
            await this.$fetch("signup",{
                method:"POST",
                body:JSON.stringify({
                    username:this.username,
                    password:this.password,
                    email:this.email,
                }),
            })
            this.mode = "login"
        },
        //login和signup差不多，不同的地方是
        //发送到/login
        //响应需要被设置为全局状态的用户对象，以便于让所有组件都可以知道是否有已登录的用户
        //重定向到主页
        async login(){
            this.$state.user = await this.$fetch("login",{
                method:"POST",
                body:JSON.stringify({
                username:this.username,
                password:this.password,
                }),
            })
            //重定向到主页
            // this.$router.push({name:"home"})
            //重定向到登录前访问的页面，如果之前没有访问任何页面则重定向到home
            this.$router.replace(this.$route.params.wantedRoute||
            {name:"home"})
        }
},
}
</script>

<style lang="stylus" scoped>

.form{
    >>> .count{
        max-width :400px;
    }
}
</style>

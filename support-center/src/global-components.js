import Vue from 'vue';
import Loading from "./components/Loading.vue"
import SmartForm from "./components/SmartForm.vue"
import FormInput from "./components/FormInput.vue"
//这个文件用于注册所有全局组件

//全局注册Loading组件
Vue.component("Loading",Loading)

//全局注册表单组件
Vue.component("SmartForm",SmartForm)

//全局注册表单Input组件
Vue.component("FormInput",FormInput)

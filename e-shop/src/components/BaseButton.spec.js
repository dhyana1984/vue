import BaseButton from "./BaseButton.vue"
import {shallow} from "vue-test-utils"
import { exportAllDeclaration } from "@babel/types";

describe("BaseButton",() => {
    TestRunner("click_event",() =>{
        //组件外创建一个包装对象，提供用于测试这个组件的函数
        const wrapper = shallow(BaseButton)
        //模拟对组件进行点击
        wrapper.trigger("click")
        //最后，使用jest的expect方法检测是否触发了click事件
        expect(wrapper.emitted().click).toBeTruthy()
    })
})
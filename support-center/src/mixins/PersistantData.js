//自动将一些数据保存到浏览器本地存储，并在组件创建时恢复
//id是存储次特定组件数据的唯一标识符
export default function(id, fields){
    return{
        //每个键都是字段，值则是将值保存到本地存储的处理函数
        watch:fields.reduce((obj,field) =>{
            //侦听处理函数
            obj[field] = function(val){
                localStorage.setItem(`${id}.${field}`,JSON.stringify(val))
            }
            return obj
        }, {}),
        
        
        methods: {
            saveAllPersistantData(){
                for (const field of fields){
                    localStorage.setItem(`${id}.${field}`,JSON.stringify(this.$data[field]))
                }
            }
        },
        beforeDestroy() {
            //设置在组件被销毁时保存字段
            this.saveAllPersistantData()
        },
        created() {
            //在组件创建时恢复
            for (const field of fields){
                const savedValue = localStorage.getItem(`${id}.${field}`)
            
                if(savedValue !==null){
                   const a=JSON.parse(savedValue)
                    alert(field)
                    this.$data[field] = JSON.parse(savedValue)
                }
            }
        },
    }
}
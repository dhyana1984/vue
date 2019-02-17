new Vue({
    el:"#notebook",
    data(){
        return {
            //第一次加载页面时加载数据
            content: localStorage.getItem("content") || "You can write in **markdown**"
            //content:"this is a note."
        
        }
    },
    computed: {
        notePreView(){
            //Markeddown 渲染为HTML
            return marked(this.content)
        }
    },
    //修改侦听器
    watch: {
        content:{
            handler:"saveNote"
        },
        //不需要deep或immediate时的常用语法
        // content(val, oldval){
        //     console.log("new note: ",val," old note: ",oldval)
        //     localStorage.setItem("content",val)
        // },
        //立即触发调用处理函数
        // immediate:true
    },
    methods: {
        saveNote(val){
            console.log("saving note: ", val)
            localStorage.setItem("content", val)
            //methods内部通过this关键字访问Vue实例
            this.reportOperation("saving")
        },
        reportOperation(opName){
            console.log("The ",opName," operation was completed!")
        }
    },
    //当实例准备就绪就会调用这个钩子
    //第一次加载页面时获取数据
    // created() {
    //     //将contene设置为存储的内容
    //     //如果没有保存任何内容则设置一个默认字符串
    //     this.content = localStorage.getItem("content") || "You can write in **markdown**"
    // },
})

console.log("restored note: ", localStorage.getItem("content"))
// const html = marked("**bold** *Italic* [link](http://vuewjs.org)")
// console.log(html)
//console输出<p><strong>bold</strong> <em>Italic</em> <a href="http://vuewjs.org">link</a></p>
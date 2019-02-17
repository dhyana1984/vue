new Vue({
    el:"#notebook",
    data(){
        return {
            content:"this is a note."
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
        // content:{
        //     handler(val,oldval){
        //         console.log("new note: ",val," old note: ",oldval)
        //     }
        // },
        //不需要deep或immediate时的常用语法
        content(val, oldval){
            console.log("new note: ",val," old note: ",oldval)
            localStorage.setItem("content",val)
        },
        //立即触发调用处理函数
        // immediate:true
    },
})

// const html = marked("**bold** *Italic* [link](http://vuewjs.org)")
// console.log(html)
//console输出<p><strong>bold</strong> <em>Italic</em> <a href="http://vuewjs.org">link</a></p>
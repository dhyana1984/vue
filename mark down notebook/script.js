//全局过滤器
Vue.filter("date",time=>moment(time).format("DD/MM/YY, HH:mm"))
new Vue({
    el:"#notebook",
    data(){
        return {
            //第一次加载页面时加载数据
            content: localStorage.getItem("content") || "你可以开始写 **markdown**",
            //content:"this is a note."
            notes:JSON.parse(localStorage.getItem("notes")) || [],
            //选中的笔记Id
            selectedId:localStorage.getItem("selected-id") || null
        }
    },
    computed: {
        notePreView(){
            //Markeddown 渲染为HTML
            return this.selectedNote? marked(this.selectedNote.content) :""
        },
        //计算笔记数量显示
        addButtonTitle(){
            return this.notes.length+" note(s) already"
        },
        selectedNote(){
            //返回与selectedId匹配的笔记
            return this.notes.find(note =>note.id===this.selectedId)
        },
        sortedNotes(){
            //由于sort方法会直接修改源数据，所以用slice()创建副本，防止触发notes侦听
            return this.notes.slice()
            //a如果比b先创建，则 a.created- b.created<0，a在b前
                .sort((a,b) => a.created- b.created)
            //如果两条笔记都收藏，位置不变
            //如果仅仅收藏了a，返回一个负值，a在前
            //如果仅仅收藏了b，返回正值，b在前
                .sort((a,b) => (a.favorite===b.favorite)? 0
                    :a.favorite?-1:1)
        },
        //统计行数
        linesCount(){
            if(this.selectedNote){
                //计算行符的个数
                return this.selectedNote.content.split(/\r\n|\r|\n/).length
            }
        },
        //统计单词数
        wordsCount(){
            if(this.selectedNote){
                var s = this.selectedNote.content
                //将换行符转换为空格
                s=s.replace(/\n/g,' ')
                //排除开头和结尾的空格
                s = s.replace(/(^\s*)|(\s*$)/gi, '')
                //将多个重复空格转换为一个
                s = s.replace(/[ ]{2,}/gi, ' ')
                //返回空格数量
                return s.split(' ').length
            }
        },
        //统计字符数
        charactersCount(){
            if(this.selectedNote){
                return this.selectedNote.content.split("").length
            }
        }
        
    },
    //修改侦听器
    watch: {
        content:{
            handler:"saveNote"
        },
        notes:{
            handler:"saveNotes",
            //保证对象里面的属性变化也能被侦测到
            deep: true
        },
        //侦听selectedId，把每次选中的笔记id存下来，便于刷新后取出最后选择的笔记
        selectedId(val){
            localStorage.setItem("selected-id",val)
        }
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
        },
        //用一些默认值添加一条笔记，并将其添加到笔记数组中
        addNote(){
             const time =Date.now();
             const note ={
                 id:String(time),
                 title:"新建笔记 " +(this.notes.length +1),
                 content: '**Hi!** 本笔记本使用 [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) 格式!',
                 created:time,
                 favorite: false,
                }
                 //添加到列表
                 this.notes.push(note)
        },
        selectNote(note){
            this.selectedId=note.id
        },
        saveNotes(){
            //储存前转化为json字符串
            localStorage.setItem("notes",JSON.stringify(this.notes))
            console.log("Notes saved",new Date())
        },
        removeNote(){
            if(this.selectedNote && confirm("确认删除本笔记？?")){
                const index = this.notes.indexOf(this.selectedNote)
                if(index!== -1){
                    this.notes.splice(index,1)
                }
            }
        },
        favoriteNote(){
            this.selectedNote.favorite ^= true
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

// const html = marked("**bold** *Italic* [link](http://vuewjs.org)")
// console.log(html)
//console输出<p><strong>bold</strong> <em>Italic</em> <a href="http://vuewjs.org">link</a></p>
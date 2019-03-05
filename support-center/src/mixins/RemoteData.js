//RemoteData mixin允许任何组件向服务器发出请求以获取数据

//使用带有resource参数的函数封装定义的对象，便于回传数据
//resources参数将是一个对象，每个键都是要添加的数据属性的名称，值是需要对服务器进行的请求
export default function(resources){
   return{ 
       data(){
           let initData={
               remouteDataLoading:0,
              
           }
           //把每个资源的错误存储在一个新的remoteErrors对象中，对remoteErrors初始化
           initData.remoteErrors = {}
           //将每个数据属性初始化为一个null值，以便Vue设置他们响应式属性
           //这一步非常重要，如果不初始化，它就不会被Vue添加响应式属性，也就不会再属性改变时自动更新
           for(const key in resources){
               initData[key] = null,
               //remoteErrors对象的键与调用RemoteData模块的组件的mixins的RemoteData的键相同，如果有错误，值将为错误，如果没有错误，值将为null
               initData.remoteErrors[key] = null
           }
           return initData
        //    return{
        //         //remouteDataLoading属性用于计算当前正在加载请求的数量，以帮助家在动画
        //         remouteDataLoading: 0
        //     }
        },
        computed: {
            //如果正在请求，则remoteDataBusy=true
            remoteDataBusy(){
                return this.$data.remouteDataLoading !==0
            },
            //如果至少有一个错误就返回true
            //Object.keys方法可以迭代remoteErrors对象中的键并检查一些值是否不位null，即是否为真
            hasRemoteErrors(){
                return Object.keys(this.$data.remoteErrors).some(
                    key => this.$data.remoteErrors[key]
                )
            }
        },
        methods: {
            //获取资源以及更新数据
            async fetchResource (key, url){
                //利用remouteDataLoading计数器判断是否在请求数据
                //如果remouteDataLoading > 0则说明正在请求，应该加载<Loading/>组件
                this.$data.remouteDataLoading++
                //请求之前重置错误为null
                this.$data.remoteErrors[key] = null
                try{
                    this.$data[key] = await this.$fetch(url)
                }catch(e){
                    console.error(e)
                    //放置错误，如果有错误的话
                    this.$data.remoteErrors[key] = e
                }
                this.$data.remouteDataLoading--
            }
        },
        created() {
            for(const key in resources){
                let url = resources[key]
                //如果值是一个函数，侦听它的结果
                if(typeof url === "function"){
                    this.$watch(url,(val) =>{
                        this.fetchResource(key,val)
                    },{
                        //在侦听值之前第一次调用fetchResource
                        immediate:true
                    })
                }else{
                    this.fetchResource(key,url)
                }
                
            }
        },
    }

}
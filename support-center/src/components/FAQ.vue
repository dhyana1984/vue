<template>
    <main class="faq">
        <h1>Frequently Asked Questions</h1>
        <Loading v-if="remoteDataBusy" />
        <div class="error" v-if="hasRemoteErrors">
            Can't load the questions
        </div>
        <section class="list">
            <article v-for="question of questionList" :key="question._id">
                <h2 v-html="question.title"></h2>
                <p v-html="question.content"></p>
            </article>
        </section>

    </main>
</template>

<script>
import RemoteData from "../mixins/RemoteData.js"
export default {
    //需要用到RemoteData mixin，需要导入并在mixins数组中添加RemoteData
    //mixin是可应用于其他定义对象的组件定义对象
    //RemoteData对象里面定义的内容会被用在FAQ.vue组件
    mixins:[
        RemoteData({
            questionList:"questions"
        }),
    ],


}
</script>
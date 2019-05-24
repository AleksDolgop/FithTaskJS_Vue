<template>
    <div class="content-text col-11">
        <div v-if="titleShow" class="title">
            <h2>{{title}}</h2>
        </div>          
        <div class="text">
            <span v-html="text"></span>
        </div>
    </div>     
</template>

<script>
export default {
    //С каких атрибутов принимаются данные
    props: [
        'content_id',
        'content_title',
        'content_titleShow',
        'content_text'
    ],
    data(){      
        return {
            id:         this.content_id,
            title:      this.content_title,
            titleShow:  this.content_titleShow,
            text:       this.content_text
        };
    }
}
</script>

<style>

    .content-text .title h2{
        text-transform: uppercase;
        font-size: 1.8em;
        margin-left: 0.4em;
    }

    .content-text .text{
        font-size: 1.3em;
    } 

</style>


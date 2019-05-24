<template>
    <div class="content-image col-11">
        <div v-if="titleShow" class="title">
            <h2>{{title}}</h2>
        </div>          
        <div class="image row" :class="[align]">
            <img :class="{ 'image-border': border}" :style="'width:'+size+'%'" :src="img.src" :alt="img.alt">
        </div>
    </div>     
</template>

<script>
export default {
    //Принимает массив выводимых данных через атрибут content
    props: [
        'content_id',
        'content_title',
        'content_titleShow',
        'content_src',
        'content_size',
        'content_border',
        'content_align'
    ],
    data(){      
        return {
            id:     this.content_id,
            title:  this.content_title,
            titleShow: this.content_titleShow,
            border: this.content_border,
            align:  this.content_align,
            size:   this.content_size,
            img: {
                src:    this.content_src,
                alt:    this.content_alt, 
            }
        };
    }
}
</script>

<style>

    .content-image .title h2{
        text-transform: uppercase;
        font-size: 1.8em;
        margin-left: 0.4em;
    }

    .content-image .image-border{
        border: 1px solid #5c5c5c;
    }

    .content-image .image img{
        width: 100%;
        height: 100%;
    } 

</style>


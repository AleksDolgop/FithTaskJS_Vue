<template>
    <div class="content-text col-11">
        <div v-if="titleShow" class="title">
            <h2>{{title}}</h2>
        </div>          
        <div class="video-youtube row justify-content-center">
            <youtube :video-id="videoId" ref="youtube"></youtube>
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
        'content_videoId'
    ],
    data(){      
        return {
            id:         this.content_id,
            title:      this.content_title,
            titleShow:  this.content_titleShow,
            videoId:   this.content_videoId
        };
    },
    methods: {
        playVideo() {
            this.$refs.youtube.player.playVideo()
        }
    }
}
</script>

<style>

.content .video-youtube{
    margin-top: 1em;    
}

.content .video-youtube iframe{
    padding: 0.15em;
    background-color: #40cc2d;    
    width: 80%;
}

</style>
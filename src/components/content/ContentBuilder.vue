<template>
    <div>
        <div v-for="item in contents" :key="item.id" class="content row justify-content-center">
            <content-text 
                v-if="item.type === 'text'" 
                :content_id="item.content_id"
                :content_title="item.title"
                :content_titleShow="item.titleShow"
                :content_text="item.text"
            >
            </content-text>           
            <content-image 
                v-if="item.type === 'image'" 
                :content_id="item.content_id"
                :content_title="item.title"
                :content_titleShow="item.titleShow"
                :content_src="item.src"
                :content_alt="item.alt"
                :content_size="item.size"
                :content_border="item.border"
                :content_align="item.align"
            >
            </content-image>  
            <content-video-youtube 
                v-if="item.type === 'video-youtube'" 
                :content_id="item.content_id"
                :content_title="item.title"
                :content_titleShow="item.titleShow"
                :content_videoId="item.videoId"
            >
            </content-video-youtube>        
        </div>  
    </div>    
</template>

<script>
export default {
    metaInfo: {
        title: 'Главная',
    },
    data(){
        return {
            //Объекты контента
            contents: []
        };
    },
    created(){
        
        this.$http.get(String(ServerAPI + 'content'))
        .then((response) => {
            if (response.body.sucess){
                this.contents = [...response.body.data.content];
            } 
        })
        .catch((err) => {
            console.log('Error: '+ err);
        })
    }
}
</script>

<style>
    .content{        
        padding-bottom: 1.5em;
    }

    .content h2{
        text-align: center;
        margin-top: 2em;
    }

    .content h2:first-child{
        text-align: center;
        margin-top: 0;
    }

    .content:last-child{        
        padding-bottom: 0;
    }
</style>

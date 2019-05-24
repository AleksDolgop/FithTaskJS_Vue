<template>
    <div id="message">
        <div class="col-12 msg">        
            <div 
            class="alert" 
            :class="{
                'alert-success': isSucess,
                'alert-danger':  isError,
                'alert-info':isInfo
                }"
            >
                <button title="Закрыть сообщение" class="close" @click="closeMSG">
                    <i class="fas fa-times"></i>
                </button>
                <p>{{messageText}}</p>
                
            </div>         
        </div>       
    </div>
</template>

<script>
export default {
    methods: {
        closeMSG(){
            //Создаем событие закрытия сообщения         
            this.$emit('closeMessage');      
        }
    },
    props:[
        'text',
        'type'
    ],
    data(){
        return {
            isError: false, //Ошибка
            isSucess: false,    //Подтвержение
            isInfo: false,  //Информация
            messageText: '', //Текст сообщения
            timerId: null
        };
    },
    created(){
        this.messageText = this.text;
        
        this.isError  = (this.type == 'error');
        this.isSucess = (this.type == 'sucess');
        this.isInfo   = (this.type == 'info');

        //Через 10 секунд окно с сообщением пропадет автоматически
        this.timerId = setTimeout(() => {this.closeMSG()}, 10000);
    },
    destroyed(){
        clearTimeout(this.timerId);
    }
}
</script>

<style>
#message{
    position: relative;
    width: 80%;
    margin: 0 auto;
    opacity: 80%
}

#message .msg{
    z-index: 1000;
    position: absolute;
}

#message p{
    text-align: center;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
}

#message .close{
    position: absolute;
    right: 0.5em;
    top: 0.4em;
    z-index: 1001
}
</style>

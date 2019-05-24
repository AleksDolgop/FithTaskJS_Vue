<template>
    <div role="main" class="main container">
        <app-message v-if="msgShow" :text="msgText" :type="msgType" @closeMessage="closeMSG()"></app-message>
        <router-view
            @login-sucess="MSG('sucess', 'Вы успешно вошли.')"
            @error-msg="MSG('error', 'Произошла неизвестная ошибка.')/* Передавал ошибку err в errorMSG*/"
            @reg-sucess="MSG('sucess', 'Вы успешно зарегистрировались, теперь войдите используя логин и пароль.')"
            @edit-password-sucess="MSG('sucess', 'Вы успешно изменили пароль.')"
            @delete-account-sucess="MSG('sucess', 'Вы успешно удалили аккаунт.')"
        >
        </router-view>
    </div>
</template>

<script>
export default {
    methods: {
        //Закрыть окно с сообщением
        closeMSG(){
            this.msgShow = false;
        },
        //Открыть окно с сообщением
        //type - 'error', 'info', 'sucess'
        MSG(type, text){           
            this.msgType = type;
            this.msgText = text;

            //Хитрый костлек, для обновления окна с сообщением, в случае если старое сообщение не успело закрыться перед новым
            this.msgShow = false;
            setTimeout(() => {
                this.msgShow = true;
            }, 10)          
        }
    },
    data(){
        return {
            msgText: '',
            msgType: '',
            msgShow: false,
        };
    }
}
</script>


<style>
    .main{
        padding-top: 2em;
        padding-bottom: 2em;
        background: #ddd;
    }

    .main .content{        
        padding-bottom: 1.5em;
    }

    .main .content:last-child{        
        padding-bottom: 0;
    }
</style>
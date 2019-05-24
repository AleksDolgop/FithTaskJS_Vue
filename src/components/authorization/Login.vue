<template>
    <div class="row justify-content-center">
        <div class="col-4">
            <h2>Вход в систему</h2>         
            
            <form autocomplete="off" id="login" @submit.prevent="checkForm">  
                <div class="errors alert alert-danger row" v-if="authError">
                    <p>
                        Ошибка входа: Имя пользователя или пароль введены не корректно.
                    </p>
                </div>         
                <div class="form-group row">
                    <label for="username">Имя пользователя</label>
                    <input 
                        v-model="username" 
                        type="text" 
                        name="username" 
                        id="username" 
                        class="form-control"
                        :class="{'is-invalid' : !validName}"              
                        placeholder="Введите имя пользователя"
                    >
                    <div class="invalid-feedback" v-if="!validName">
                        Введите имя пользователя длиной от 3 до 20 символов.
                    </div>
                </div>
                <div class="form-group row">
                    <label for="password">Пароль</label>
                    <input 
                        v-model="password" 
                        type="password" 
                        name="password" 
                        id="password" 
                        class="form-control"   
                        :class="{'is-invalid' : !validPassword}"                     
                        placeholder="Введите пароль"
                    >
                    <div class="invalid-feedback" v-if="!validPassword">
                        Введите пароль. Длиной от 6 до 20 символов.
                    </div>
                </div>
                <input type="submit" class="btn" value="Войти">
            </form>
        </div>      
    </div>
</template>

<script>
/*
    Шпора.
    Для логина буду использовать метод:
    1) посылаю запрос гет.
    даю имя пользователя и хеш пароля
    2) ищу в бд связку пользователь-пароль
    3) В случае удачи возвращаю хеш сессии и записываю в бд номер сессии
    4) Хеш сессии записывается в куки на час. 
*/
import AuthStatus from './Status'
export default {
    metaInfo: {
        title: 'Логин',
    },
    data(){
        return {
            authError: false,
            username:   '',
            password:   '',
            validName:      true,
            validPassword:  true
        };        
    },
    created(){
        this.authCheck();
    },
    methods: {
        //Проверка на заполнение
        checkForm(e){
            let error = false;
            let session_id = '';
            this.validName = this.validPassword = true;

            if (this.username.length < 3 || this.username.length > 20){
                this.validName = false;
                error = true;
            }

            if (this.password.length < 6 || this.password.length > 20){                    
                this.validPassword = false;
                error = true;
            }
            
            //Если форма заполнена с ошибками.
            if (error){
                return false;
            }

            this.$http.put(String(ServerAPI + 'login'), {username: this.username, password: this.password})
            .then((response) => {              
                if (response.body.sucess){   
                    this.authError = false;          
                    
                    //создаем кукисы session_id на 1 день
                    this.$cookies.set('session_id', response.body.session_id, '1d');  
                    this.$router.push('/users/' + this.username);  
                    
                    //Создаем эент успешного входа
                    this.$emit('login-sucess');
                }           
            })
            .catch((err) => {
                if (err.status == 401){
                    this.authError = true;
                } else {
                    this.$emit('error-msg', err);
                }
            });
        },
        authCheck(){
            //Берем кукисы с именем session_id
            const session_id = this.$cookies.get('session_id');
            //Если нет кукисов содержащих session_id тогда не отправляем запрос (если отправлять то нечего)
            if (!session_id){
                return;
            }

            //Делаем запрос на логин передавая session_id из кукисов
            this.$http.post(String(ServerAPI + 'login'), { session_id })
            .then((response) => {
                if (response.body.sucess){
                    //Если все ок, тогда редирект на страницу пользователя
                    this.$router.push('/users/' + response.body.username);
                }                          
            })
            .catch((err) => {
                //Если пришла ошибка входа при помощи кукисов, тогда удаляем ненужные кукисы
                if (err.status == 401){
                    this.$cookies.remove('session_id');
                } else {
                    this.$emit('error-msg', err);
                }
            });
        }
    }
}
</script>

<style>
    #login .invalid-feedback{
        display: block;
    }

    #login .errors{
        font-size: 0.9em;
        padding-bottom: 0;
        color: #dc3545;
    }

    #login .btn{
        color: rgb(255, 255, 255);
        background-color: #379b29;
        border-color: #379b29
    }

    #login .btn:hover{
        background-color: #3aaf2a;
    }
</style>


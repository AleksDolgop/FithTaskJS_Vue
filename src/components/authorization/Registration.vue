<template>
    <div class="row justify-content-center">
        <div class="col-4">
            <h2>Регистрация</h2>                   
            <form autocomplete="off" id="registration" @submit.prevent="checkForm" method="POST">         
                <div class="form-group row">
                    <label for="username">Имя пользователя</label>
                    <input 
                        v-model="username" 
                        type="text" 
                        name="username" 
                        id="username" 
                        class="form-control"
                        :class="{'is-invalid' : !validUsername, 'is-valid': freeUsername}"     
                        @blur="checkUser" 
                        @focus="clearFlags" 
                        placeholder="Введите имя пользователя"
                    >
                    <div class="invalid-feedback" v-if="username.length >= 3 && !validUsername && !freeUsername">
                        Имя пользователя уже занято.
                    </div>
                    <small id="usernameHelp" class="form-text text-muted">
                        Длина имени пользователя от 3 до 20 символов.
                    </small>
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
                        @blur="checkPassword"                 
                        placeholder="Введите пароль"
                    >
                    <div class="invalid-feedback" v-if="!validPassword">
                        Введите пароль.
                    </div>
                    <small id="passwordHelp" class="form-text text-muted">
                        Длина пароля от 6 до 20 символов.
                    </small>
                </div>
                <div class="form-group row">
                    <label for="rePassword">Еще разок пароль</label>
                    <input 
                        v-model="rePassword" 
                        type="password" 
                        name="rePpssword" 
                        id="rePaassword" 
                        class="form-control"   
                        :class="{'is-invalid' : !validRePassword}"   
                        @blur="checkRePassword"                  
                        placeholder="Повторите пароль."
                    >
                    <div class="invalid-feedback" v-if="!validRePassword">
                        Пароли не совпадают.
                    </div>
                </div>
                <input type="submit" class="btn" value="Зарегистрироваться">
            </form>
        </div>      
    </div>
</template>

<script>
export default {
    metaInfo: {
        title: 'Регистрация',
    },
    data(){     
        return {
            title: 'Registration',
            username: '',
            password: '',
            rePassword: '',
            freeUsername: false,    //свободность имени
            validUsername: true,
            validPassword: true,
            validRePassword: true
        };
    },
    methods: {
        clearForm(){
            this.password = '';
            this.rePassword = '';
        },
        checkUser(){
            //Если длина имени не как положено
            if (this.username.length < 3 || this.username.length > 20){
                this.validUsername = false;
                return;
            }
            
             this.$http.get(String(ServerAPI + 'users/' + this.username))
            .then((response) => {
                //Если нашло
                this.validUsername = false;
                this.freeUsername = false;              
            })
            .catch((err) => {
                //Если не нашло
                this.validUsername = true;
                this.freeUsername = true;
            })
        },
        checkPassword()
        {
            if (this.password.length < 6 || this.password.length > 20 ){      
                this.validPassword = false;
                return;
            }
            this.validPassword = true;
        },
        checkRePassword(){
            if (this.password != this.rePassword ){
                this.validRePassword = false;
                return;
            }
            this.validRePassword = true;
        },
        clearFlags(){
            this.validUsername = true;
            this.freeUsername = false;
        },
        checkForm(e){
        //Проверка имени пользователя. Чтобы не повториться.
            let error = false;

            this.validUsername = this.validPassword = this.validRePassword = true;

            //Если введеное имя не свободно
            if (!this.freeUsername){
                error = true;
            }

            if (!this.validUsername){             
                error = true;       
            }

            if (!this.validPassword){
                error = true;
            }

            if (this.rePassword == ''){     
                this.validRePassword = false;
                error = true;
            }

            if (this.password != this.rePassword ){
                this.validPassword = false;
                this.validRePassword = false;
                error = true;
            }

            if (error){
                return;
            }

            this.$http.post(String(ServerAPI + 'users.create'), { username: this.username,  password: this.password})
            .then((response) => {
                if (response.body.sucess){                
                    //Если все хорошо, тогда
                    this.$router.push('/login');
                    this.$emit('reg-sucess');
                }             
            })
            .catch((err) => {
                this.$emit('errorMSG', err);
            });
        }
    } 
}
</script>

<style>
    #registration .invalid-feedback{
        display: block;
    }

    #registration .errors{
        font-size: 0.9em;
        padding-bottom: 0;
        color: #dc3545;
    }

    #registration .btn{
        color: rgb(255, 255, 255);
        background-color: #379b29;
        border-color: #379b29
    }

    #registration .btn:hover{
        background-color: #3aaf2a;
    }
</style>


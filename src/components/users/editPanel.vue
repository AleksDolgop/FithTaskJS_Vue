<template>
    <div class="user-edit-panel">
        <div class="user-button-panel">
            <button class="btn" @click="clickButton('editPassword')">Сменить пароль</button>
            <button class="btn" @click="clickButton('deleteAccount')">Удалить аккаунт</button>
        </div>
        <div class="delete-account" v-show="editPassword">
            <form id="login" @submit.prevent="checkFormEditPassword">  
                <h3>Смена пароля</h3>
                <div class="errors alert alert-danger row" v-if="editPasswordError">
                    <p>
                        Ошибка: пароль введен не верно.
                    </p>
                </div>         
                <div class="form-group row">
                    <label for="oldPassword">Старый пароль</label>
                    <input 
                        v-model="oldPassword" 
                        type="password" 
                        name="oldPassword" 
                        id="oldPpassword" 
                        class="form-control"   
                        :class="{'is-invalid' : !validOldPassword}"                     
                        placeholder="Введите пароль"
                    >
                    <div class="invalid-feedback" v-if="!validOldPassword">
                        Введите старый пароль. Длиной от 6 до 20 символов.
                    </div>
                </div>
                <div class="form-group row">
                    <label for="newPassword">Новый пароль</label>
                    <input 
                        v-model="newPassword" 
                        type="password" 
                        name="newPassword" 
                        id="newPassword" 
                        class="form-control"   
                        :class="{'is-invalid' : !validNewPassword}"                     
                        placeholder="Введите пароль"
                    >
                    <div class="invalid-feedback" v-if="!validNewPassword">
                        Введите новый пароль. Длиной от 6 до 20 символов.
                    </div>
                </div>
                <input type="submit" class="btn" value="Сменить пароль">
                <button class="btn" @click="clickButton('cancel')">Отмена</button>
            </form>
        </div>
        <div class="user-delete-account" v-show="deleteAccount">
            <form class="delete-account" @submit.prevent="checkFormDeletePassword"> 
                <h3>Удаление аккаунта</h3> 
                <div class="errors alert alert-danger row" v-if="deleteAccountError">
                    <p>
                        Ошибка: пароль введен не верно.
                    </p>
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
                <input type="submit" class="btn" value="Удалить аккаунт">
                <button class="btn" @click="clickButton('cancel')">Отмена</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: ['userId', 'user_name'],
    methods: {
        clickButton(button){

            //Если пользователь не авторизован и каким то образом нажал на кнопку
            if (!this.$cookies.get('session_id'))
            {
                this.$router.push('/login');
                return;
            }

            //Кнопки открывают или закрывают определенный раздел
            if (button == 'editPassword'){
                this.editPassword = true;
                this.deleteAccount = false;
            } else if (button == 'deleteAccount'){
                this.editPassword = false;
                this.deleteAccount = true;
            } else if (button == 'cancel'){
                this.editPassword = false;
                this.deleteAccount = false;
            }
        },
        checkFormEditPassword(){

            const session_id = this.$cookies.get('session_id');
            //Если пользователь не авторизован и каким то образом нажал на кнопку
            if (!session_id)
            {
                this.$router.push('/login');
                return;
            }

            //Обнуление флагов.
            let error = false;

            this.validNewPassword = true;
            this.validOldPassword = true;
            this.editPasswordError = false;

            //Проверка корректности ввода данных

            if (this.newPassword.length < 6 || this.newPassword.length > 20){
                error = true;
                this.validNewPassword = false;
            }

            if (this.oldPassword.length < 6 || this.oldPassword.length > 20){
                error = true;
                this.validOldPassword = false;
            }
            
            if (error){
                //Очищаем поля в случае ошибки
                this.oldPassword = '';
                this.newpassword = '';
                return;
            }

            //Посылаем запрос
            this.$http.put(String(ServerAPI + 'users.edit'), {session_id, username: this.username, oldPassword: this.oldPassword, password: this.newPassword})
            .then((response) => {        
                if (response.body.sucess){
                    //Сообщение об успешной операции
                    this.oldPassword = '';
                    this.newPassword = '';
                    this.clickButton('cancel');
                    this.$emit('edit-password-sucess');
                }
            })
            .catch((err) => {
                //Если вернулась ошибка 401
                if (err.body.error.code = 401){
                    this.editPasswordError = true;
                } else {
                    this.$emit('error-msg', err);
                }
            });

        },
        checkFormDeletePassword(){
            const session_id = this.$cookies.get('session_id');
            //Если пользователь не авторизован и каким то образом нажал на кнопку
            if (!session_id)
            {
                this.$router.push('/login');
                return;
            }

            //Обнуляем флаги

            this.validPassword = true;
            this.deleteAccountError = false;

            //Проверяем корректность ввода
            if (this.password.length < 6 || this.password.length > 20){
                this.validPassword = false;
                this.password = '';
                return;
            }

            //отправляем запрос
            this.$http.delete(String(ServerAPI + 'users.delete/' + this.username + '/' + this.password + '/' + session_id))
            .then((response) => {       
                if (response.body.sucess){
                    //Сообщение об успешной операции
                    
                    this.$emit('delete-account-sucess');
                    this.$cookies.remove('session_id');
                    this.$router.push('/');
                }
            })
            .catch((err) => {
                //Если вернулась ошибка 401
                if (err.body.error.code = 401){
                    this.deleteAccountError = true;
                } else {
                    this.$emit('error-msg', err);
                }             
            });
        }
    },
    data(){
        return{
            user_id : this.userId,
            username: this.user_name,
            editPassword: false,
            deleteAccount: false,

            validNewPassword: true,
            validOldPassword: true,
            validPassword: true,

            editPasswordError: false,
            deleteAccountError: false,

            newPassword: '',
            oldPassword: '',
            password: ''
        };
    }
}
</script>

<style>
    .user-edit-panel .btn{
        margin-top: 1em;
        color: rgb(255, 255, 255);
        background-color: #379b29;
        border-color: #379b29
    }

    .user-edit-panel .btn:hover{
        background-color: #3aaf2a;
    }

    .user-edit-panel form{
        padding-top: 2em;
    }
</style>

<template>
    <div class="auth-status">
        <ul class="nav">
            <li v-if="!isAuth" class="nav-item">
                <a href="/login" class="nav-link" title="Войти в учетную запись">Войти</a>
            </li>
            <li v-if="!isAuth" class="nav-item">
                <a href="/registration" class="nav-link" title="Создать учетную запись">Регистрация</a>
            </li>
            <li v-if="isAuth" class="nav-item">
                <a :href="'/users/'+UserName" class="nav-link" :class="{admin}" title="Учетная запись">{{UserName}}</a>
            </li>  
            <li v-if="isAuth" class="nav-item">
                <a href="#" class="nav-link" @click="authExit" title="Выход из учетной записи">Выход</a>
            </li>     
        </ul>      
    </div>
</template>

<script>
export default {
    methods: {
        authExit(){
            const session_id = this.$cookies.get('session_id')
            this.$http.put(String(ServerAPI + 'logout'), {session_id})
            .then((response) => {
                if (response.body.sucess){
                    this.$cookies.remove('session_id');
                    // Задержка редиректа. Чтобы избежать случайного клика по кнопке "Регистрация"
                    setTimeout(() => {
                        this.$router.push({ name: 'login'});             
                    }, 300);                          
                }           
            });   
        },
        authCheck(){
            //Берем кукисы с именем session_id
            const session_id = this.$cookies.get('session_id');
            //Если нет кукисов содержащих session_id тогда не отправляем запрос (если отправлять то нечего)
            if (!session_id){
                this.username = 'none';    
                this.isAuth = false;
                return;
            }

            //Делаем запрос на логин передавая session_id из кукисов
            this.$http.put(String(ServerAPI + 'login'), { session_id })
            .then((response) => {
                if (response.body.sucess){
                    //Если все хорошо, тогда
                    this.UserName = response.body.data.username;
                    this.admin = response.body.data.admin;
                    this.isAuth = true;
                }               
            })
            .catch((err) => {
                //Если пришла ошибка входа, тогда удаляем ненужные кукисы
                if (err.body.error.code == '401'){
                        this.$cookies.remove('session_id');
                        this.username = 'none';    
                        this.isAuth = false;
                }
            });
        }
    },
    watch: {
        '$route':'authCheck'
    },
    data(){
        return {
            isAuth: false,
            admin: false,
            UserName: 'none'
        };
    },
    created(){
        this.authCheck();
    }
}
</script>

<style>

.auth-status{
    border-left: 2px solid #838383;
    padding-left: 1.5em;
}

.auth-status .admin{
    color: #6bd06b;
}

.auth-status .admin:hover{
    color: #b7fab7;
}

.auth-status .nav-item{
     margin:0;
}

.auth-status .nav-item a{
     padding-right: 0.5em;
     padding-left: 0;
     text-transform: uppercase;
     font-size: 1em;
}
 
</style>


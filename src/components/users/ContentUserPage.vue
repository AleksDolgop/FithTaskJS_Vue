<template>
    <div class="content">
        <div class="row justify-content-center">
            <div class="col-10">
                <div class="user-page">
                    <h2 class="user-username" :class="{admin}">{{username}}</h2>
                    <edit-panel 
                        v-if="order" 
                        :user_id="user_id" 
                        :user_name="username"
                        @edit-password-sucess="$emit('edit-password-sucess')"
                        @delete-account-sucess="$emit('delete-account-sucess')"
                    >
                    </edit-panel>
                </div>           
            </div>
        </div>
    </div>
</template>

<script>
export default {
    metaInfo: {
        title: 'Страница пользователя',
    },
    data(){
        return {
            user_id : null,
            username: null,
            order: false,   //Владелец
            admin: false    //Профиль админа?
        };
    },
    created(){
        this.$http.get(String(ServerAPI + 'users/' + this.$route.params.user))
        .then((response) => {
            if (response.body.sucess)
            {         
                this.user_id = response.body.data.user.user_id;
                this.username = response.body.data.user.username;
                this.admin = response.body.data.user.admin;            
            } else {
                console.log('Error: ' + response.body.error);
            }
        })
        .catch((err) => {
            console.log('Error: ' + err);
        });    
        
        //Берем из кукисов session_id, если он есть там
        const session_id = this.$cookies.get('session_id');
        
        if (session_id)
        {
            //Логинимся с помощью session_id
            this.$http.put(String(ServerAPI + 'login'), {session_id})
            .then((response) => {
                if (response.body.sucess)
                {            
                    //Если пользователь является владельцем профиля            
                    this.order = (this.user_id == response.body.data.user_id);
                }
            })
            .catch((err) => {
                console.log('Error: '+ err);
            });
        }
    }
}
</script>

<style>
    .content .user-page .admin{
        color: #328601;
    } 
</style>

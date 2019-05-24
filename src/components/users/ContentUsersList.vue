<template>
    <div class="content">   
        <div class="row justify-content-center"> 
            <div class="col-11">
                <h2 class="users-list-title">Все пользователи</h2>
                <ul class="users-list">
                    <li v-if="!users">
                        <p>Список пользователей пуст</p>
                    </li>
                    <li v-for="item in users" :key="item.id">
                        <a :href="'/users/' + item.username">{{item.username}}</a>
                    </li>
                </ul>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    metaInfo: {
        title: 'Пользователи',
    },
    data(){
        return {
            users: null
        };
    },
    created(){
        const result = this.$http.get(String(ServerAPI + 'users'))
        .then((response) => {
            if (response.body.sucess)
            {         
                this.users = response.body.data.users;
            }
        })
        .catch((err) => {
            console.log('Error: ' + err);
            
        });        
    }
    
}
</script>

<style>
    .content .users-list{
        list-style: none;
    }

    .content .users-list{
        list-style: none;
    }

    .content .users-list-title{
        padding-left: 0.94em
    }


    .content .users-list p{
        list-style: none;
        font-size: 1.25em
    }

    .content .users-list a{
        list-style: none;
        font-size: 1.25em
    }
</style>

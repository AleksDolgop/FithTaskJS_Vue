<template>
    <nav role="navigation" class='top-menu navbar navbar-expand'>
        <a href="/" class="navbar-brand" title="На главную"><i class="fab fa-node-js"></i></a>
        
        <ul class="navbar-nav mr-auto">
            <li v-for="item in nav" :key="item.id" class="nav-item">
                <a :href="item.href" class="nav-link">{{item.title}}</a>
            </li>
            
        </ul>

        <auth-status></auth-status>
    </nav>
</template>

<script>
export default {
        data(){
            return{
                //Массив данных, содержащий все меню.
                nav: []
            }
        },
        created(){
        this.$http.get(String(ServerAPI + 'menu'))
        .then((response) => {
            if (response.body.sucess){
                this.nav = [...response.body.data.nav];
            }         
        })
    }
}
</script>

<style>
    .top-menu{
        background-color: #5c5c5c;
        height: 4em;
        border: 1px solid #40cc2d;
    }

    .top-menu .navbar-brand{
        color: #40cc2d;
        font-size: 2.5em;
    }

    .top-menu .navbar-brand:hover{
        color: #1cee00;
    }


    .top-menu .nav-link{      
        color: #ddd;
        cursor: pointer;
        font-size: 1.1em;
        text-transform: uppercase;
        padding-bottom: 0.19em;
    }

    .top-menu .nav-link:hover{
        color: #fff;
    }

</style>


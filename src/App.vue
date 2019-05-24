<template>
  <div class="page container">
    <container-header></container-header>
    <container-main></container-main>
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
            this.msgShow = true;
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
  body{
    font-family: 'Roboto', 'sans-serif';
    background-color: #cecece;
  }

  a{
    color: #2b8d2b;
  }

  a:hover{
    color: #20b820;
    text-decoration: none;
  }

  a:visited{
    color: #2b8d2b;
  }
</style>

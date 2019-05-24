import Vue from 'vue';
import App from './App.vue';

//Vue plugins
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueMeta from 'vue-meta';
import VueCookies from 'vue-cookies'
import VueYoutube from 'vue-youtube'

Vue.use(VueCookies);
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueMeta);
Vue.use(VueYoutube);

//Подключаем дополнительные модули
import $ from 'jquery';
import md5 from 'js-md5';

//Делаем jQuery и md5 глобальными.
global.jQuery = global.$ = $;
global.md5 = md5;

//Создаем для удобства глобальную переменную содержащую АПИ сервак
global.ServerAPI = 'http://localhost:3000/';

//Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//Import and Registration components -->>

//Main Containers
import ContainerHeader from './components/container/Header.vue';
import ContainerMain from './components/container/Main.vue';
import ContainerFooter from './components/container/Footer.vue';
Vue.component('ContainerHeader', ContainerHeader);
Vue.component('ContainerMain', ContainerMain);
Vue.component('ContainerFooter', ContainerFooter);

//Message
import AppMessage from './components/messages/messages.vue';
Vue.component('AppMessage', AppMessage);

//Error 404
import Err404 from './components/404.vue';
Vue.component('Err404', Err404);

//Top-menu
import TopMenu from './components/menu/TopMenu.vue';
Vue.component('TopMenu', TopMenu);

//Autorization
import AuthStatus from './components/authorization/Status.vue'
import AuthLogin from './components/authorization/Login.vue'
import AuthRegistration from './components/authorization/Registration.vue'
Vue.component('AuthStatus', AuthStatus);
Vue.component('AuthLogin', AuthLogin);
Vue.component('AuthRegistration', AuthRegistration);

//Content
import ContentBuilder from './components/content/ContentBuilder.vue';
import ContentText from './components/content/ContentText.vue';
import ContentImage from './components/content/ContentImage.vue';
import ContentVideoYoutube from './components/content/ContentVideoYoutube.vue';
Vue.component('ContentBuilder', ContentBuilder);
Vue.component('ContentText', ContentText);
Vue.component('ContentImage', ContentImage);
Vue.component('ContentVideoYoutube', ContentVideoYoutube);

//Users
import ConentUsersList from './components/users/ContentUsersList.vue';
import ConentUserPage from './components/users/ContentUserPage.vue';
import EditPanel from './components/users/editPanel.vue'
Vue.component('ContentUsersList', ConentUsersList);
Vue.component('ConentUserPage', ConentUserPage);
Vue.component('EditPanel', EditPanel);

//                          <<---------------------------


//vue-router
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: ContentBuilder},
    { path: '/login', name: 'login', component: AuthLogin},
    { path: '/registration', name: 'registration', component: AuthRegistration},
    { path: '/users', name: 'users', component: ConentUsersList},
    { path: '/users/:user', component: ConentUserPage},
    { path: '*', name: '404', component: Err404},
  ]
})


//Vue app
new Vue({
  el: '.app',
  router,
  render: h => h(App)
})

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueSocketIO from 'vue-socket.io';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

// Socket config
Vue.use(
	new VueSocketIO({
		debug: true,
		connection: process.env.VUE_APP_SERVER_URL,
		// vuex: {
		// 	store, // Attach the store
		// 	actionPrefix: 'SOCKET_',
		// 	mutationPrefix: 'SOCKET_',
		// },
	}),
);

new Vue({
	router,
	render: h => h(App),
}).$mount('#app');

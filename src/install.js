import ChatApp from "./ChatApp.vue";

function install(Vue) {
	if (install.installed) return;
	install.installed = true;
	Vue.component("chat-app", ChatApp);
}

const plugin = {
	install,
};

let GlobalVue = null;
if (typeof window !== "undefined") {
	GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
	GlobalVue = global.vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

ChatApp.install = install;

export default ChatApp;
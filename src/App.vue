<template>
   <div>
     <chat-app></chat-app>
   </div>
</template>

<script>
import { io } from "socket.io-client";
const URL = "http://localhost:3000";
const socket = io(URL);
import ChatApp from "./install";
export default {
  data() {
    return {
      list: [],
      totalUserConnected: 0,
      description: "",
      messages: [],
      input: "",
      name: "",
      isInput: true,
    };
  },
  components:{
    ChatApp
  },
  created() {
    fetch("http://localhost:3000/history")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.messages = res;
      });
  },
  mounted() {
    this.name = localStorage.getItem("name") || "";
    if (this.name) {
      this.isInput = false;
    }
    socket.on("connect", () => {
      socket.username = "Rutvik";
      console.log(socket);
    });

    socket.on("total", (data) => {
      console.log(data);
      this.totalUserConnected = data.total;
    });

    socket.on("newclientconnect", (data) => {
      this.description = data.description;
    });

    socket.on("new-message", (data) => {
      console.log(data);
      this.messages.push(data);
    });
  },
  methods: {
    sendMsg() {
      this.messages.push({
        name: this.name,
        msg: this.input,
      });
      socket.emit("new-message", {
        name: this.name,
        msg: this.input,
      });
      this.input = "";
    },
    setName() {
      localStorage.setItem("name", this.name);
      this.isInput = false;
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(226, 226, 226);
}

</style>

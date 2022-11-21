<template>
    <div id="app">
      <h2>Chat App</h2>
      <input
        v-if="isInput"
        type="text"
        placeholder="enter message"
        v-model="name"
        @keyup.enter="setName()"
      />
      <div v-else>
        NAME: <b>{{ name }}</b>
      </div>
      <br />
      <h3>{{ description }}</h3> <br>
      <div v-for="msg in messages" :key="msg.id">
        <div>
          <b>{{ msg.name }}</b>:{{ msg.msg }}
        </div><br>
      </div>
      <input
        type="text"
        placeholder="enter message"
        v-model="input"
        @keyup.enter="sendMsg()"
      />
    </div>
  </template>
  
  <script>
  import { io } from "socket.io-client";
  const URL = "http://localhost:3000";
  const socket = io(URL);
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
  
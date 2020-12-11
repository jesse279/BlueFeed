<template>
<div id="app">
  <div class="header">
    <router-link to="/">
      <div class="logo-contain">
        <img class ="logo" src="/BYU.png">
      </div>
    </router-link>
    <div class="title">
      <h1>Blue Feed</h1>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <router-link to="/admin">Update Scores</router-link>
    <br>
    <router-link to="/chat">Cougar Chat</router-link>
    <br>
    <a href="https://github.com/jesse279/BlueFeed">GitHub</a>
  </div>
</div>
</template>

<style>

.logo {
max-height: 100%;
max-width: 100%;
}

.logo-contain {
  height: 100px;
  width: 100px;
}
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: #5BDEFF;
  color: #1C454F;
}

.title {
  margin-top: 5px;
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #e3e3e3;
  font-size: 12px;
}

.footer a {
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>

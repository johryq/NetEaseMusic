<template>
  <div id="app">
    <RouterView></RouterView>
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
input {
  outline: none;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #333;
}
.icon {
  width: 0.5em;
  height: 0.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.clear-both::after,
.clear-both::before {
  display: table;
  content: "";
}

.clear-both::after {
  clear: both;
}
</style>

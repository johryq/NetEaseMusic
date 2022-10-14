function remSize() {
  let deviceWidth = window.innerWidth || document.documentElement.clientWidth;
  if (deviceWidth >= 750) {
    deviceWidth = 750;
  } else if (deviceWidth <= 320) {
    deviceWidth = 320;
  }
  // 设置root fontSize
  document.documentElement.style.fontSize = deviceWidth / 7.5 + "px";
  document.querySelector("body").style.fontSize = 0.3 + "rem";
}
window.onresize = remSize();

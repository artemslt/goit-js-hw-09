!function(){var t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")},n=null;t.startBtn.addEventListener("click",(function(){n=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16)),t.startBtn.disabled=!0,t.stopBtn.disabled=!1}),1e3)})),t.stopBtn.addEventListener("click",(function(){clearInterval(n),t.stopBtn.disabled=!0,t.startBtn.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.6a0f1189.js.map

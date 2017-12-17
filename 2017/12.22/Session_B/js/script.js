"use strict";

(function () {
  var focusedElem = null;
  var popupBody = document.querySelector(".popup-body");
  var btnOpenPopup = document.querySelector(".open-popup");
  var btnClosePopup = document.querySelector(".btn-close");

  btnOpenPopup.addEventListener("click", openPopup, false);
  btnClosePopup.addEventListener("click", closePopup, false);

  function openPopup(){
    focusedElem = this;
    document.documentElement.classList.add("on-popup");
  }

  function closePopup(event){
    event = event || window.event;    
    document.documentElement.classList.remove("on-popup");
  }
} ());

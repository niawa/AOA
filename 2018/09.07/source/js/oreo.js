'use strict';

/**
 * 기본적인 Modal Window 구현
 *
 * 1. 고객문의 버튼 클릭시 modal open
 * 2. 닫기 버튼 클릭시 modal close
 *
 */

var btnVoc = document.querySelector('.btn-voc');
btnVoc.addEventListener('click', openModal, false);

/**
 * @function openModal
 * @param {Event}
 *
 * 1. register event handlers for the functionality required in the dialog.
 * 2. show dialog box adding 'open' class to dialog element
 *
 */
function openModal (event) {
  event = event || window.event;
  event.preventDefault();

  var modal = document.querySelector('#voc-dialog');
  var btnClose = modal.querySelector('.btn-close');
  var firstTabbaleEl = modal.querySelector('#subject');

  if(!modal) return;

  // register event handler:
  // when clicked close button, close modal dialog
  if(btnClose)
    btnClose.addEventListener('click', closeModal, false);

  // register event handler:
  // when key is stroked, perform the action appropriate to each situation
  document.addEventListener("keydown", bindKeyEvt, false);
  document.body.style.top = (document.documentElement.scrollTop || document.body.scrollTop) * -1 + 'px';
  document.documentElement.classList.add('in-modal');
  setInertness(modal);
  firstTabbaleEl.focus();
}

/**
 * @function closeModal
 * @param {Event}
 *
 * hide dialog box removing 'open' class to dialog element and, unregister event handlers.
 */
function closeModal (event) {
  event = event || window.event;
  event.preventDefault();

  var modal = document.querySelector('#voc-dialog');
  var btnClose = modal.querySelector('.btn-close');
  var scrollTop = parseInt(document.body.style.top) * -1;

  if(!modal) return;

  // remove event handlers
  if(btnClose)
    btnClose.removeEventListener('click', closeModal, false);
  document.removeEventListener("keydown", bindKeyEvt, false);

  document.body.removeAttribute('style');
  document.documentElement.classList.remove('in-modal');
  window.scrollTo(0, scrollTop);

  unsetInertness();
}

/**
 * @function bindKeyEvt
 * @param {KeyboardEvent}
 *
 * processing based on user keystrokes
 */
function bindKeyEvt (event) {
  event = event || window.event;
  var keycode = event.keycode || event.which;
  var currEl = event.target || event.srcElement;
  var firstTabbableEl = document.querySelector('#subject');
  var lastTabbableEl = document.querySelector('#voc-dialog .btn-close');

  switch(keycode) {
    case 27:  // esc key
      closeModal(event);
      break;
    case 9:   // tab key
      if (currEl === lastTabbableEl && !event.shiftKey) {
        event.preventDefault();
        firstTabbableEl.focus();
      }
      if (currEl === firstTabbableEl && event.shiftKey ) {
        event.preventDefault();
        lastTabbableEl.focus();
      }
      break;
    default:
      break;
  }
}

/**
 * @function setInertness
 * @param {HTMLElement} dialog the element used as dialog
 *
 * let elements to be inert except dialog
 */
function setInertness (dialog) {
  var ommits = ["script", "meta", "link", "style", "base"];
  for(var i = -1, node; node = dialog.parentNode.children[++i];){
    if(node == dialog || ommits.indexOf(node.tagName.toLowerCase()) > -1)
      continue;
    node.setAttribute("aria-hidden", "true");
    node.setAttribute("inert", "");
  }
}

/**
 * @function unsetInertness
 * @param {HTMLElement} dialog the element used as dialog
 *
 * unset inert from elements
 */
function unsetInertness () {
  var nodes = document.querySelectorAll('[inert]');
  for(var i = -1, node = null; node = nodes[++i];){
    node.removeAttribute('aria-hidden');
    node.removeAttribute('inert');
  }
}
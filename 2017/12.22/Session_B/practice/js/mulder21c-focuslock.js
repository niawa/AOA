(function(){
  var focuslock = (function(){
    var firstElem,
        lastElem;

    return {
      setFirstBtn : function(el){
        firstElem = el;
      },
      setLastBtn : function(el){
        lastElem = el;
      },
      focuslockKeyDown : function(event){
        event = event || window.event;
        var keycode = event.which || event.keyCode;
        if(event.shiftKey && keycode === 9 && event.target === firstElem){
          event.preventDefault ? event.preventDefault() : event.returnValue = false;
          lastElem.focus();
        }else if(!event.shiftKey && keycode === 9 && event.target === lastElem){
          event.preventDefault ? event.preventDefault() : event.returnValue = false;
          firstElem.focus();
        }
      }
    };
  }());

  window.focuslock = window.focuslock || focuslock;
}());
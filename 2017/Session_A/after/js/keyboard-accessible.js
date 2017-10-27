$(document).ready(function() {
  var btn = $('.btn img');
  btn.click(function() {
    alert('Print Complete!');
  });
  btn.keyup(function(e) {
    if(e.keyCode == 13 | e.keyCode == 32) {
      alert('Print Complete!');
    }
  });
});
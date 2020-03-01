//index
function page_index() {
  /*
  var ifrdiv = ce(['div', 'class', 'scroll-wrapper']);
  if (!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
    var ifrdiv = ce(['div', 'class', 'scroll-wrapper div_ios'])
  }
  
  var ifr = ce(['iframe', 'src', 'mfzh/newindex.htm']);
  ifrdiv.appendChild(ifr);
  document.body.appendChild(ifrdiv);
  */
  $("body").empty();
  $("body").load('mfzh/newindex2.htm');
}

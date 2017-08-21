const panels = document.querySelectorAll('.panel');
module.exports = function (pan) {
  function toggleOpen() {
    this.classList.toggle('open');
  }
  
  function toggleActive(e) {
    console.log(e.propertyName);
    if(e.propertyName.includes('flex')) {
     this.classList.toggle('open-active'); 
   }
  }
  
  panels.forEach(panel => panel.addEventListener('click', toggleOpen));
  panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));

}

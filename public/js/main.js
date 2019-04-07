const $sections = document.querySelectorAll('.individual-section');

window.onscroll = function() {
    slideUp($sections);
};

function slideUp($e) {
  for(let $section of $e) {
    let $position = $e.offsetTop;
    if(window.pageYOffset <= $position) {
      $section.classList.add('animated');
      $section.classList.add('fadeInUp');
    } else {
      $section.classList.remove('animated');
      $section.classList.remove('fadeInUp');
    }
  }
}

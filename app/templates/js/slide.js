document.addEventListener('DOMContentLoaded', function () {
  const images = [
    { src: 'img/img_kimbob_1.png', link: 'map_view.html#1' },
    { src: 'img/img_kimbob_2.png', link: 'map_view.html#2' },
    { src: 'img/img_kimbob_5.png', link: 'map_view.html#5' },
    { src: 'img/img_kimbob_12.png', link: 'map_view.html#12' }
  ];

  let currentIndex = 0;
  const slideImage = document.getElementById('slideImage');
  let intervalId = null;

  function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    slideImage.src = images[currentIndex].src;
  }

  function startSlideshow() {
    intervalId = setInterval(showNextImage, 3000);
  }

  function stopSlideshow() {
    clearInterval(intervalId);
  }

  slideImage.src = images[0].src;

  slideImage.addEventListener('click', () => {
    window.location.href = images[currentIndex].link;
  });

  slideImage.addEventListener('mouseenter', stopSlideshow);
  slideImage.addEventListener('mouseleave', startSlideshow);

  startSlideshow();
});

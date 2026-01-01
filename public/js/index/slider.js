const slider = document.querySelector(".slider__items");
const slide = document.querySelector(".slider__item");

function sliderMove(positive = true) {
  const slideWidth = slide.offsetWidth;
  if (positive) {
    if (
      slider.scrollLeft + slideWidth >=
      slider.scrollWidth - slider.clientWidth
    ) {
      slider.scrollLeft = 0; // возвращаемся в начало
    } else {
      slider.scrollLeft += slideWidth;
    }
  } else {
    if (slider.scrollLeft - slideWidth < 0) {
      slider.scrollLeft = slider.scrollWidth; // прыгаем в конец
    } else {
      slider.scrollLeft -= slideWidth;
    }
  }
}

// slider.addEventListener("wheel", (e) => {
//   if (e.deltaY > 0) {
//     e.currentTarget.scrollLeft += e.currentTarget.clientWidth;
//   } else {
//     e.currentTarget.scrollLeft -= e.currentTarget.clientWidth;
//   }
// });

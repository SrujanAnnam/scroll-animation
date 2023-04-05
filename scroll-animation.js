
document.querySelector('html').style.overflowX = 'hidden';

const scrollElements = document.querySelectorAll('[scroll-reveal]');

observer = new IntersectionObserver((entries, observer) => {
entries.forEach(entry => {
if (!entry.isIntersecting) {
  console.log(entry.target)
  setStyle(entry.target);
}
else {
  entry.target.removeAttribute('style');
  if (!entry.target.getAttribute('scroll-reveal').includes('loop')) {
    observer.unobserve(entry.target);
  }
};
});
});

setStyle = (element) => {
const attribute = element.getAttribute('scroll-reveal');
element.removeAttribute('scroll-reveal');
const elementMatrix = getComputedStyle(element).transform;
if (elementMatrix == "none") {
var matrixValues = [1, 0, 0, 1, 0, 0];
}
else {
var matrixValues = elementMatrix.match(/\-?\d*\.?\d+(e\-?\d*\.?\d+)?/g).map(Number); 
}
if (attribute.includes('top')) {
matrixValues[5] -= Number(getComputedStyle(element).height.slice(0, -2))/2;
}
if (attribute.includes('right')) {
matrixValues[4] += Number(getComputedStyle(element).width.slice(0, -2))/2;
}
if (attribute.includes('bottom')) {
matrixValues[5] += Number(getComputedStyle(element).height.slice(0, -2))/2;
}
if (attribute.includes('left')) {
matrixValues[4] -= Number(getComputedStyle(element).width.slice(0, -2))/2;
}
if (attribute.includes('grow')) {
matrixValues[0] /= 9.25;
matrixValues[3] /= 9.25;
}
if (attribute.includes('shrink')) {
matrixValues[0] *= 1.25;
matrixValues[3] *= 1.25;
}
element.setAttribute('style',`transform:matrix(${matrixValues.join(', ')}); opacity: 0; transition: all 0s`);
element.setAttribute('scroll-reveal', attribute);
};

scrollElements.forEach(scrollElement => {
setStyle(scrollElement);
observer.observe(scrollElement);
});

const style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '[scroll-reveal] { transition: transform 1s ease-out, opacity 0.6s ease-out }';
document.querySelector('head').appendChild(style);

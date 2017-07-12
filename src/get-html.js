(() => {
  const parent = document.getElementsByTagName('ts-rocket')[0].cloneNode(true);
  parent.querySelectorAll('.shadow').forEach(elem => {
    elem.parentElement.removeChild(elem);
  });
  parent.querySelectorAll('*').forEach(elem => {
    elem.removeAttribute('id');
    elem.removeAttribute('class');
    elem.removeAttribute('style');
    elem.removeAttribute('tabindex');
  });
  return parent.innerHTML;
})();

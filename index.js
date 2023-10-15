const menuButton = document.querySelector('#menu');
const drawerIcons = document.querySelectorAll('.drawer_icon');
const dropdownButtons = document.querySelectorAll('.dropdown');
const drawer = document.querySelector('.drawer');
const overlayDiv = document.getElementById('overlay');

const handleMenuClick = () => {
  drawerIcons.forEach((icon) => icon.classList.toggle('hidden'));
  overlayDiv.classList.toggle('hidden');
  drawer.classList.toggle('open');
};

const handleDropdownClick = (idx) => {
  const targetButton = Array.from(dropdownButtons)[idx];
  targetButton.querySelectorAll('img').forEach((img) => img.classList.toggle('hidden'));
  const targetList = targetButton.nextElementSibling;
  targetList.classList.toggle('hidden');
  document.querySelectorAll('.dropdown__list').forEach((list) => {
    if (list !== targetList && !list.classList.contains('hidden')) {
      list.classList.toggle('hidden');
    }
  });
};
const handleOverlayClick = (event) => {
  if (event.clientX < drawer.getBoundingClientRect().left) {
    handleMenuClick();
  }
};

menuButton.addEventListener('click', handleMenuClick);
dropdownButtons.forEach((btn, idx) => btn.addEventListener('click', () => handleDropdownClick(idx)));
overlayDiv.addEventListener('click', handleOverlayClick);

window.addEventListener('click', (event) => {
  const topLevelNav = document.querySelector('.top-level__nav');
  const dropdownLists = document.querySelectorAll('.dropdown__list');
  dropdownLists.forEach((list) => {
    const clickOutOfBounds =
      event.clientX < topLevelNav.getBoundingClientRect().left ||
      event.clientX > topLevelNav.getBoundingClientRect().right ||
      event.clientY < topLevelNav.getBoundingClientRect().top ||
      event.clientY > topLevelNav.getBoundingClientRect().bottom;

    if (clickOutOfBounds && !list.classList.contains('hidden')) {
      list.classList.toggle('hidden');
    }
  });
});

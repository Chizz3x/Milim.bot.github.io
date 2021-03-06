function openInNewTab(url) {
	let win = window.open(url, '_blank');
  win.focus()
}

document.getElementById('menu').addEventListener('touchstart', function(e) {
  let el = document.getElementById('menu');
  document.getElementById('screen').classList.remove('screen-transition');
  el.classList.remove('menu-drag');
  sessionStorage.pos = e.touches[0].clientX < el.offsetWidth ? el.classList.contains('menu-closed') ? el.offsetWidth + e.touches[0].clientX : e.touches[0].clientX : e.touches[0].clientX;
  sessionStorage.tms = new Date().getTime();
}, false);

document.getElementById('menu').addEventListener('touchend', function(e) {
  let el = document.getElementById('menu'),
  scrn = document.getElementById('screen');

  el.classList.add('menu-drag');
  scrn.classList.add('screen-transition');

  let pos = sessionStorage.pos,
  tms = sessionStorage.tms;

  let now = new Date().getTime();

  let open = false,
  close = false;
  if((pos - e.changedTouches[0].clientX < -100 && !el.classList.contains('menu-closed')) || (e.changedTouches[0].clientX + el.offsetWidth - pos > 100 && el.classList.contains('menu-closed') && now - tms <= 150)) open = true
    else if(pos - e.changedTouches[0].clientX > 100 && !el.classList.contains('menu-closed') && now - tms <= 150) close = true;

  if((Math.abs(el.getBoundingClientRect().left) * 100 / el.offsetWidth >= 50 || close) && !open) {
    el.classList.add('menu-closed');
    document.getElementById('menu-arrow-box').classList.remove('menu-arrow-box-out');
    el.style.transform = `translateX(${-el.offsetWidth}px)`;
    scrn.style['background-color'] = `rgba(20,20,20,0)`;
  } else if(Math.abs(el.getBoundingClientRect().left) * 100 / el.offsetWidth < 50 || open) {
    el.classList.remove('menu-closed');
    document.getElementById('menu-arrow-box').classList.add('menu-arrow-box-out');
    el.style.transform = `translateX(0px)`;
    scrn.style['background-color'] = `rgba(20,20,20,0.8)`;
  };
}, false);

let aboutBoxes = document.getElementsByClassName('about-box');
let activeAboutBox = aboutBoxes[0];
aboutBoxes[0].classList.add('aboutBoxActive');

window.addEventListener('touchmove', e => {
  let el = document.getElementById('menu'),
  menuArrow = document.getElementById('menu-arrow-box'),
  scrn = document.getElementById('screen');

  if(!el.classList.contains('menu-drag')) {
    let offset = sessionStorage.pos;
    if(!offset) offset = 0;
    let touch = e.targetTouches[0].pageX + (el.offsetWidth - offset);
    if(touch - el.offsetWidth > 0 || touch - el.offsetWidth < -el.offsetWidth) return menuArrow.classList.add('menu-arrow-box-out');
    scrn.style['background-color'] = `rgba(20,20,20,${0.8 / el.offsetWidth * touch})`;
    if(menuArrow.classList.contains('menu-arrow-box-out') && el.classList.contains('menu-closed')) menuArrow.classList.remove('menu-arrow-box-out');
    el.style.transform = `translateX(${touch - el.offsetWidth}px)`;
  }

	for(let i = 0; i < aboutBoxes.length; i++) {
		let abtBoxRect = aboutBoxes[i].getBoundingClientRect();
		if(abtBoxRect.top <= window.innerHeight / 2 && abtBoxRect.height + abtBoxRect.top >= window.innerHeight / 2) {
			if(!aboutBoxes[i].classList.contains('aboutBoxActive')) {
				activeAboutBox.classList.remove('aboutBoxActive');
				aboutBoxes[i].classList.add('aboutBoxActive');
				activeAboutBox = aboutBoxes[i];
			}
		}
	}
});

document.addEventListener("DOMContentLoaded", () => {
	sessionStorage.loaded = true;
})

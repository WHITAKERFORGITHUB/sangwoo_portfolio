'use strict';
// 헤더의 높이를 알아내보자
const header = document.querySelector('.header')
const headerHeight = header.getBoundingClientRect().height;
document.addEventListener('scroll', function() {
    //console.log('헤더높이: ' + scrollY)
    if(window.scrollY > headerHeight) {
        header.classList.add('header--dark')
    } else {
        header.classList.remove('header--dark')
    }
})

// y좌표의 높이가 home끝에 가까워질수록 투명하게
// Home 섹션을 아래로 스크롤 시 투명하게 처리
const home = document.querySelector('.home__container')
const homeHeight = home.offsetHeight;
console.log(homeHeight)
document.addEventListener('scroll', function() {
    //console.log(1 - window.scrollY / homeHeight)
    home.style.opacity = 1 - window.scrollY / homeHeight
})

// Arrow up 스크롤 내리면 나타나게 하기
const arrow = document.querySelector('.arrow-up');
document.addEventListener('scroll', function() {
    if(window.scrollY > homeHeight/2) {
        arrow.style.opacity = 1;
    } else {
        arrow.style.opacity = 0;
    }
})

// navbar 토글버튼 클릭 처리
const navbarMenu = document.querySelector('.header__menu');
const navbarToggle = document.querySelector('.header__toggle');
navbarToggle.addEventListener('click', ()=> {
    navbarMenu.classList.toggle('open')
})

// navbar 메뉴 클릭 시 메뉴를 자동으로 닫아줌
navbarMenu.addEventListener('click', ()=> {
    navbarMenu.classList.remove('open')
})
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



// 구현계획
// 1. 모든섹션 요소들과 메뉴 아이템들을 가지고 온다.
// 2. IntersectionObserver를 사용해서 모든 섹션들을 관찰해야 한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.
// 보여지는 섹션:
//   - 다수의 섹션이 동시에보여진다면, 가장 첫번째 섹션을 선택
//   - 마지막 contact 섹션이 보여진다면, 가장 마지막 섹션을 선택
const sectionIds = ['#home', '#about', '#skills', '#testimonial', '#contact'];
const sections = sectionIds.map(id=>document.querySelector(id))
const navItems = sectionIds.map(id => document.querySelector(`[href="${id}"]`))
//console.log(navItems)
//console.log(sectionIds)
//console.log(sections)

const visibleSections = sectionIds.map(()=> {
    false;
})

// 10.10 메뉴선택하기
let activeNavItem = navItems[0];

const options = {
    rootMargin: '-20% 0px 0px 0px',
    threshold: [0, 0.98]
};
const observer = new IntersectionObserver(observerCallback, options);
//sections.forEach(section => observer.observe(section));
sections.forEach((section)=> {
    observer.observe(section)
})

function observerCallback(entries) {

    // flag변수
    let selectLastOne;

    entries.forEach((entry)=> {
        const index = sectionIds.indexOf(`#${entry.target.id}`);
        visibleSections[index] = entry.isIntersecting;
        selectLastOne = 
            index === sectionIds.length - 1 && 
            entry.isIntersecting && 
            entry.intersectionRatio >= 0.95
            
        //console.log(entry.target.id)
        //console.log(index)
        //console.log(entry.target)
        //console.log(entry.isIntersecting)
        //console.log(entry.intersectionRatio)
    })
    //console.log(visibleSections)
    //console.log(selectLastOne);

    const navIndex = selectLastOne ? sectionIds.length - 1: findFirstIntersecting(visibleSections);
    //console.log(sectionIds[navIndex])

    // 10.10 메뉴선택하기   
    selectNavItem(navIndex);
}

function findFirstIntersecting(intersections) {
    const index = intersections.indexOf(true);
    return index >= 0 ? index : 0
}

function selectNavItem(index) {
    const navItem = navItems[index];
    if(!navItem) return;
    activeNavItem.classList.remove('active');
    activeNavItem = navItem;
    activeNavItem.classList.add('active');
}

// Typeit
new TypeIt('.home__title--strong') // Sangwoo Park
//.move(-12)
.go();

document.querySelector('.ti-cursor').remove();

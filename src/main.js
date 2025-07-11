const header = document.querySelector('.header')

// 헤더의 높이를 알아내보자
const headerHeight = header.getBoundingClientRect().height;
document.addEventListener('scroll', function() {
    //console.log('헤더높이: ' + scrollY)
    if(window.scrollY > headerHeight) {
        header.classList.add('header--dark')
    } else {
        header.classList.remove('header--dark')
    }

})
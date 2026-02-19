const allElem = document.querySelectorAll('.elem');
const close = document.querySelectorAll('.back')
const fullElem = document.querySelectorAll('.fullElem')

allElem.forEach((elem , idx)=>{
    elem.addEventListener('click' , ()=>{
        fullElem[idx].style.display = 'block'    
    });
})

close.forEach((closeElem , idx)=>{
    closeElem.addEventListener('click' , ()=>{
        fullElem[idx].style.display = 'none'    
    })
})
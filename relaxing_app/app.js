//access DOM and set variables to the container class and the text paragraph
const container = document.querySelector('.container')
const text = document.querySelector('#text')

//set time for every activity, breathing, holdtime and total relaxation time
const totalTime = 10000
const breathTime = (totalTime / 5) * 2
const holdTime = totalTime / 5

breathAnimation()

//create breath function
function breathAnimation(){
    text.innerHTML = 'Breath In'
    container.className = 'container grow'

    setTimeout(()=>{
        text.innerText = 'Hold'

        setTimeout(()=>{
            text.innerText = 'Breath Out'
            container.className = 'container shrink'
        }, holdTime)
    }, breathTime)
}
// call the breath function after every totalTime sec
setInterval(breathAnimation,totalTime)
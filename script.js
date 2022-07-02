
const nums = document.querySelectorAll(".num");
const operations = document.querySelectorAll(".op");
const screen = document.querySelector(".result");
const enter = document.querySelector(".equals");
const theme_slider = document.querySelector(".theme-slider");
const decimal = document.querySelector(".decimal");
const reset = document.querySelector(".reset");
const del = document.querySelector(".del");
let currentTheme;
let num1="";
let num2="";
let operation = "";
let result;
let numflag = false;
let nextTheme;

function set_nextTheme(){
    switch(currentTheme){
        case "themeOne":
            nextTheme = "themeTwo";
            break;
        case "themeTwo":
            nextTheme= "themeThree";
            break;
        case "themeThree":
            nextTheme="themeOne";
    }
}

function getTheme(){
    currentTheme=localStorage.getItem("theme");
    if(currentTheme == "undefined" || currentTheme == "null")
    currentTheme = "themeOne";
    document.body.classList.add(currentTheme);
}

window.onload=getTheme();

function addNum(num){
    if(numflag)
    {   
        num2+=num;
        screen.innerHTML=num2;
    }
    else
    {
        num1+=num;
        screen.innerHTML=num1;
    }
}
function calculate(){
    switch(operation){
        case"+":
            result= Math.round((parseFloat(num1) + parseFloat(num2))*100)/100;
            break;
        case "-":
            result= Math.round((parseFloat(num1) - parseFloat(num2))*100)/100;
            break;
        case "/":
            result= Math.round((parseFloat(num1) / parseFloat(num2))*100)/100;
            break;
        case "x":
            result= Math.round((parseFloat(num1) * parseFloat(num2))*100)/100;
            break;
    }
    return result;
}

reset.addEventListener("click",()=>{
    screen.innerHTML="";
    num1="";
    num2="";
    numflag=false;
})

nums.forEach(num=>{
    num.addEventListener("click",()=>{
        addNum(num.innerHTML);
    })
})

operations.forEach(op=>{
    op.addEventListener("click",()=>{
        if(num1=="")
        return;
        if(num2!="")
        {
            num1=calculate();
            num2="";
        }
    
        numflag=true;
        screen.innerHTML=num1 + op.innerHTML;
        operation = op.innerHTML;
    })
})

enter.addEventListener("click",()=>{
    screen.innerHTML=calculate();
})

theme_slider.addEventListener("click",()=>{
    currentTheme = document.body.classList[0];
    set_nextTheme();
    document.body.classList.remove(currentTheme);
    document.body.classList.add(nextTheme);
    localStorage.setItem("theme", nextTheme);
})

decimal.addEventListener("click",()=>{
    if(num1=="")
    return;
    if(numflag)
    {
        num2+="."
        screen.innerHTML=num2;
    }
    else{
        num1+="."
        screen.innerHTML=num1;
    }
})

del.addEventListener("click",()=>{
    if(numflag)
    {
        if(num2!="")
        {
            num2=num2.slice(0,-1);
            screen.innerHTML=num2;
        }
        else
        {
            op=""
            screen.innerHTML=num1;
        }
    }
    else
    {
        num1 = num1.slice(0,-1)
        screen.innerHTML=num1;
    }
})

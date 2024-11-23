
let inputFields=document.querySelectorAll("input")
let input1=inputFields[0];
let input2=inputFields[1];



const updateConversion = async (fromInput, toInput) => {
    if (fromInput.value.trim() === "") {
        toInput.value = "";
        return; 
    }

    let from, to;

    if (fromInput === input1) {
        from = document.querySelector(`.one .selected`).textContent;
        to = document.querySelector(`.two .selected`).textContent;
    } else {
        from = document.querySelector(`.two .selected`).textContent;
        to = document.querySelector(`.one .selected`).textContent;
    }

    if (from === to) {
        toInput.value = fromInput.value;
        return;
    }

    try {
        const response = await fetch(
            `https://v6.exchangerate-api.com/v6/e4bcaa86c3ddaa19e900cf2f/pair/${from}/${to}/${fromInput.value}`
        );
        const data = await response.json();
        document.querySelector(".error").textContent = "";
        if (fromInput.value.trim() !== "") {
            if(document.querySelector(".input-one p").textContent==""&&document.querySelector(".input-two p").textContent==""){
                defaultCurr();
            }
            toInput.value = +parseFloat(data.conversion_result.toFixed(5));
        }
    } catch (err) {
        document.querySelector(".input-one p").textContent=""
        document.querySelector(".input-two p").textContent=""
        document.querySelector(".error").textContent =
            "⚠️ No Internet Connection. Please check your network.";
        toInput.value = "";
    }
};



function defaultCurr(){
    let currFirst=document.querySelector(".one .selected").textContent;
    let currSecond=document.querySelector(".two .selected").textContent;
    // fetch(`https://api.exchangerate.host/convert?access_key=3681f2cd77599c4265839abb80853091&from=${currFirst}&to=${currSecond}&amount=1`)
    //     .then(res=>res.json())
    //     .then(data=>{
    //         document.querySelector(".input-one p").textContent=`1${currFirst} = ${data.result} ${currSecond}`
    //     })

    // fetch(`https://api.exchangerate.host/convert?access_key=3681f2cd77599c4265839abb80853091&from=${currSecond}&to=${currFirst}&amount=1`)
    //     .then(res=>res.json())
    //     .then(data=>{
    //         document.querySelector(".input-two p").textContent=`1${currSecond} = ${data.result} ${currFirst}`
    // })
    if(currFirst==currSecond){
        document.querySelector(".input-one p").textContent=`1${currFirst} = 1${currSecond}`
        document.querySelector(".input-two p").textContent=`1${currSecond} = 1${currFirst}`
    }else{
        document.querySelector(".input-one p").textContent="";
        document.querySelector(".input-two p").textContent="";
        fetch(`https://v6.exchangerate-api.com/v6/e4bcaa86c3ddaa19e900cf2f/pair/${currFirst}/${currSecond}/1`)
        .then(res=>res.json())
        .then(data=>{
            document.querySelector(".input-one p").textContent=`1${currFirst} = ${data.conversion_result} ${currSecond}`
        })
        .catch(err=>{
        document.querySelector(".error").textContent="⚠️ No Internet Connection. Please check your network."
        toInput.value=""
    })
        fetch(`https://v6.exchangerate-api.com/v6/e4bcaa86c3ddaa19e900cf2f/pair/${currSecond}/${currFirst}/1`)
        .then(res=>res.json())
        .then(data=>{
            document.querySelector(".input-two p").textContent=`1${currSecond} = ${data.conversion_result} ${currFirst}`
        })
        .catch(err=>{
        document.querySelector(".error").textContent="⚠️ No Internet Connection. Please check your network."
        toInput.value=""
    })
    }
}
defaultCurr()

inputFields.forEach(input=>{
    input.addEventListener('input', () => {

    if(input.value[0]==","||input.value[0]=="."){
        input.value = input.value.substring(1);
    }
    let value = input.value.replace(',', '.');

    
    if(value.includes(".")){
            value= `${value.split('.')[0]}.${value.split(".")[1].slice(0,5)}`
    }
    value = value.replace(/[^0-9.]/g, '');
    if (value.length > 1 && value[0] === '0' && value[1] !== '.') {
        value = value.replace(/^0+(?!$)/, '');
    }

    input.value=value;
    })
})

input1.addEventListener("input",()=>{
    updateConversion(input1,input2)
})
input2.addEventListener("input",()=>{
    updateConversion(input2,input1)
})


document.querySelectorAll(".one button").forEach(btn=>{
    btn.addEventListener("click",()=>{
        document.querySelectorAll(".one button").forEach(button=>{
            button.classList.remove("selected")
        })
        btn.classList.add("selected");
        updateConversion(input2,input1)
        defaultCurr()
    })
})
document.querySelectorAll(".two button").forEach(btn=>{
    btn.addEventListener("click",()=>{
        document.querySelectorAll(".two button").forEach(button=>{
            button.classList.remove("selected")
        })
        btn.classList.add("selected");
        updateConversion(input1,input2)
        defaultCurr()
    })
})


const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");


hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});
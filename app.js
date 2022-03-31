let form = document.querySelector('.form')
let orderNow = document.querySelector('.orderNow')
let pizzaComponents = ''
let confirmStr = ''



//Button from the first interface, when clicked , it shows the ordering pizza form 
  orderNow.addEventListener('click', ()=>{
     orderNow.style.display = 'none'
     form.style.display = 'block'
     
  })

     //START OF PIZZA CREATION AND PRICING
   document.querySelector('.form-btn').addEventListener('click' , (e)=>{
    e.preventDefault()
    displayCheckOut()
  })

  //returns the array with the whole pizza composition and it's price
   function showPrice() {
     let pizza = makePizza()
     let price = getPrice()
     let pizzaToppingsStr = transformArrToStr(pizza)
     let pizzaInfo = [price, pizzaToppingsStr]
     return pizzaInfo
   }

//Gets info from the form , creates the pizza object
 function makePizza(){
   let crust = document.querySelector('input[name="crust"]:checked').value
   let size = document.querySelector('input[name="size"]:checked').value
   let toppings = document.querySelectorAll('input[type="checkbox"]:checked')
   let toppingsArr = []
   for (var i = 0; i < toppings.length; i++) {
     toppingsArr.push(toppings[i].name)
   }
   let pizza ={
      crust:crust,
      size:size,
      toppings:toppingsArr
   }


   return pizza
 }

  //calculates the price of the pizza based on crust, size and toppings , add strings to pizzaComponents
 function getPrice(){
   let pizza = makePizza()
   let price = 20
   if(pizza.crust === 'whole wheat'){
     price+=5
   }
   if(pizza.crust === 'gluten free'){
     price+=6
   }
   if(pizza.size === 'medium'){
     price+=6
   }
   if(pizza.size === 'large'){
     price+=8
   }
   pizza.toppings.forEach((element)=>{
     price+=10
   })
   pizzaComponents+=` ${pizza.crust} crust ${pizza.size} sized pizza `
   return price
 }

 //the toppings are a nodeList , I have to convert to an array in order to loop throught them and calculate the price.Adds strings to pizza components
 const transformArrToStr =(obj)=>{
   let toppingsArr=obj.toppings 
   let str =''
   if(toppingsArr.length ===0){
     str = 'no toppings'
   }
   if(toppingsArr.length ===1){
     str=toppingsArr[0]
   }
   if(toppingsArr.length === 2){
     str += `${toppingsArr[0]} and ${toppingsArr[1]}`
   }
   if(toppingsArr.length >=3){
      for(var i = 0 ; i < toppingsArr.length-1 ; i++){
        

        if (i === toppingsArr.length - 2){
          str += `${toppingsArr[i]}`
        }else{
          str += `${toppingsArr[i]}, `

        }
      }
      str += ` and ${toppingsArr[toppingsArr.length - 1]}`
    }
    pizzaComponents+='with '+str
    
   return pizzaComponents
 }

 //calls showPrice() , shows the checkout interface , creates confirmStr
 function displayCheckOut(){
    pizzaInfo = showPrice()
   let checkOut = document.querySelector('.checkout')
   checkOut.classList.add('checkout-fade')
   checkOut.style.display = 'block'
   form.style.display = 'none'
   let confirmStr = `Your ${pizzaInfo[1]} will cost ${pizzaInfo[0]} shekels`
   document.querySelector('.pizza-description').innerText = confirmStr
   

 }


 //END OF PIZZA CREATION AND PRICING
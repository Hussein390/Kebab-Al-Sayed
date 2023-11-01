class Food {
  constructor(cont, food_name, name, num, size) {
    this.cont = cont;
    this.food_name = food_name;
    this.name = name;
    this.num = num;
    this.size = size;
  }
}


// food price
function addPrice(sel, pr) {
  let selcet = document.querySelector(`#${sel}`);
  let divs = document.querySelectorAll(`#${sel} div`);
  let price = document.querySelector(`.${pr}`);

  selcet.addEventListener('click', () => {
    divs.forEach(op => {
      op.classList.toggle('hidden');

      op.addEventListener('click', () => {
        if (op.getAttribute('data-price') >= 10000) {
          price.innerHTML = op.getAttribute('data-price');
          localStorage.setItem('price', op.innerHTML)
        } else if (op.getAttribute('data-price') >= 5000) {
          localStorage.setItem('price', op.innerHTML)
          price.innerHTML = op.getAttribute('data-price');
        } else price.innerHTML = op.getAttribute('data-price');
        localStorage.setItem('price', op.innerHTML)
        // selcet.textContent = op.textContent;
      })
    })

  })
}
addPrice('selcet', 'price');
addPrice('selcet1', 'price1');
addPrice('selcet2', 'price2');
addPrice('selcet3', 'price3');

// show-food
document.getElementById('show-food').addEventListener('click', () => {
  cont.parentElement.parentElement.parentElement.parentElement.classList.toggle('opacity-100');
  document.getElementById('btn').style.display = 'block';
  document.getElementById('btn').classList.toggle('opacity-100');
  document.getElementById('form').classList.toggle('opacity-100');
})


let cont = document.getElementById('conterPlus');
let plus = 'plus';
let mins = 'mins';
let conter1 = document.getElementById('conterPlus1');
let plus1 = 'plus1';
let mins1 = 'mins1';
let conter2 = document.getElementById('conterPlus2');
let plus2 = 'plus2';
let mins2 = 'mins2';
let conter3 = document.getElementById('conterPlus3');
let plus3 = 'plus3';
let mins3 = 'mins3';



function addAndremove(class1, class2, class3) {
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains(class1)) {
      class3.innerHTML++
    } else if (e.target.classList.contains(class2)) {
      class3.innerHTML--
    }
  })
}

addAndremove(plus, mins, cont)
addAndremove(plus1, mins1, conter1)
addAndremove(plus2, mins2, conter2)
addAndremove(plus3, mins3, conter3)

let names = document.getElementById('name')
let button = document.getElementById('btn')
let num = document.getElementById('conter')

button.addEventListener('click', () => {
  const food_name = document.querySelectorAll('.food-name');
  const select = document.querySelectorAll('#selcet');


  let size = localStorage.getItem('price');
  let size1 = localStorage.getItem('price');
  let size2 = localStorage.getItem('price');
  let size3 = localStorage.getItem('price');

  if (names.value === '') {
    UI.showAlert('Make Sure That You Added The Name And Food Type', 'bg-red-500');
  } else {
    if (cont.innerHTML > 0) {
      const food = new Food(cont.innerHTML, food_name[0].innerHTML, names.value, 1, size)
      UI.addOrdersToList(food)
      // add to local storge
      store.addOrders(food)
    }
    if (conter1.innerHTML > 0) {
      const food = new Food(conter1.innerHTML, food_name[1].innerHTML, names.value, 2, size1)
      UI.addOrdersToList(food)
      // add to local storge
      store.addOrders(food)
    }
    if (conter2.innerHTML > 0) {
      const food = new Food(conter2.innerHTML, food_name[2].innerHTML, names.value, 3, size2)
      UI.addOrdersToList(food)
      // add to local storge
      store.addOrders(food)
    }
    if (conter3.innerHTML > 0) {
      const food = new Food(conter3.innerHTML, food_name[3].innerHTML, names.value, 4, size3)
      UI.addOrdersToList(food)
      // add to local storge
      store.addOrders(food)
    }
  }
  names.value = '';
  cont.innerHTML = 0;
  conter1.innerHTML = 0;
  conter2.innerHTML = 0;
  conter3.innerHTML = 0;
})
const mashoy = document.querySelector('#mashoy');
const kabab = document.querySelector('#kabab');
const pizza = document.querySelector('#pizza');
const chicken = document.querySelector('#chicken');


class UI {
  static displayOrders() {
    const storebooks = store.getOrders();

    storebooks.forEach(food => UI.addOrdersToList(food))
  }

  static addOrdersToList(food) {
    let div = document.createElement('div')
    div.className = "grid grid-cols-3 justify-center relative p-2 bg-slate-100 rounded-md mt-2";

    div.innerHTML = `
  
    <div class="flex items-center ">
    <img class="w-20 rounded-full mr-2" src="imgs/food-${food.num}.jpg" alt="">
    </div>
    <div class="w-[150px] ml-[-25px] mt-[25px]">
      <span class="text-lg block">
      <span id="remove-btn" class="select-none text-lg p-1 text-center w-[1.4rem] leading-4 h-[1.4rem] transition rounded-full cursor-pointer hover:bg-red-800 bg-slate-600 text-white -top-4 -right-[6px] block absolute">X</span>
      <span id="conter" data-num="${food.cont}" class="text-emerald-600 text-lg font-bold ">${food.cont}</span> ${food.food_name} عدد</span>
      <span class="text-lg block"> الحجم <span class="text-red-500">${food.size}</span></span>
      </div>
    <div class="flex w-[144px] ml-[-14px]">
      <span class="text-sm font-bold text-right">${food.name} :الاسم</span>
    </div>
  `
    if (food.food_name === 'كباب مشوي') {
      kabab.appendChild(div)
      UI.showAlert('Order Sent', 'bg-green-600')
    }
    if (food.food_name === 'مشاوي') {
      mashoy.appendChild(div)
      UI.showAlert('Order Sent', 'bg-green-600')
    }
    if (food.food_name === 'بيزه') {
      pizza.appendChild(div)
      UI.showAlert('Order Sent', 'bg-green-600')
    }
    if (food.food_name === 'دجاج مشوي') {
      chicken.appendChild(div)
      UI.showAlert('Order Sent', 'bg-green-600')
    }
  }

  static showAlert(Massage, className) {
    let div = document.createElement('div');
    div.className = `alert text-center text-white top-[17%] mt-6  w-full py-1 pl-3 mx-auto rounded-md ${className}`;
    div.appendChild(document.createTextNode(Massage));
    let container = document.querySelector('.food-container')
    let h1 = document.querySelector('.form')
    container.insertBefore(div, h1)

    setTimeout(() => document.querySelector('.alert').remove(), 3000)
  }

}
class store {
  static getOrders() {
    let Orders;
    if (localStorage.getItem('Orders') === null) {
      Orders = []
    } else {
      Orders = JSON.parse(localStorage.getItem('Orders'))
    }
    return Orders
  }
  static addOrders(order) {
    let Orders = store.getOrders();
    Orders.push(order);
    localStorage.setItem('Orders', JSON.stringify(Orders))
  }
  static removeOrders(re) {
    let Orders = store.getOrders();
    Orders.forEach((order, ind) => {
      if (order.cont === re) {
        Orders.splice(ind, 1)
      }
    })
    localStorage.setItem('Orders', JSON.stringify(Orders))
  }
}
document.addEventListener('DOMContentLoaded', UI.displayOrders)


// remove orders
document.addEventListener('click', e => {
  if (e.target.id === 'remove-btn') {
    e.target.parentElement.parentElement.parentElement.remove()
    store.removeOrders(e.target.nextElementSibling.dataset.num)
    UI.showAlert('Order Removed', 'bg-red-600')
  }
})
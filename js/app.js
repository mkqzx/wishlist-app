console.log("app.js підключено")

// масив обʼєктів з даними про бажання (назва, ціна, пріоритет)
const wishes = [
  {
    name: "Книга",
    price: 600,
    priority: "Низький"
  },
  {
    name: "iPhone 18 Pro",
    price: 80_000,
    priority: "Високий"
  },
  {
    name: "Гра в Steam",
    price: 230,
    priority: "Низький"
  },
  {
    name: "Машина Audi A6",
    price: 3_500_000,
    priority: "Високий"
  },
  {
    name: "Сет суші",
    price: 1000,
    priority: "Середній"
  }
]

const listContainer = document.querySelector("#wishlist")
listContainer.querySelectorAll(".wish-card").forEach(card => card.remove())

// функція рендеру: перебирає масив даних, динамічно створює HTML-картки з відповідними 
// класами та атрибутами пріоритету, після чого додає їх у DOM-контейнер сторінки
const renderWishes = (wishesArr) => {
  wishesArr.forEach(wish => {
    const cardItem = document.createElement("article")
    cardItem.className = "wish-card"

    const cardName = document.createElement("h3")
    cardName.className = "wish-card__name"
    cardName.textContent = wish.name

    const cardPrice = document.createElement("p")
    cardPrice.className = "wish-card__price"
    cardPrice.textContent = wish.price

    cardItem.prepend(cardName, cardPrice)

    cardItem.dataset.priority = wish.priority
    if (cardItem.dataset.priority === "Високий") {
      cardItem.classList.add("wish-card--high")
    }

    listContainer.append(cardItem)
  })
}

renderWishes(wishes)

function calcTotalCost(wishesArr) {
  let totalCost = 0 
  wishesArr.forEach(wish => {
    totalCost += wish.price
  })
  return totalCost
}

document.querySelector(".total-amount__num").textContent = calcTotalCost(wishes)



// класичний цикл for: підраховує загальну вартість усіх бажань 
// та класифікує їх (виводить повідомлення) залежно від пріоритету
// let totalCost = 0 
// for (let i = 0; i < wishes.length; i++) {
//   totalCost += wishes[i].price
  
//   if (wishes[i].priority === "Високий") {
//     console.log(`Бажання ${wishes[i].title} має високий пріоритет`)
//   }
//   else {
//     console.log(`Бажання ${wishes[i].title} може почекати`)
//   }
// }
// console.log(`Загальна вартість ${totalCost}`)

// стрілкова функція: перевіряє, чи вписується ціна товару у заданий бюджет
// повертає логічне значення: true або false
// const withinBudget = (price, budget) => price <= budget
// const budget = 5000

// цикл for of: перевіряє кожне бажання на доступність у рамках бюджету, 
// використовуючи стрілкову функцію withinBudget
// for (const wish of wishes) { 
//   const isEnough = withinBudget(wish.price, budget)
//   if (isEnough) {
//     console.log(`Бюджету в ${budget} вистачить на ${wish.title}`)
//   }
//   else {
//     console.log(`Бюджету в ${budget} не вистачить на ${wish.title}`)
//   }
// }

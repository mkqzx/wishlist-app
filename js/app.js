console.log("app.js підключено")

// масив обʼєктів з даними про бажання (назва, ціна, пріоритет)
const wishes = [
  {
    title: "Книга",
    price: 600,
    priority: "Низький"
  },
  {
    title: "iPhone 18 Pro",
    price: 80_000,
    priority: "Високий"
  },
  {
    title: "Гра в Steam",
    price: 230,
    priority: "Низький"
  },
  {
    title: "Машина Audi A6",
    price: 3_500_000,
    priority: "Високий"
  },
  {
    title: "Сет суші",
    price: 1000,
    priority: "Середній"
  }
]

// класичний цикл for: підраховує загальну вартість усіх бажань 
// та класифікує їх (виводить повідомлення) залежно від пріоритету
let totalCost = 0 
for (let i = 0; i < wishes.length; i++) {
  totalCost += wishes[i].price
  
  if (wishes[i].priority === "Високий") {
    console.log(`Бажання ${wishes[i].title} має високий пріоритет`)
  }
  else {
    console.log(`Бажання ${wishes[i].title} може почекати`)
  }
}
console.log(`Загальна вартість ${totalCost}`)

// стрілкова функція: перевіряє, чи вписується ціна товару у заданий бюджет
// повертає логічне значення: true або false
const withinBudget = (price, budget) => price <= budget
const budget = 5000

// цикл for of: перевіряє кожне бажання на доступність у рамках бюджету, 
// використовуючи стрілкову функцію withinBudget
for (const wish of wishes) { 
  const isEnough = withinBudget(wish.price, budget)
  if (isEnough) {
    console.log(`Бюджету в ${budget} вистачить на ${wish.title}`)
  }
  else {
    console.log(`Бюджету в ${budget} не вистачить на ${wish.title}`)
  }
}

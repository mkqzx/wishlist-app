console.log("app.js підключено")

// масив обʼєктів з даними про бажання (назва, ціна, пріоритет)
const wishes = [
  {
    name: "Книга",
    price: 600,
    priority: "low"
  },
  {
    name: "iPhone 18 Pro",
    price: 80_000,
    priority: "high"
  },
  {
    name: "Гра в Steam",
    price: 230,
    priority: "low"
  },
  {
    name: "Машина Audi A6",
    price: 3_500_000,
    priority: "high"
  },
  {
    name: "Сет суші",
    price: 1000,
    priority: "medium"
  }
]

const listContainer = document.querySelector("#wishlist")
listContainer.querySelectorAll(".wish-card").forEach(card => card.remove())

const form = document.querySelector("#add-wish-form")

// обробник відправки форми: зупиняє перезавантаження сторінки, 
// збирає валідні дані з усіх полів у новий об'єкт та викликає рендер
form.addEventListener("submit", event => {
  event.preventDefault()

  // const formWish = new FormData(form) або можна так
  const formWish = {}
  for (const element of form.elements)
  {
    if (!element.name) {
      continue
    }

    if (element.name === "price") {
      formWish[element.name] = Number(element.value)
      continue
    }

    if (element.type === "radio" && !element.checked) {
      continue
    }

    formWish[element.name] = element.value
  }

  wishes.push(formWish)
  renderWishes(wishes)
  form.reset()
})

const formPriceInput = document.querySelector("#wish-price")
// валідація ціни "на льоту": перевіряє значення під час введення
// і блокує відправку форми через setCustomValidity, якщо ціна <= 0
formPriceInput.addEventListener("input", () => {
  if (Number(formPriceInput.value) <= 0 && formPriceInput.value !== "") {
    formPriceInput.setCustomValidity("Ціна повинна бути більшою за 0.")
  }
  else {
    formPriceInput.setCustomValidity("")
  }
})

// делегування події кліку: addEventListener на головному контейнері, який відловлює 
// натискання на кнопку управління будь-якої картки і відкриває/закриває її меню
listContainer.addEventListener("click", event => {
  const actionBtn = event.target.closest(".wish-card__action-btn")

  if (actionBtn) {
    const actionsContainer = actionBtn.closest(".wish-card__action")
    const dropdown = actionsContainer.querySelector(".wish-card__dropdown")
    dropdown.classList.toggle("hidden")
  }
})

// делегування події зміни: перехоплює зміну випадаючого списку пріоритетів,
// оновлює дата-атрибут і точково перефарбовує поточну картку без повного перерендеру
listContainer.addEventListener("change", event => {
  if (event.target.matches(".wish-card__priority-select")) {
    const cardItem = event.target.closest(".wish-card")
    const newPriority = event.target.value

    cardItem.dataset.priority = newPriority
    cardItem.classList.remove("wish-card--high", "wish-card--medium", "wish-card--low")

    if (newPriority === "high") {
      cardItem.classList.add("wish-card--high")
    }
    else if (newPriority === "medium") {
      cardItem.classList.add("wish-card--medium")
    }
    else if (newPriority == "low") {
      cardItem.classList.add("wish-card--low")
    }
  }
})

// функція рендеру: перебирає масив даних, динамічно створює HTML-картки з відповідними 
// класами та атрибутами пріоритету, після чого додає їх у DOM-контейнер сторінки
const renderWishes = (wishesArr) => {
  listContainer.innerHTML = ""

  wishesArr.forEach(wish => {
    const cardItem = document.createElement("article")
    cardItem.className = "wish-card"

    // const cardName = document.createElement("h3")
    // cardName.className = "wish-card__name"
    // cardName.textContent = wish.name

    // const cardPrice = document.createElement("p")
    // cardPrice.className = "wish-card__price"
    // cardPrice.textContent = wish.price

    // cardItem.prepend(cardName, cardPrice)

    cardItem.dataset.priority = wish.priority
    if (cardItem.dataset.priority === "high") {
      cardItem.classList.add("wish-card--high")
    }
    else if (cardItem.dataset.priority === "medium") {
      cardItem.classList.add("wish-card--medium")
    }
    else if (cardItem.dataset.priority == "low") {
      cardItem.classList.add("wish-card--low")
    }

    cardItem.innerHTML = `
      <img class="wish-card__img" src="https://ngp-ua.info/wp-content/uploads/2021/04/11-26.jpg" alt="Фото ${wish.name}">
      <div class="wish-card__content">
        <h3 class="wish-card__name">${wish.name}</h3>
        <p class="wish-card__price">${wish.price}</p>
      </div>
      <div class="wish-card__action">
        <button type="button" class="wish-card__action-btn" aria-label="Управління карткою">
          <svg class="wish-card__action-svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path></svg>
        </button>
        <div class="wish-card__dropdown hidden">
          <div class="wish-card__dropdown-item">
            <label>Пріоритет:
              <select class="wish-card__priority-select">
                <option value="high" ${wish.priority === "high" ? "selected" : ""}>Високий</option>
                <option value="medium" ${wish.priority === "medium" ? "selected" : ""}>Середній</option>
                <option value="low" ${wish.priority === "low" ? "selected" : ""}>Низький</option>
              </select>
            </label>
          </div>
        </div>
      </div>`

    listContainer.append(cardItem)
    document.querySelector(".total-amount__num").textContent = calcTotalCost(wishes)
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

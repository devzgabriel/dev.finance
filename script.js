const Modal = {
  open() {
    // Abrir modal
    // Adicionar a class active ao modal
    document.querySelector(".modal-overlay").classList.add("active")
  },
  close() {
    // fechar o modal
    // remover a class active do modal
    document.querySelector(".modal-overlay").classList.remove("active")
  },
  toogle() {
    //se existe classe active, remover
    //se não colocar
  },
}

const transactions = [
  {
    id: 1,
    description: "Luz",
    amount: -50000,
    date: "23/01/2021",
  },
  {
    id: 2,
    description: "sitezin",
    amount: 500000,
    date: "19/01/2021",
  },
  {
    id: 3,
    description: "neti",
    amount: -9000,
    date: "25/01/2021",
  },
  {
    id: 4,
    description: "baguin",
    amount: 300000,
    date: "25/01/2021",
  },
]

const Transacion = {
  all: transactions,
  add(transaction) {
    Transacion.all.push(transaction)

    App.reload()
  },

  incomes() {
    let income = 0
    Transacion.all.forEach((transaction) => {
      if (transaction.amount > 0) income += transaction.amount
    })

    return income
  },

  expenses() {
    let expense = 0
    Transacion.all.forEach((transaction) => {
      if (transaction.amount < 0) expense += transaction.amount
    })

    return expense
  },

  total() {
    return Transacion.incomes() + Transacion.expenses()
  },
}

const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),
  addTransaction(transaction, index) {
    const tr = document.createElement("tr")
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)

    DOM.transactionsContainer.appendChild(tr)
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = ""
  },

  innerHTMLTransaction(transaction) {
    const { description, amount, date, id } = transaction

    const CSSclass = amount > 0 ? "income" : "expense"
    const amountFormated = Utils.formatCurrency(amount)

    const html = `
      <tr>
        <td class="description">${description}</td>
        <td class="${CSSclass}">${amountFormated}</td>
        <td class="date">${date}</td>
        <td>
          <img src="./assets/minus.svg" alt="Remover transação" />
        </td>
      </tr>
    `

    return html
  },

  updateBalance() {
    const incomeDisplay = (document.querySelector(
      "#incomeDisplay"
    ).innerHTML = Utils.formatCurrency(Transacion.incomes()))

    const expenseDisplay = (document.querySelector(
      "#expenseDisplay"
    ).innerHTML = Utils.formatCurrency(Transacion.expenses()))

    const totalDisplay = (document.querySelector(
      "#totalDisplay"
    ).innerHTML = Utils.formatCurrency(Transacion.total()))
  },
}

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : ""

    value = String(value).replace(/\D/g, "")
    value = Number(value) / 100
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })

    return signal + " " + value
  },
}

const App = {
  init() {
    Transacion.all.forEach((transaction) => {
      DOM.addTransaction(transaction)
    })
    DOM.updateBalance()
  },
  reload() {
    clearTransactions()
    App.init()
  },
}

App.init()

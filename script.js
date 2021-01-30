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

const Transacion = {
  all: [
    {
      description: "Luz",
      amount: -50000,
      date: "23/01/2021",
    },
    {
      description: "sitezin",
      amount: 500000,
      date: "19/01/2021",
    },
    {
      description: "neti",
      amount: -9000,
      date: "25/01/2021",
    },
    {
      description: "baguin",
      amount: 300000,
      date: "25/01/2021",
    },
  ],
  add(transaction) {
    Transacion.all.push(transaction)

    App.reload()
  },

  remove(index) {
    Transacion.all.splice(index, 1)
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
    const { description, amount, date } = transaction

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
  formatAmount(value) {
    value = Number(value.replace(/\,\./g, "")) * 100
    return value
  },
  formatDate(date) {
    const splittedDate = date.split("-")
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  },
}

const Form = {
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    }
  },

  validateFields() {
    const { description, amount, date } = Form.getValues()

    if (
      description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === ""
    ) {
      throw new Error("Por favor, preencha os campos!")
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues()
    amount = Utils.formatAmount(amount)
    date = Utils.formatDate(date)
    return {
      description,
      amount,
      date,
    }
  },

  clearFields() {
    Form.description.value = ""
    Form.amount.value = ""
    Form.date.value = ""
  },

  submit(event) {
    event.preventDefault()

    try {
      Form.validateFields()
      const transaction = Form.formatValues()
      Transacion.add(transaction)
      Form.clearFields()
      Modal.close()
      App.reload()
    } catch (error) {
      alert(error.message)
    }
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
    DOM.clearTransactions()
    App.init()
  },
}

App.init()

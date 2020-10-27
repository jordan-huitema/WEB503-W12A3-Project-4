const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text')
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null
    ? localStorageTransactions : [];

// Add Transaction
function addTrans(e) {
    e.preventDefault()

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert(`Please fill in the text and number feild's`)
    } else {
        const transaction = {
            id: generateId(),
            text: text.value,
            amount: +amount.value
        }
        transactions.push(transaction)
        addTransList(transaction)
        updateValues()
        updateLocalStorage()

        text.value = ''
        amount.value = ''
    }
}
// Genterate ID
function generateId() {
    // return random number between 0 and 100 mill
    // .floor() will round down a integer
    // .random will generate a random number between 0 and 1 e.g. 0.155486643224846481699
    return Math.floor(Math.random() * 100000000)
}

// Add transaction to HTML list
function addTransList(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    // Add class = to transaction amount
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')
    item.innerHTML = `${transaction.text} <span>${sign + Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeItem(${transaction.id})>x</button>`
    list.appendChild(item);
}
// Update total card
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount)
    const total = amounts.reduce((acc, itm) => (acc += itm), 0).toFixed(2)
    const income = amounts.filter(itm => itm > 0).reduce((acc, itm) => (acc += itm), 0).toFixed(2)
    const expense = (amounts.filter(itm => itm < 0).reduce((acc, itm) => (acc += itm), 0) * -1).toFixed(2)

    balance.innerText = `$${total}`
    money_plus.innerText = `$${income}`
    money_minus.innerText = `$${expense}`
}

// Remove Item by ID
function removeItem(id) {
    transactions = transactions.filter(transaction => transaction.id !== id)

    updateLocalStorage()
    init()
}

// Update localStorage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

// init app
function init() {
    list.innerHTML = ''
    transactions.forEach(addTransList())
    updateValues()
}

// Add trasaction 
form.addEventListener('submit', addTrans)
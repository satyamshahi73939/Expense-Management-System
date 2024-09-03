// Initial transactions array (can be replaced by an empty array or loaded from local storage)
let transactions = [];

// Get DOM elements
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const history = document.getElementById('history');
const form = document.getElementById('form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');

// Add a transaction
function addTransaction(e) {
    e.preventDefault();
    
    if (textInput.value.trim() === '' || amountInput.value.trim() === '') {
        alert('Please enter a text and amount');
        return;
    }
    
    const transaction = {
        id: generateID(),
        text: textInput.value,
        amount: +amountInput.value
    };
    
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    textInput.value = '';
    amountInput.value = '';
}

// Generate a random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Add transaction to DOM
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    
    const item = document.createElement('li');
    
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    
    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
    
    history.appendChild(item);
}

// Update balance, income, and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    
    const incomeTotal = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    
    const expenseTotal = (
        amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);
    
    balance.innerText = `$${total}`;
    income.innerText = `+$${incomeTotal}`;
    expense.innerText = `-$${expenseTotal}`;
}

// Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
}

// Initialize the app
function init() {
    history.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener('submit', addTransaction);
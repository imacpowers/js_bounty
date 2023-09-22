// Transaction class 
class Transaction {
    constructor(type, description, amount) {
        this.type = type;
        this.description = description;
        this.amount = amount;
        this.date = new Date(); te
    }
}


const transactions = [];

const transactionType = document.getElementById('transactionType');
const transactionDescription = document.getElementById('transactionDescription');
const transactionAmount = document.getElementById('transactionAmount');
const addButton = document.getElementById('addButton');
const transactionsList = document.getElementById('transactions');
const totalIncome = document.getElementById('totalIncome');
const totalExpenses = document.getElementById('totalExpenses');
const balance = document.getElementById('balance');
const financeChart = document.getElementById('financeChart').getContext('2d');


let myChart = null;

// transaction event listener
addButton.addEventListener('click', () => {
    try {
        const type = transactionType.value;
        const description = transactionDescription.value.trim();
        const amount = parseFloat(transactionAmount.value);

        if (!description || isNaN(amount) || amount <= 0) {
            throw new Error('Please fill in all fields and provide a valid amount.');
        }

        const transaction = createTransaction(type, description, amount);
        transactions.push(transaction);

        updateTransactionsList();
        updateSummary();

        // Destroy the existing chart instance before creating a new one
        if (myChart !== null) {
            myChart.destroy();
        }

        updateChart();
        resetForm();
    } catch (error) {
        alert(error.message);
    } finally {
        resetForm();
    }
});


function createTransaction(type, description, amount) {
    switch (type) {
        case 'income':
            return new Transaction('Income', description, amount);
        case 'expense':
            return new Transaction('Expense', description, -amount); // Expenses are negative
        case 'lend':
            return new Transaction('Lend', description, -amount); // Lend is treated as an expense
        case 'borrow':
            return new Transaction('Borrow', description, amount); // Borrow is treated as income
        default:
            throw new Error('Invalid transaction type.');
    }
}

// Update transaction list
function updateTransactionsList() {
    transactionsList.innerHTML = '';
    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.innerText = `${transaction.type}: ${transaction.description} - $${transaction.amount.toFixed(2)} (${transaction.date.toLocaleDateString()})`;
        transactionsList.appendChild(li);
    });
}


function updateSummary() {
    let income = 0;
    let expenses = 0;

    transactions.forEach(transaction => {
        switch (transaction.type) {
            case 'Income':
                income += transaction.amount;
                break;
            case 'Expense':
            case 'Lend':
                expenses += transaction.amount;
                break;
            case 'Borrow':
                income += transaction.amount;
                break;
        }
    });

    totalIncome.textContent = income.toFixed(2);
    totalExpenses.textContent = Math.abs(expenses).toFixed(2); 
    balance.textContent = (income + expenses).toFixed(2);
}

// Update the chart data
function updateChart() {
    
    const incomeData = [];
    const expensesData = [];
    const balanceData = [];
    const labels = [];

    // Sort transactions by date
    transactions.sort((a, b) => a.date - b.date);

    // Initialize initial balance as 0
    let currentBalance = 0;

    
    transactions.forEach(transaction => {
        labels.push(transaction.date.toLocaleDateString()); 
        incomeData.push(transaction.type === 'Income' || transaction.type === 'Borrow' ? transaction.amount : 0);
        expensesData.push(transaction.type === 'Expense' || transaction.type === 'Lend' ? -transaction.amount : 0);
        currentBalance += transaction.amount;
        balanceData.push(currentBalance);
    });

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Expenses',
                data: expensesData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Balance',
                data: balanceData,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    const config = {
        type: 'line',
        data: chartData,
        options: chartOptions,
    };

    myChart = new Chart(financeChart, config);
}

// Reset the form after adding a transaction
function resetForm() {
    transactionType.value = 'income';
    transactionDescription.value = '';
    transactionAmount.value = '';
}


updateChart();

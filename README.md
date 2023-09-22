# js_bounty

---

# Finance Tracker

Welcome to the Finance Tracker web application! This tool allows you to easily track your financial transactions, categorize them, and visualize your income, expenses, and balance over time.

## Getting Started

To use the Finance Tracker, follow these simple steps:

### Prerequisites

1. **Web Browser**: Make sure you have a modern web browser installed, such as Chrome, Firefox, or Safari.

### Installation

1. **Download the Code**: Download the source code for the Finance Tracker application. You can do this by clicking the "Download ZIP" button or using Git to clone the repository.

2. **Unzip the Files**: If you downloaded a ZIP file, unzip it to access the application files.

### Running the Application

1. **Open `index.html`**: Navigate to the folder where you unzipped the application files and open the `index.html` file in your web browser. This will load the Finance Tracker web page.

## Using the Finance Tracker

### Adding Transactions

1. **Transaction Type**: Use the "Transaction Type" dropdown menu to select the type of transaction. You can choose from "Income," "Expense," "Lend," or "Borrow."

2. **Description**: Enter a brief description of the transaction in the "Description" field.

3. **Amount**: Enter the transaction amount in the "Amount" field. For expenses and lends, use a negative value (e.g., -50 for a $50 expense).

4. **Add Transaction**: Click the "Add Transaction" button to add the transaction to your list.

### Viewing Transactions

1. **Transaction List**: The "Transactions" section displays a list of all your transactions. It includes the type, description, amount, and date of each transaction.

### Summary

1. **Total Income**: The "Summary" section shows your total income, total expenses (displayed as positive values), and your current balance.

### Chart

1. **Financial Chart**: This section includes a chart that visually represents your financial data over time. You can see how your income, expenses, and balance change as you add transactions.

2. **Chart Interaction**: You can interact with the chart by hovering over data points to see specific values.

### Resetting the Form

1. **Reset Form**: After adding a transaction, the input fields will be reset to their default values for your convenience.

  

---

# Incorporating Classes, Switch Statements, and Try-Catch-Finally in Finance Tracker

The Finance Tracker website is built using JavaScript and HTML, and it incorporates various programming concepts to efficiently manage and display financial transactions. In this walkthrough, we'll explore how classes, switch statements, and try-catch-finally statements are used in the website's code.

## Classes - Transaction Class

The Finance Tracker utilizes JavaScript classes to represent individual transactions. The `Transaction` class is defined to structure transaction objects, making it easier to manage transaction-related data.

```javascript
class Transaction {
    constructor(type, description, amount) {
        this.type = type;
        this.description = description;
        this.amount = amount;
        this.date = new Date(); 
    }
}
```

The `Transaction` class has properties like `type`, `description`, `amount`, and `date`, which are essential attributes of a transaction. By using a class, the code follows the principles of encapsulation, making it easier to create and manage transaction objects.

## Switch Statements - createTransaction Function

Switch statements are employed in the `createTransaction` function to categorize transactions based on their type and adjust the amounts accordingly. This function is responsible for creating transaction objects based on the selected transaction type.

```javascript
function createTransaction(type, description, amount) {
    switch (type) {
        case 'income':
            return new Transaction('Income', description, amount);
        case 'expense':
            return new Transaction('Expense', description, -amount); 
        case 'lend':
            return new Transaction('Lend', description, -amount); 
        case 'borrow':
            return new Transaction('Borrow', description, amount); 
        default:
            throw new Error('Invalid transaction type.');
    }
}
```

Switch statements efficiently categorize transactions into income, expenses, lends, or borrows based on the `type` parameter. This enhances code readability and maintainability by providing a clear and structured way to handle different transaction types.

## Try-Catch-Finally Statements - Error Handling

The Finance Tracker implements try-catch-finally statements to handle errors gracefully during the process of adding transactions. When users attempt to add a transaction with missing or invalid data, or in the event of any other error, try-catch-finally ensures that the application remains responsive and provides meaningful error messages to the user.

```javascript
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
```

In this code block, try-catch is used to catch errors that may occur during the transaction addition process. If an error is encountered, it displays an alert with an error message, ensuring that the user is informed of the issue. The `finally` block is used to reset the input form, ensuring that it's always cleared, whether or not an error occurred.

These programming concepts - classes, switch statements, and try-catch-finally statements - are fundamental to the Finance Tracker's functionality, providing structure, organization, and error-handling capabilities to enhance the user experience.

---

.


document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseTableBody = document.querySelector('#expense-table tbody');
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let editIndex = null;

    const renderExpenses = () => {
        expenseTableBody.innerHTML = '';
        expenses.forEach((expense, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${expense.description}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td class="actions">
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </td>
            `;

            expenseTableBody.appendChild(row);
        });
    };

    const addExpense = (description, amount, category) => {
        expenses.push({ description, amount: parseFloat(amount), category });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    };

    const editExpense = (index, description, amount, category) => {
        expenses[index] = { description, amount: parseFloat(amount), category };
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    };

    const deleteExpense = (index) => {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    };

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const description = document.getElementById('expense-description').value;
        const amount = document.getElementById('expense-amount').value;
        const category = document.getElementById('expense-category').value;

        if (editIndex !== null) {
            editExpense(editIndex, description, amount, category);
            editIndex = null;
        } else {
            addExpense(description, amount, category);
        }

        expenseForm.reset();
    });

    expenseTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            editIndex = e.target.dataset.index;
            const expense = expenses[editIndex];
            document.getElementById('expense-description').value = expense.description;
            document.getElementById('expense-amount').value = expense.amount;
            document.getElementById('expense-category').value = expense.category;
        } else if (e.target.classList.contains('delete-btn')) {
            deleteExpense(e.target.dataset.index);
        }
    });

    renderExpenses();
});

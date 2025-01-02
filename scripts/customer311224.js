document.addEventListener('DOMContentLoaded', async () => {
    const ledgerTable = document.getElementById('ledgerTable');
    const paginationContainer = document.getElementById('paginationContainer');
    const username = sessionStorage.getItem('username');
    const welcomeMessage = document.getElementById('welcome-message');
    const totalBalance = document.getElementById('total-balance');
    const lastOrder = document.getElementById('last-order');
    const lastPayment = document.getElementById('last-payment');
    const viewLedgerButton = document.getElementById('viewLedgerButton');
    const ledgerContainer = document.getElementById('ledgerContainer');
    const payButton = document.getElementById('payButton');

    // Check authentication
    if (!sessionStorage.getItem('isAuthenticated') || sessionStorage.getItem('userType') !== 'customer') {
        window.location.href = '../index.html';
        return;
    }

    welcomeMessage.textContent = `Hello, ${username}!`;

    // Load customer ledger
    const ledger = await window.getLedger();
    const userLedger = ledger.filter(row => row[0] === username);
    const userLedger1 = ledger.filter(row => row[0] === username);
    if (userLedger.length > 0) {
        // Display total outstanding balance
        const lastRow = userLedger[userLedger.length - 1];
        totalBalance.textContent = `Your Total Outstanding Balance is: ${lastRow[lastRow.length - 1]}`;

        // Find last order
        const today = new Date();
const todayTimestamp = today.getTime();

// Ensure consistent parsing of DD/MM/YYYY format
function parseDate(dateString) {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}T00:00:00`);
}

// Filter rows where the Type is 'Sale'
const filteredSales = userLedger.filter(row => row[2] === 'Sale');

// Log the filtered sales data to the console
console.log('Filtered Sales Data:', filteredSales);

// Find the row with the minimum difference between today's date and row[1] date
const closestRow = filteredSales
    .map(row => {
        const rowDate = parseDate(row[1]);
        const rowTimestamp = rowDate.getTime();
        const diff = Math.abs(todayTimestamp - rowTimestamp);
        return { row, date: rowDate, diff };
    })
    .sort((a, b) => a.diff - b.diff)[0];

// Log the closest row data to the console
console.log('Closest Row Data:', closestRow);

if (closestRow) {
    lastOrder.textContent = `Your Last Order was ${closestRow.row[3]} amounting ${closestRow.row[4]} on ${closestRow.row[1]}`;
} else {
    lastOrder.textContent = 'No orders found.';
}

// Find last Payment
const today1 = new Date();
const todayTimestamp1 = today1.getTime();

// Ensure consistent parsing of DD/MM/YYYY format
function parseDate(dateString) {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}T00:00:00`);
}

// Filter rows where the Type is 'Pymt'
const filteredPymt = userLedger1.filter(row => row[2] === 'Rcpt');

// Log the filtered sales data to the console
console.log('Filtered Payments Data:', filteredPymt);

// Find the row with the minimum difference between today's date and row[1] date
const closestRow1 = filteredPymt
    .map(row => {
        const rowDate1 = parseDate(row[1]);
        const rowTimestamp1 = rowDate1.getTime();
        const diff1 = Math.abs(todayTimestamp - rowTimestamp1);
        return { row, date: rowDate1, diff1 };
    })
    .sort((a, b) => a.diff1 - b.diff1)[0];

// Log the closest row data to the console
console.log('Closest Row Data:', closestRow1);

if (closestRow1) {
    lastPayment.textContent = `Your Last Order was ${closestRow1.row[3]} amounting ${closestRow1.row[4]} on ${closestRow1.row[1]}`;
} else {
    lastPayment.textContent = 'No orders found.';
}

    // Populate ledger table on button click
    viewLedgerButton.addEventListener('click', () => {
        ledgerContainer.style.display = 'block';
        ledgerTable.querySelector('tbody').innerHTML = ''; // Clear existing rows
        userLedger.forEach(row => {
            const tr = document.createElement('tr');
            row.slice(1).forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            ledgerTable.querySelector('tbody').appendChild(tr);
        });
        paginateTable(ledgerTable, paginationContainer, 10); // Apply pagination
    });

    // Redirect to payment page on pay button click
    payButton.addEventListener('click', () => {
        const paymentAmount = document.getElementById('paymentAmount').value;
        if (paymentAmount) {
            sessionStorage.setItem('paymentAmount', paymentAmount);
            window.location.href = 'payment.html';
        } else {
            alert('Please enter a payment amount.');
        }
    });

    // Logout functionality
    // window.logout = () => {
    //   sessionStorage.clear();
    //   window.location.href = '../index.html';
    // };
}});


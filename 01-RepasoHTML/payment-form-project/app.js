function setupPaymentForm() {
    const form = document.getElementById("paymentForm");
    if (!form) {
        return;
    }

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const cardTypeInput = document.getElementById("cardType");
    const cardNumberInput = document.getElementById("cardNumber");
    const expirationDateInput = document.getElementById("expirationDate");

    form.addEventListener("submit", function (event) { 
        event.preventDefault();
        const payment = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            cardType: cardTypeInput.value,
            cardNumber: cardNumberInput.value,
            expirationDate: expirationDateInput.value
        };
        savePayment(payment);
        alert("Pago registrado correctamente.");
        console.log(payment);
        form.reset();
        window.location.href = "index.html";
    });
}

const STORAGE_KEY = "payments";
function getPayments() {
    const storedPayments = localStorage.getItem(STORAGE_KEY);
    if (storedPayments === null) {
        return [];
    }
    return JSON.parse(storedPayments);
}

function savePayments(payments) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(payments)
    );
}

function savePayment(payment) {
    const payments = getPayments();
    payments.push(payment);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payments));
}

function displayPayments() {
    const paymentList = document.getElementById("paymentList");
    const payments = getPayments();
    paymentList.innerHTML = "";
    payments.forEach(function (payment, index) {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${payment.name}</td>
        <td>${payment.email}</td>
        <td>${payment.cardType}</td>
        <td>
            <button onclick="deletePayment(${index})">
                Eliminar
            </button>
        </td>
        `;
        paymentList.appendChild(row);
    });
}

function deletePayment(index) {
    const payments = getPayments();
    // Eliminar un elemento del array
    payments.splice(index, 1);

    savePayments(payments);

    displayPayments();
}


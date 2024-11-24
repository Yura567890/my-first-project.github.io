// script.js
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("registration-modal");
    const form = document.getElementById("registration-form");

    // Показати модальне вікно при завантаженні сторінки
    setTimeout(() => {
        modal.style.display = "flex";
    }, 500); // Затримка в 500 мс

    // Закрити модальне вікно після реєстрації
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        alert(`Дякуємо за реєстрацію, ${name}!`);
        modal.style.display = "none";
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#services table tbody");
    const cartTableBody = document.querySelector("#cart-table tbody");
    const checkoutButton = document.getElementById("checkout-button");



    
    const cart = {}; // Об'єкт для зберігання вибраних товарів

    // Додати кнопки в таблицю товарів
    Array.from(tableBody.rows).forEach(row => {
        const actionCell = document.createElement("td");

        // Кнопка "Купити"
        const buyButton = document.createElement("button");
        buyButton.textContent = "Купити";
        buyButton.style.marginRight = "10px";
        buyButton.addEventListener("click", () => {
            const productName = row.cells[0].textContent;
            if (cart[productName]) {
                cart[productName].quantity += 1;
            } else {
                cart[productName] = {
                    quantity: 1,
                };
            }
            updateCart();
        });

        // Кнопка "Оформити замовлення"
        const orderButton = document.createElement("button");
        orderButton.textContent = "Оформити замовлення";
        orderButton.addEventListener("click", () => {
            alert(`Оформлюємо замовлення на "${row.cells[0].textContent}".`);
        });

        actionCell.appendChild(buyButton);
        actionCell.appendChild(orderButton);
        row.appendChild(actionCell);
    });

    // Додати заголовок для нової колонки
    const headerRow = tableBody.closest("table").querySelector("thead tr");
    const actionHeader = document.createElement("th");
    actionHeader.textContent = "Дії";
    headerRow.appendChild(actionHeader);

    // Оновлення кошика
    function updateCart() {
        cartTableBody.innerHTML = ""; // Очищення попереднього вмісту

        Object.keys(cart).forEach(productName => {
            const row = document.createElement("tr");

            // Назва товару
            const nameCell = document.createElement("td");
            nameCell.textContent = productName;
            row.appendChild(nameCell);

            // Кількість
            const quantityCell = document.createElement("td");
            quantityCell.textContent = cart[productName].quantity;
            row.appendChild(quantityCell);

            // Дії
            const actionCell = document.createElement("td");

            // Кнопка "Видалити"
            const removeButton = document.createElement("button");
            removeButton.textContent = "Видалити";
            removeButton.addEventListener("click", () => {
                delete cart[productName];
                updateCart();
            });

            actionCell.appendChild(removeButton);
            row.appendChild(actionCell);

            cartTableBody.appendChild(row);
        });
    }

    // Обробка кнопки оформлення замовлення
    checkoutButton.addEventListener("click", () => {
        if (Object.keys(cart).length === 0) {
            alert("Ваш кошик порожній!");
        } else {
            const orderSummary = Object.entries(cart)
                .map(([product, details]) => `${product}: ${details.quantity} шт.`)
                .join("\n");
            alert(`Ваше замовлення:\n${orderSummary}`);
            // Очищення кошика після замовлення
            Object.keys(cart).forEach(product => delete cart[product]);
            updateCart();
        }
    });
});

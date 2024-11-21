let inventory = [];

// Add item to inventory with validation
function addItem() {
    const itemName = document.getElementById("itemName").value.trim();
    const quantity = parseInt(document.getElementById("quantity").value);
    const price = parseFloat(document.getElementById("price").value);
    const category = document.getElementById("category").value.trim();

    // Validation checks
    if (!itemName) {
        alert("Item Name cannot be empty!");
        return;
    }
    if (!quantity || quantity <= 0 || !Number.isInteger(quantity)) {
        alert("Quantity must be a positive integer!");
        return;
    }
    if (!price || price <= 0) {
        alert("Price must be a positive number!");
        return;
    }
    if (!category) {
        alert("Category cannot be empty!");
        return;
    }

    // Add the item to inventory
    inventory.push({ itemName, quantity, price, category });
    renderInventory();
    clearInputs();
}

// Render inventory table
function renderInventory(items = inventory) {
    const table = document.getElementById("inventoryTable");
    table.innerHTML = ""; // Clear previous table data

    items.forEach((item, index) => {
        const row = `<tr>
            <td>${item.itemName}</td>
            <td>${item.quantity}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>${item.category}</td>
            <td>
                <button onclick="deleteItem(${index})">Delete</button>
            </td>
        </tr>`;
        table.innerHTML += row;
    });

    calculateTotalValue();
}

// Delete item from inventory
function deleteItem(index) {
    inventory.splice(index, 1);
    renderInventory();
}

// Clear input fields
function clearInputs() {
    document.getElementById("itemName").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";
    document.getElementById("category").value = "";
}

// Calculate total inventory value
function calculateTotalValue() {
    const total = inventory.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("totalValue").innerText = `Total Value: $${total.toFixed(2)}`;
}

// Sort items by price
function sortItems() {
    const sortOrder = document.getElementById("sortPrice").value;
    inventory.sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));
    renderInventory();
}

// Filter items by name or category
function filterItems() {
    const query = document.getElementById("search").value.trim().toLowerCase();
    const filteredItems = inventory.filter(
        item =>
            item.itemName.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
    );
    renderInventory(filteredItems);
}

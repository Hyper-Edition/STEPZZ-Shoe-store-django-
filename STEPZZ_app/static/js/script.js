// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart count in the header
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
}

// Function to save the cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Function to add a product to the cart
function addToCart(productId, size = '8') {
    const product = document.querySelector(`[data-id="${productId}"]`);
    if (!product) {
        console.error("Product not found:", productId);
        return;
    }

    const productName = product.querySelector('h5').textContent;
    const priceText = product.querySelector('h4').textContent;
    const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
    const image = product.querySelector('img').src;

    // Check if product already exists
    const existingItem = cart.find(item => item.id === productId && item.size === size);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            size: size,
            quantity: 1,
            image: image
        });
    }

    saveCart();
    if (window.location.pathname.includes('/cart/')) renderCart();
}

// Function to remove an item from the cart
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    if (window.location.pathname.includes('/cart/')) renderCart();
}

// Function to update quantity
function updateQuantity(index, quantity) {
    if (quantity < 1) return;
    cart[index].quantity = quantity;
    saveCart();
    if (window.location.pathname.includes('/cart/')) updateTotals();
}

// Function to update size
function updateSize(index, size) {
    cart[index].size = size;
    saveCart();
}

// Function to render cart items
function renderCart() {
    const tbody = document.getElementById('cart-items');
    if (!tbody) return;

    tbody.innerHTML = '';
    cart.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td><i class="fa-solid fa-trash" onclick="removeItem(${index})"></i></td>
                <td><img src="${item.image}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>
                    <select onchange="updateSize(${index}, this.value)" value="${item.size}">
                        ${['6', '7', '8', '9', '10'].map(size => 
                            `<option ${item.size === size ? 'selected' : ''}>${size}</option>`
                        ).join('')}
                    </select>
                </td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" min="1" value="${item.quantity}" 
                           onchange="updateQuantity(${index}, parseInt(this.value))">
                </td>
                <td>₹${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
        `;
    });
    updateTotals();
}

// Function to update totals
function updateTotals() {
    if (!window.location.pathname.includes('/cart/')) return;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `₹${(subtotal + 99).toFixed(2)}`;
}

// Initialize cart
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('/cart/')) {
        renderCart();
    }
    updateCartCount();

    // Corrected selector for cart icons
    document.querySelectorAll('.fa-cart-shopping').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.closest('.pro').dataset.id;
            addToCart(productId);
        });
    });
});

// ---------- Rest of authentication code remains unchanged ----------
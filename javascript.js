let cart = [];
let totalPrice = 0;

// Add event listeners to the "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
});

// Function to add items to the cart
function addToCart(event) {
    const productBox = event.target.closest('.box');
    const productId = productBox.getAttribute('data-product-id');
    const productName = productBox.querySelector('h3').innerText;
    const productPrice = parseFloat(productBox.querySelector('.price').innerText.replace('$', ''));

    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    updateCart();
}

// Function to update the cart
function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = ''; // Clear previous items
    totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <h3>${item.name} ($${item.price})</h3>
            <div class="controls">
                <button onclick="changeQuantity('${item.id}', 1)">+</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity('${item.id}', -1)">-</button>
                <button onclick="removeFromCart('${item.id}')">Delete</button>
            </div>
        `;
        cartItemsDiv.appendChild(cartItemDiv);
    });

    document.getElementById('total-price').innerText = `Total: $${totalPrice.toFixed(2)}`;
    updateCartCount(); // Update cart count in the navbar
}

// Function to change the quantity of cart items
function changeQuantity(productId, change) {
    const product = cart.find(item => item.id === productId);
    product.quantity += change;

    if (product.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCart();
    }
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Function to update the cart count in the navbar
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.innerText = cart.reduce((total, item) => total + item.quantity, 0);
}

// Function to toggle like
function toggleLike(element) {
    element.classList.toggle('liked');
    const icon = element.querySelector('i');
    icon.classList.toggle('ri-heart-fill');
    icon.classList.toggle('ri-heart-line');
}

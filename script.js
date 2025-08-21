// Product data
const items = [
    { id: 1, name: "Tesla Model S Plaid", category: "sealed", price: 4, image: "images/tesla plaid.jpg" },
    { id: 2, name: "Dodge Viper SRT10 ACR", category: "sealed", price: 4, image: "images/dodge viper.png" },
    { id: 3, name: "'98 Subaru Impreza 22B-STi Version", category: "sealed", price: 4, image: "images/subaru.jpg" },
    { id: 4, name: "'95 Mazda RX-7", category: "sealed", price: 4, image: "images/mazda.jpg" }
  ];

// Cart array
let cart = [];

// DOM elements
const catalog = document.getElementById("catalog");
const cartPopup = document.getElementById("cart-popup");
const cartList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartToggle = document.getElementById("cart-toggle");
const cartClose = document.getElementById("cart-close");
const cartCount = document.getElementById("cart-count");
const cartCheckout = document.getElementById("cart-checkout");

// Display products
function displayItems(filteredItems) {
  catalog.innerHTML = "";
  filteredItems.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>$${item.price}</p>
      <button>Add to Cart</button>
    `;

    // Add to cart button
    const addBtn = div.querySelector("button");
    addBtn.addEventListener("click", () => {
      cart.push(item);
      renderCart();
      updateCartCount();
    });

    catalog.appendChild(div);
  });
}

// Filter products
function filterItems(category) {
  if (category === "all") {
    displayItems(items);
  } else {
    displayItems(items.filter(item => item.type === category));
  }
}

// Render cart popup
function renderCart() {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      cart.splice(index, 1);
      renderCart();
      updateCartCount();
    });

    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });

  cartTotal.textContent = `Total: $${total}`;
}

// Update cart count in header
function updateCartCount() {
  cartCount.textContent = cart.length;
}

// Cart popup toggle
cartToggle.addEventListener("click", () => {
  cartPopup.classList.toggle("hidden");
});

cartClose.addEventListener("click", () => {
  cartPopup.classList.add("hidden");
});

// WhatsApp checkout
cartCheckout.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let message = "Hi! I want to buy these items:\n";
  let total = 0;
  cart.forEach(item => {
    message += `- ${item.name} ($${item.price})\n`;
    total += item.price;
  });
  message += `Total: $${total}`;

  // Replace YOUR_NUMBER with your actual WhatsApp number (with country code)
  const phoneNumber = "YOUR_NUMBER";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
});

// Initialize
displayItems(items);

// Filter buttons
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    filterItems(btn.dataset.filter);
  });
});

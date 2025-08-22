// WhatsApp number (replace with your number)
const whatsappNumber = "96171226007";

// Sample products
const products = [
    { id: 1, name: "Tesla Model S Plaid", price: 4, sealed: true, image: "images/tesla plaid.jpg" },
    { id: 2, name: "Dodge Viper SRT10 ACR", price: 4, sealed: true, image: "images/dodge viper.png" },
    { id: 3, name: "'98 Subaru Impreza 22B-STi Version", price: 4, sealed: true,  image: "images/image.png" },
    { id: 4, name: "Alfa Romeo GTV6 3.0", price: 4, sealed: true,  image: "images/alfa romeo.jpg" },
    { id: 5, name: "2020 Koenigsegg Jesko", price: 4, sealed: true,  image: "images/2020 jesko.jpg" },
    { id: 6, name: "Ford Mustang Dark Horse", price: 15, sealed: true,  image: "images/ford mustang.jpg" },
    { id: 7, name: "Nissan Skyline 2000GT-R LBWK", price: 13, sealed: true,  image: "images/nissan skyline.png" },
    { id: 3, name: "Porsche 911 GT3 Cup [992]", price: 10, sealed: true,  image: "images/porsche 911.png" },
  ];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render products
function renderProducts(filter = "all") {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  let filteredProducts = products;
  if (filter === "sealed") filteredProducts = products.filter(p => p.sealed);
  if (filter === "unsealed") filteredProducts = products.filter(p => !p.sealed);

  filteredProducts.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

// Add to cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// Update cart count
function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

// Filter event
document.getElementById("filter").addEventListener("change", e => {
  renderProducts(e.target.value);
});

// Cart button
document.getElementById("cart-btn").addEventListener("click", () => {
  // Save cart to localStorage then go to cart.html
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "cart.html";
});

// Initial render
renderProducts();
updateCartCount();



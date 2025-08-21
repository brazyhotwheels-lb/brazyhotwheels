document.addEventListener("DOMContentLoaded", () => {
  const catalog = document.getElementById("catalog");
  const cartList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("cart-checkout");

  // Products array (add your images in the images/ folder)
  const items = [
    { id: 1, name: "Tesla Model S Plaid", category: "sealed", price: 4, image: "images/tesla plaid.jpg" },
    { id: 2, name: "Dodge Viper SRT10 ACR", category: "sealed", price: 4, image: "images/dodge viper.png" },
    { id: 3, name: "'98 Subaru Impreza 22B-STi Version", category: "sealed", price: 4, image: "images/subaru.jpg" },
    { id: 4, name: "'95 Mazda RX-7", category: "sealed", price: 4, image: "images/mazda.jpg" }
  ];

  let cart = [];

  // Display catalog items
  function displayItems(filter = "all") {
    catalog.innerHTML = "";
    const filtered = filter === "all" ? items : items.filter(i => i.category === filter);

    filtered.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("item");
      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>Price: $${item.price}</p>
        <button>Add to Cart</button>
      `;

      card.querySelector("button").addEventListener("click", () => {
        cart.push(item);
        renderCart();
      });

      catalog.appendChild(card);
    });
  }

  // Render cart
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
      });

      li.appendChild(removeBtn);
      cartList.appendChild(li);
    });

    cartTotal.textContent = `Total: $${total}`;
  }

  // WhatsApp checkout
  checkoutBtn.addEventListener("click", () => {
    if(cart.length === 0){
      alert("Your cart is empty!");
      return;
    }

    const phoneNumber = "96171226007"; 
    let message = "Hello! I’d like to buy:\n";
    let total = 0;

    cart.forEach(item => {
      message += `- ${item.name}: $${item.price}\n`;
      total += item.price;
    });

    message += `Total: $${total}`;
    message = encodeURIComponent(message);

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  });

  // Filter buttons
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      displayItems(filter);
    });
  });

  // Initial load
  displayItems();
  renderCart();
});

document.addEventListener("DOMContentLoaded", () => {

 const products = [
    { id: 1, name: "Tesla Model S Plaid", price: 4, sealed: true, image: "images/tesla plaid.jpg", description: "A super fast electric car with futuristic design." },
    { id: 2, name: "Dodge Viper SRT10 ACR", price: 4, sealed: true, image: "images/dodge viper.png", description: "Classic American muscle car with insane acceleration." },
    { id: 3, name: "'98 Subaru Impreza 22B-STi Version", price: 4, sealed: true, image: "images/subaru.jpg", description: "Iconic rally car with AWD and turbocharged power." },
    { id: 4, name: "Alfa Romeo GTV6 3.0", price: 4, sealed: true, image: "images/alfa romeo.jpg", description: "Italian classic sports coupe with sleek design." },
    { id: 5, name: "2020 Koenigsegg Jesko", price: 4, sealed: true, image: "images/2020 jesko.jpg", description: "Hypercar with extreme speed and performance." },
    { id: 6, name: "Ford Mustang Dark Horse", price: 15, sealed: true, image: "images/ford mustang.jpg", description: "Modern muscle car with bold styling." },
    { id: 7, name: "Nissan Skyline 2000GT-R LBWK", price: 13, sealed: true, image: "images/nissan skyline.png", description: "Japanese legend tuned by Liberty Walk." },
    { id: 8, name: "Porsche 911 GT3 Cup [992]", price: 10, sealed: true, image: "images/porsche 911.png", description: "Race-ready Porsche with track performance." },
    { id: 9, name: "DMC Delorean", price: 2, sealed: false, image: "images/dmc.jpeg", description: "American muscle with aggressive styling." },
    { id: 10, name: "Toyota GR80 Cup", price: 2, sealed: false, image: "images/toyota gr80.jpeg", description: "Exotic supercar with V12 power." },
    { id: 11, name: "2020 Jaguar F-Type", price: 2, sealed: false, image: "images/jaguar.jpg", description: "American muscle with aggressive styling." },
    { id: 12, name: "'73 Honda Civic Custom", price: 2, sealed: false, image: "images/civic.jpg", description: "Exotic supercar with V12 power." },
    /*{ id: 13, name: "DMC Delorean", price: 2, sealed: false, image: "images/dmc.jpeg", description: "American muscle with aggressive styling." },
    { id: 14, name: "Toyota GR80 Cup", price: 2, sealed: false, image: "images/toyota gr80.jpeg", description: "Exotic supercar with V12 power." },
    { id: 15, name: "DMC Delorean", price: 2, sealed: false, image: "images/dmc.jpeg", description: "American muscle with aggressive styling." },
    { id: 16, name: "Toyota GR80 Cup", price: 2, sealed: false, image: "images/toyota gr80.jpeg", description: "Exotic supercar with V12 power." },
  */
  ]; 

  const catalog = document.getElementById("catalog");

  function displayProducts(list) {
    catalog.innerHTML = "";
    list.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      `;

      card.addEventListener("click", (e) => {
        if(e.target.classList.contains("add-to-cart")) return;
        window.location.href = `product.html?id=${product.id}`;
      });

      card.querySelector(".add-to-cart").addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
      });

      catalog.appendChild(card);
    });
  }

  displayProducts(products);

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      if(filter === "all") displayProducts(products);
      else if(filter === "sealed") displayProducts(products.filter(p => p.sealed));
      else displayProducts(products.filter(p => !p.sealed));
    });
  });

});



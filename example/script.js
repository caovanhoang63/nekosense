let cart = [];
let totalPrice = 0;

function addToCart(product, price) {
  cart.push({ product, price });
  totalPrice += price;
  updateCart();
}

function removeFromCart(index) {
  totalPrice -= cart[index].price;
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("cart-item");
    listItem.innerHTML = `${item.product} - $${item.price} <span class="remove-item" onclick="removeFromCart(${index})">X</span>`;
    cartItems.appendChild(listItem);
  });

  const total = document.getElementById("totalPrice");
  total.textContent = totalPrice;
}

document.getElementById("cartButton").addEventListener("click", () => {
  document.getElementById("cartPopup").style.display = "flex";
});

document.getElementById("closeCart").addEventListener("click", () => {
  document.getElementById("cartPopup").style.display = "none";
});

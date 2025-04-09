const products = [
  {
    id: "product-1",
    name: "Product 1",
    price: 20,
    image: "https://placehold.co/600x400?text=nekosense",
    description:
      "This is a detailed description for Product 1. It features high-quality materials and a sleek design that will complement any style.",
  },
  {
    id: "product-2",
    name: "Product 2",
    price: 30,
    image: "https://placehold.co/600x400?text=nekosense",
    description:
      "Product 2 is our bestseller. It comes with premium features and is built to last. Perfect for everyday use.",
  },
  {
    id: "product-3",
    name: "Product 3",
    price: 40,
    image: "https://placehold.co/600x400?text=nekosense",
    description:
      "Product 3 is the latest addition to our collection. It combines innovative technology with elegant design for an exceptional experience.",
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartButton = document.getElementById("cartButton");
const closeCartButton = document.getElementById("closeCart");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const cartFooter = document.getElementById("cartFooter");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const continueShopping = document.getElementById("continueShopping");

document.addEventListener("DOMContentLoaded", function () {
  updateCartUI();

  if (document.getElementById("productsContainer")) {
    renderProducts();
  } else if (document.getElementById("productDetail")) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    if (productId) {
      renderProductDetail(productId);
    } else {
      window.location.href = "index.html";
    }
  }
});

function renderProducts() {
  const productsContainer = document.getElementById("productsContainer");

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className =
      "product-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg";
    productCard.innerHTML = `
      <a id="product-${product.id}" href="product.html?id=${product.id}" class="block">
        <div class="overflow-hidden">
          <img src="${product.image}" alt="${product.name}" class="product-image w-full h-48 object-cover">
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold">${product.name}</h3>
          <p class="text-orange-500 font-medium">$${product.price.toFixed(2)}</p>
        </div>
      </a>
      <div class="px-4 pb-4">
        <button class="add-to-cart-btn w-full bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded" 
                data-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
    productsContainer.appendChild(productCard);
  });

  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const productId = this.getAttribute("data-id");
      addToCart(productId);
    });
  });
}

function renderProductDetail(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) {
    window.location.href = "index.html";
    return;
  }

  document.title = `${product.name} - Nekosense`;

  const productDetail = document.getElementById("productDetail");
  productDetail.innerHTML = `
    <div class="bg-white p-6 rounded-lg shadow-md">
      <img src="${product.image}" alt="${product.name}" class="w-full h-auto object-contain">
    </div>
    
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold mb-2">${product.name}</h1>
      <p class="text-2xl font-semibold text-orange-500 mb-4">$${product.price.toFixed(2)}</p>
      <div class="border-t border-b py-4 my-4">
        <p class="text-gray-700">${product.description}</p>
      </div>
      
      <button id="addToCartDetail" class="w-full mt-4 bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
          <circle cx="8" cy="21" r="1"/>
          <circle cx="19" cy="21" r="1"/>
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
        </svg>
        Add to Cart
      </button>
    </div>
  `;

  document
    .getElementById("addToCartDetail")
    .addEventListener("click", function () {
      addToCart(productId);
    });
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartUI();
  openCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

function updateQuantity(productId, quantity) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
  }
}

function updateCartUI() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;

  if (totalItems > 0) {
    cartCount.classList.remove("hidden");
  } else {
    cartCount.classList.add("hidden");
  }

  if (cart.length === 0) {
    emptyCart.classList.remove("hidden");
    cartItems.classList.add("hidden");
    cartFooter.classList.add("hidden");
  } else {
    emptyCart.classList.add("hidden");
    cartItems.classList.remove("hidden");
    cartFooter.classList.remove("hidden");

    cartItems.innerHTML = "";

    cart.forEach((item) => {
      const li = document.createElement("li");
      li.className =
        "flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50";
      li.innerHTML = `
        <div class="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
        </div>
        
        <div class="flex-1 min-w-0">
          <h4 class="font-medium truncate">${item.name}</h4>
          <p class="text-orange-500">$${item.price.toFixed(2)}</p>
        </div>
        
        <div class="flex items-center gap-2">
          <button class="quantity-btn decrease-btn" data-id="${item.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"/>
            </svg>
          </button>
          
          <span class="w-6 text-center">${item.quantity}</span>
          
          <button class="quantity-btn increase-btn" data-id="${item.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 5v14"/>
              <path d="M5 12h14"/>
            </svg>
          </button>
        </div>
        
        <button class="remove-btn p-2 text-gray-500 hover:text-red-500" data-id="${item.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
          </svg>
        </button>
      `;
      cartItems.appendChild(li);
    });

    document.querySelectorAll(".decrease-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        const item = cart.find((item) => item.id === id);
        if (item) {
          updateQuantity(id, item.quantity - 1);
        }
      });
    });

    document.querySelectorAll(".increase-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        const item = cart.find((item) => item.id === id);
        if (item) {
          updateQuantity(id, item.quantity + 1);
        }
      });
    });

    document.querySelectorAll(".remove-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        removeFromCart(id);
      });
    });

    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
  }
}

function openCart() {
  cartOverlay.classList.remove("hidden");
  cartOverlay.classList.add("active");
}

function closeCart() {
  cartOverlay.classList.remove("active");
  setTimeout(() => {
    cartOverlay.classList.add("hidden");
  }, 300);
}

cartButton.addEventListener("click", openCart);
closeCartButton.addEventListener("click", closeCart);

if (continueShopping) {
  continueShopping.addEventListener("click", closeCart);
}

cartOverlay.addEventListener("click", function (e) {
  if (e.target === cartOverlay) {
    closeCart();
  }
});

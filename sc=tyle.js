let cart = JSON.parse(localStorage.getItem('cart')) || {};

    document.addEventListener("DOMContentLoaded", () => {
      updateCartUI();
      setupEventListeners();
    });

    function setupEventListeners() {
      const buttons = document.querySelectorAll('.add-to-cart');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const productEl = btn.closest('.product');
          const id = productEl.dataset.id;
          const name = productEl.dataset.name;
          const price = parseFloat(productEl.dataset.price);
          let stock = parseInt(productEl.dataset.stock);

          if (stock <= 0) return alert("Out of stock!");

          if (cart[id]) {
            cart[id].qty += 1;
          } else {
            cart[id] = { name, price, qty: 1 };
          }

          // Decrease stock
          productEl.dataset.stock = --stock;
          productEl.querySelector('.stock').textContent = `${stock} items remaining`;

          saveCart();
          updateCartUI();
          showPopup(`${name} added to cart`, 'success');
        });
      });

      document.getElementById('cart-button').addEventListener('click', () => {
        document.getElementById('cart-sidebar').classList.add('open');
      });
    }

    function updateCartUI() {
      const cartItems = document.getElementById('cart-items');
      const cartCountEl = document.getElementById('cart-count');
      const cartTotal = document.getElementById('cart-total');

      cartItems.innerHTML = '';
      let total = 0;
      let count = 0;

      if (Object.keys(cart).length === 0) {
        cartItems.innerHTML = `
          <div class="empty-cart">
            <p>Your cart is empty ☕</p>
          </div>
        `;
      }

      Object.keys(cart).forEach(id => {
        const item = cart[id];
        total += item.price * item.qty;
        count += item.qty;

        const div = document.createElement('div');
        div.innerHTML = `
          <strong>${item.name}</strong> - $${item.price} x ${item.qty}
          <button onclick="changeQty('${id}', 1)">+</button>
          <button onclick="changeQty('${id}', -1)">-</button>
          <button onclick="removeItem('${id}')">Remove</button>
        `;
        cartItems.appendChild(div);
      });

      cartCountEl.textContent = count;
      cartTotal.textContent = total.toFixed(2);
    }

    function changeQty(id, delta) {
      if (!cart[id]) return;
      cart[id].qty += delta;

      if (cart[id].qty <= 0) {
        removeItem(id);
        return;
      }

      saveCart();
      updateCartUI();
      showPopup(`Updated quantity for ${cart[id].name}`, 'success');
    }

    function removeItem(id) {
      const name = cart[id]?.name || 'Item';
      delete cart[id];
      saveCart();
      updateCartUI();
      showPopup(`${name} removed from cart`, 'error');
    }

    function closeCart() {
      document.getElementById('cart-sidebar').classList.remove('open');
    }

    function saveCart() {
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    function showPopup(message, type = 'success') {
      const popup = document.getElementById('popup-notification');
      const text = document.getElementById('popup-text');
      const icon = document.getElementById('popup-icon');

      text.textContent = message;
      popup.className = `popup show ${type}`;
      icon.textContent = type === 'success' ? '✅' : '❌';

      const progress = document.getElementById('popup-progress');
      progress.style.animation = 'none';
      void progress.offsetWidth;
      progress.style.animation = null;

      setTimeout(() => {
        popup.classList.remove('show');
      }, 2000);
    }
const Products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
    { id: 4, name: 'Product-4', price: 400 },
  ];
  
  const cart = [];
  
  document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', () => {
      const productItem = button.closest('.product-item');
      const productId = parseInt(productItem.dataset.id);
      const product = Products.find(p => p.id === productId);
      addToCart(product);
    });
  });
  
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', () => {
      const productItem = button.closest('.product-item');
      const productId = parseInt(productItem.dataset.id);
      const product = Products.find(p => p.id === productId);
      removeFromCart(product);
    });
  });
  
  function addToCart(product) {
    const cartItem = cart.find(item => item.id === product.id);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCart();
  }
  
  function removeFromCart(product) {
    const cartItem = cart.find(item => item.id === product.id);
    if (cartItem) {
      cartItem.quantity -= 1;
      if (cartItem.quantity === 0) {
        const index = cart.indexOf(cartItem);
        cart.splice(index, 1);
      }
    }
    updateCart();
  }
  
  function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
  
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>No Product added to the cart</p>';
    } else {
      cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
          <span>${item.name}</span>
          <span>Quantity: ${item.quantity}</span>
          <span>Price: Rs.${item.price * item.quantity}</span>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
      });
    }
  
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('total-price').innerText = totalPrice;
  
    Products.forEach(product => {
      const productItem = document.querySelector(`.product-item[data-id="${product.id}"]`);
      const cartItem = cart.find(item => item.id === product.id);
      const quantity = cartItem ? cartItem.quantity : 0;
      productItem.querySelector('.quantity').innerText = quantity;
    });
  }
  
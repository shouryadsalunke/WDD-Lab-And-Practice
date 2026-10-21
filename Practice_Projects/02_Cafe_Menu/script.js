const cart = {};
const orderList = document.getElementById('orderList');
const totalElement = document.getElementById('total');
const itemCount = document.getElementById('itemCount');
const orderMessage = document.getElementById('orderMessage');
function updateOrder() {
  const names = Object.keys(cart);
  const count = names.reduce((sum, name) => sum + cart[name].quantity, 0);
  const total = names.reduce((sum, name) => sum + cart[name].price * cart[name].quantity, 0);
  itemCount.textContent = `${count} ITEM${count === 1 ? '' : 'S'}`;
  totalElement.textContent = `₹${total}`;
  if (names.length === 0) {
    orderList.innerHTML = '<p class="empty">Your order is taking a little nap.<br>Add something from the menu.</p>';
    return;
  }
  orderList.innerHTML = names.map(name => `<div class="order-line"><span>${cart[name].quantity} × ${name}</span><span>₹${cart[name].price * cart[name].quantity} <button data-remove="${name}" aria-label="Remove ${name}">×</button></span></div>`).join('');
}
document.querySelectorAll('.add-button').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.menu-item');
    const name = item.dataset.name;
    if (!cart[name]) cart[name] = { price: Number(item.dataset.price), quantity: 0 };
    cart[name].quantity += 1;
    orderMessage.textContent = '';
    updateOrder();
  });
});
orderList.addEventListener('click', event => {
  const name = event.target.dataset.remove;
  if (!name) return;
  cart[name].quantity -= 1;
  if (cart[name].quantity <= 0) delete cart[name];
  updateOrder();
});
document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(filter => filter.classList.remove('active'));
    button.classList.add('active');
    document.querySelectorAll('.menu-item').forEach(item => {
      item.hidden = button.dataset.category !== 'all' && item.dataset.category !== button.dataset.category;
    });
  });
});
document.getElementById('placeOrder').addEventListener('click', () => {
  const count = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  orderMessage.textContent = count ? 'Demo order received! No payment or real order was submitted.' : 'Add at least one item before placing your order.';
});

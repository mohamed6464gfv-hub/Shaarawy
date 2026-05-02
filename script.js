let cart = [];

function scrollToMenu(){
  document.getElementById("menu").scrollIntoView({behavior:"smooth"});
}

function addToCart(name, price){
  let item = cart.find(p => p.name === name);

  if(item){
    item.qty++;
  } else {
    cart.push({name, price, qty:1});
  }

  updateCart();
}

function updateCart(){
  let list = document.getElementById("cartItems");
  let total = 0;
  list.innerHTML = "";

  cart.forEach((item,index)=>{
    let li = document.createElement("li");

    li.innerHTML = `
    ${item.name} (${item.qty}) - ${item.price * item.qty} جنيه
    <br>
    <button onclick="changeQty(${index},1)">+</button>
    <button onclick="changeQty(${index},-1)">-</button>
    `;

    list.appendChild(li);
    total += item.price * item.qty;
  });

  document.getElementById("total").textContent = "الإجمالي: " + total + " جنيه";
}

function changeQty(i,change){
  cart[i].qty += change;
  if(cart[i].qty <= 0) cart.splice(i,1);
  updateCart();
}

function sendOrder(){
  let address = document.getElementById("address").value;

  if(cart.length === 0){
    alert("السلة فاضية 😅");
    return;
  }

  if(address === ""){
    alert("اكتب العنوان");
    return;
  }

  let msg = "طلب:%0A";

  cart.forEach((item,i)=>{
    msg += `${i+1}- ${item.name} x${item.qty}%0A`;
  });

  msg += `%0Aالعنوان: ${address}`;

  let number = "201116030865";
  window.open(`https://wa.me/${number}?text=${msg}`,"_blank");
}
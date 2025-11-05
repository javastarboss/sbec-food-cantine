import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { updateDeliveryOption } from '../cart/cart.js';
import {deliveryOptions} from '../cart/delivery-option.js'
import { food} from "../food.unit/food.js";
import { paymentsummary } from "../payments/payment.js";
import { getfood } from "../food.unit/food.js";
import { setDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
function hideLoading(){
 setTimeout(()=>{
const loader = document.getElementById("loading-screen")
  if(loader) {loader.style.display = "none";
    loader.classList.add('hidden');
    setTimeout(()=> loader.remove(), 300)
  }
 }, 1300) 

}
const firebaseConfig = {
  apiKey: "AIzaSyAgcibxEec8dwJb4TZuQrmeoUM3pjylrBk",
  authDomain: "food-canteen-app-77e31.firebaseapp.com",
  projectId: "food-canteen-app-77e31"
};//
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"
 let today = dayjs()

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// 🔥 MAIN FLOW 🔥
onAuthStateChanged(auth, async (user) => {
  if (user) {
    hideLoading()
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    dayjs()
Loading()
    if (docSnap.exists()) {
      const cart = docSnap.data().cart || [];;
dayjs()
      displayFullCart(cart);
    }
    
  } else {
    window.location.href = "login.html";
  }
});
function Loading(){
 setTimeout(()=>{
const loader = document.getElementById("loading-screen")
  if(loader) {loader.style.display = "none";
    loader.classList.add('hidden');
    setTimeout(()=> loader.remove(), 300)
  }
 }, 1300) 

}


  
async function displayFullCart(cart) {
  const container = document.querySelector('.order-summary');
  let contain = "";

  // 🔥 Get user info ONCE before rendering
const him = document.getElementById('text')
  const scales = matchMedia('(max-width: 530px)');
  if(scales.matches){
    him.style.display='none'
  }

  const user = auth.currentUser;
  let userName = "Anonymous"; 
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      userName = data.name || "Anonymous";
    }
  }let common ="Common Tier"
  let text = "Bronze Tier";
  let another = "Silver Tier";
  let set ="Platinum Tier";
  let make ="Gold Tier";
  let leg = "Diamond Tier";
let zero = 0;
cart.forEach((displaytop) => {
zero += displaytop.quantity  ;
document.getElementById('zero').textContent = zero

if (zero === 0  ){
document.getElementById('text').textContent = common
} else if(zero <= 2){
  document.getElementById('text').textContent = text
}
else if (zero <= 6){
document.getElementById('text').textContent = another
}
else if (zero <= 10){
document.getElementById('text').textContent = set
}
else if (zero <= 14){
document.getElementById('text').textContent = make
}
else if (zero >= 15){
document.getElementById('text').textContent = leg
}
}

)



const containerEl = document.querySelector('.order-summary');

containerEl.addEventListener('change', async (e) => {
  // only care about radio changes
  const input = e.target;
  if (!input || input.tagName !== 'INPUT' || input.type !== 'radio') return;

  // find the wrapper element that holds the data-save attribute
  const optionWrapper = input.closest('.js-delivery-options');
  if (!optionWrapper) return;

  const save = optionWrapper.dataset.save; 
  const deliveryOptionId = input.value; 

  try {
  
    await updateDeliveryOption(save, deliveryOptionId);

   
    const cartItemContainer = input.closest('.cart-item-containers');
    if (cartItemContainer) {
      const option = deliveryOptions.find(o => o.id === deliveryOptionId);
      if (option) {
        const newDateString = dayjs().add(option.deliveryDays, 'days').format('dddd D MMMM YYYY');
        const dateEl = cartItemContainer.querySelector('.delivery-date');
        if (dateEl) dateEl.textContent = `Ordered for: ${newDateString}`;
      }
    }

   
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid);
      const snap = await getDoc(userRef);
      const newCart = snap.exists() ? (snap.data().cart || []) : [];
      displayFullCart(newCart);
    }
  } catch (err) {
    console.error("Error updating delivery option:", err);
    alert("Failed to save delivery date. Try again.");
  }
});




  cart.forEach((inner) => {
    
const foodid = inner.save;
const matchingfood= getfood(foodid)



const deliveryOptionId = inner.deliveryOptionId;
let deliveryOption='';
deliveryOptions.forEach((option) => {
if(option.id === deliveryOptionId){
  deliveryOption = option;
}
}); 
 const today = dayjs();
  const deliveryDate = today.add (
    deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd D MMMM YYYY')





    if (!matchingfood) return;


    contain += `
      <div class="cart-item-containers js-cart-item-container-${matchingfood.save}" style="background-image: url(media/no4.jpg); background-repeat: no-repeat;background-size: 100%">
        <div class="delivery-date">Ordered for: ${dateString}</div>
        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingfood.Image}">
          <div class="cart-item-details">
            <div class="product-name">${matchingfood.name}</div>
            <div class="product-price">D${matchingfood.price}</div>
            <div class="product-quantity">
              <span>Quantity: <span class="quantity-label">${inner.quantity}</span></span>
              
              <button class="delete-quantity-link btn" style='background-color: rgb(9, 253, 9);  border-bottom: solid white 3px;' data-food="${matchingfood.name}">Delete</button>
            </div>
          </div>
         <!-- <div class="reaction-options">
            How do u feel bout ur pick
            <div class="reaction-options-pick">
              <label class="l3"><input type="radio" name="feel-${matchingfood.name}">😍 love it</label>
              <label class="l2"><input type="radio" name="feel-${matchingfood.name}">🙂 ok with it</label>
              <label class="l1"><input type="radio" name="feel-${matchingfood.name}">😟 dislike it</label>
            </div>
          </div>-->
          <!--new-->
           <div class="reaction-options">
          <div class="top"> Select Ur Order Date</div>
           
              
              ${deliveryOptionsHtml(matchingfood, inner)} 
         
          </div>
         
        <!---->
      </div>
        <div class="usernameDiv">🧑‍🍳 Ordered by: <strong class='ano'>${userName}</strong></div>
      </div>`;
  });
 function deliveryOptionsHtml (matchingfood, inner) {
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add (
    deliveryOption.deliveryDays, 'days')
    const dateString = deliveryDate.format('dddd D MMM YY');
    const ischecked = deliveryOption.id === inner.deliveryOptionId;

    html += `
      <div class="reaction-options-pick js-delivery-options" data-save="${matchingfood.name}" data-delivery-option-id="${deliveryOption.id}">
        <label class="l3">
          <input
            type="radio"
            name="feel-${matchingfood.name}"
            value="${deliveryOption.id}"
            ${ischecked ? 'checked' : ''} />
          Order Date: ${dateString}
        </label>
     </div>
      
    `;
  });
  return html;
}

  container.innerHTML = contain;
paymentsummary(cart)
  attachDeleteButtons(); // 🧼 cleaner 
  // separation
   attachUpdateButtons()
   reverse ()





   container.addEventListener('change', (event) => {
  const target = event.target;
  if (target.matches('input[type="radio"][name^="delivery-"]')) {
    // Get the food name from closest js-delivery-options div
    const deliveryDiv = target.closest('.js-delivery-options');
    if (!deliveryDiv) return;

    const save = deliveryDiv.dataset.save; // from data-food attribute
    const deliveryOptionId = target.value;

    if (!save || !deliveryOptionId) return;

    // Call your update function to save in Firebase
    updateDeliveryOption(save, deliveryOptionId).then(() => {
      // Optionally update the UI delivery date immediately without reload
      updateDeliveryDateUI(save, deliveryOptionId);
    });
  }
});
}function attachDeleteButtons() {
  document.querySelectorAll('.delete-quantity-link').forEach((link) => {
    link.addEventListener('click', async () => {
      const foodNameToDelete = link.dataset.food;
      console.log('🟢 Delete button clicked for:', foodNameToDelete);

      try {
        const user = auth.currentUser;
        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          const currentCart = data.cart || [];
          const userName = data.name;
          const currentMoney = data.money || 0;
          const now = Date.now();

          const itemToDelete = currentCart.find(item => item.save === foodNameToDelete);
          if (!itemToDelete) return;

          const matchingFoodItem = food.find(f => f.name === foodNameToDelete);
          if (!matchingFoodItem) {
            alert("⚠️ Food item not found in food list.");
            return;
          }

          const refundAmount = matchingFoodItem.price * itemToDelete.quantity;
          const updatedCart = currentCart.filter(item => item.save !== foodNameToDelete);

          await setDoc(userRef, {
            cart: updatedCart,
            money: currentMoney + refundAmount,
            lastDeleteTime: now
          }, { merge: true });

          displayFullCart(updatedCart); // ✅ refresh with name again
        }
      } catch (error) {
        console.error("❌ Error during delete:", error);
        alert("❌ Error: " + error.message);
      }
    });
  });
}









function attachUpdateButtons() {
  document.querySelectorAll('.update-quantity-link').forEach((btn) => {
    btn.addEventListener('click', () => {
      console.log("Update clicked for:", btn.dataset.footy);
      
      const cartItem = btn.closest('.cart-item-containers');
      if (!cartItem) return;

      cartItem.classList.add('is-editing-quantity');
    });
  });
}function reverse (){
  document.querySelectorAll('.save-quantity-link ').forEach((reform)=>{
    reform.addEventListener('click', ()=>{
const revert = reform.closest('.cart-item-containers')
revert.classList.add('link-primary')
    } )
  })
}



function updateDeliveryDateUI(save, deliveryOptionId) {
  const container = document.querySelector(`.js-cart-item-container-${save}`);
  if (!container) return;

  const option = deliveryOptions.find(o => o.id === deliveryOptionId);
  if (!option) return;

  const today = dayjs();
  const deliveryDate = today.add(option.deliveryDays, 'days');
  const dateString = deliveryDate.format('ddd /D /MMM /YYYY');

  const dateElem = container.querySelector('.delivery-date');
  if (dateElem) {
    dateElem.textContent = `Confirmed date: ${dateString}`;
  }
}
/*.add (
    deliveryOption.deliveryDays, 'days'
  );*/
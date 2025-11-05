import { cart } from "./cart.js";
import { getfood } from "../food.unit/food.js";
import { deliveryOptions } from "./delivery-option.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { setDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAgcibxEec8dwJb4TZuQrmeoUM3pjylrBk",
  authDomain: "food-canteen-app-77e31.firebaseapp.com",
  projectId: "food-canteen-app-77e31"
};//

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const stores = getFirestore(app);
function Loading(){
 setTimeout(()=>{
const loader = document.getElementById("loading-screen")
  if(loader) {loader.style.display = "none";
    loader.classList.add('hidden');
    setTimeout(()=> loader.remove(), 300)
  }
 }, 1300) 

}
onAuthStateChanged(auth, async(user)=>{


  if(user){
    Loading()
    const store = doc(stores, 'users', user.uid);
    const togetstore = await getDoc(store)
    if(togetstore.exists()){
      const cart = togetstore.data().cart ;
      display(cart)
      dayjs()
     
  
    }
  }else {
    window.location.href = "login.html";
  }
})

async function display  (cart) {
  const user = auth.currentUser;
    let userName = "Anonymous"; // fallback
    if (user) {
      const userRef = doc(stores, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        userName = data.name || "Anonymous";
      }}
  let e = 'no order yet'
  
  const all = document.querySelector('.js-orders');
  if (!all) return;
  let sets = "";

  // compute totals once if you need them per-order OR compute per-item below
  cart.forEach(inner => {
    const matchingfood = getfood(inner.save);
    if (!matchingfood) return;

    const deliveryOption = deliveryOptions.find(o => o.id === inner.deliveryOptionId) || { deliveryDays: 0 };
    const dateString = dayjs().add(deliveryOption.deliveryDays, 'days').format('dddd D MMMM YYYY');
    const totalPrice = Number(matchingfood.price || 0) * Number(inner.quantity || 0);
const ischecked = deliveryOption.id === inner.deliveryOptionId;

    sets += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date"><img class='img' src = 'images1/iconss/sbeclogo.png'><br>
              <div class="order-header-label label">Order Placed: ${dateString}</div>
        
            </div>
            
          </div>

         
        </div>



          <div class="product-details">
      <div class="order-header-right-section">
            <div class="order-header-label">Name: ${userName}</div>
          </div>
            <div class="product-name">Order: ${matchingfood.name}</div>
            <div class="product-delivery-date foodi">Price: D${matchingfood.price}</div>
            <div class="product-quantity "> Ordered: ${inner.quantity}</div>
            <div class="order-total">
              <div class="order-header-label">Total: D${totalPrice.toFixed(2)}</div>

            </div>
          </div>
        </div>
      </div>
    `;
  });

  all.innerHTML = sets;
}
display(cart);

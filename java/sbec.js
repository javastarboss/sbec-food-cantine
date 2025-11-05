/*import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js"; 
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  onSnapshot,
  increment,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAgcibxEec8dwJb4TZuQrmeoUM3pjylrBk",
  authDomain: "food-canteen-app-77e31.firebaseapp.com",
  projectId: "food-canteen-app-77e31"
};
function hideLoading(){
 setTimeout(()=>{
const loader = document.getElementById("loading-screen")
  if(loader) {loader.style.display = "none";
    loader.classList.add('hidden');
    setTimeout(()=> loader.remove(), 300)
  }
 }, 1300) 

}


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// Audio
function play() {
  const sound = new Audio('images1/iconss/sound.mp3');
  sound.play();
}
function memes() {
  const meme = new Audio('images1/iconss/bruhh.mp3');
  meme.play();
}

import { cart } from '../cart/cart.js';
import { food } from "../food.unit/food.js";
import { addtocart} from '../cart/cart.js';

let dalasis = 'D';
let cash = 0;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    cash = 0;
    updatecartquantity();
    updateCashDisplay();

    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    
hideLoading()

    /*if (docSnap.exists()) {
      cash = docSnap.data().money || 0;
      updateCashDisplay();
    } 
   if (docSnap.exists()) {
  const data = docSnap.data();
  cash = data.money || 0;
 
  updateCashDisplay();
cart.length = 0; // clear the current cart
if (docSnap.data().cart) {
  docSnap.data().cart.forEach(item => cart.push(item));
}

  // Load cart from Firestore
  if (data.cart) {
cart.length=0 // clear old cart
    data.cart.forEach(item => cart.push(item));
    updatecartquantity(); // show correct number
  }
}

   
      else {
      await setDoc(userRef, { money: 0 });
      cash = 0;
      updateCashDisplay();
    }

  } else {
window.location.href='sbec.html'
  }
});

// Display food
let foods = '';
food.forEach((eat) => {
  foods += `
  <div class="product-containers" >
    <div class="product-image-containers" >
      <img class="product-images" src="${eat.Image} " >
    </div>
    <div class="product-names limit-text-to-2-line">${eat.name}</div>
    <div class="product-rating">
      <img class="product-stars" src="images1/ratings/rating-${eat.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">${eat.rating.count}</div>
    </div>
    <div class="prices data-price"><span class="dalasis">D</span>${eat.price}</div>
    <div class="like-container">
   <img class='like' src="images1/thumb-up.png">
      <div class="like-count" data-food="${eat.name}">0</div>

     <img class='dislike' src="images1/thumb-down.png">
      <div class="dislike-count" data-food="${eat.name}">0</div>
 </div>

    <div class="product-quantity-containers">
      <select class='quantity-selector'>
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </div>
    <div class="product-spacer"></div>
    <div class="added-to-cart"><img src="images1/iconss/checkmark.png"> Added</div>
    <button class="add-to-cart-buttons button-primarys js-add" data-foody="${eat.name}" data-price="${eat.price}">Add to Cart</button>
  </div>`;
});
document.querySelector('.js-food').innerHTML = foods;

// Update quantity
function updatecartquantity() {
  let cartQuantity = 0;
  cart.forEach(item => {
    cartQuantity += item.quantity;
  });
  document.querySelector('.js-quantity').textContent = cartQuantity;
}

// Update cash with emoji
function updateCashDisplay() {
  let emoji = cash >= 5000 ? `<dotlottie-wc class='file'
  src="https://lottie.host/91075a26-47f9-4f2f-80a7-3a2c3e2e6937/KgYiKOfBJC.lottie"
style="width: 70px;height: 70px"
  speed="1"
  autoplay
  loop
></dotlottie-wc>` : cash >= 3000 ? `<dotlottie-wc class='file'
  src="https://lottie.host/222c0159-fada-4044-8439-3abf832dbb1a/Pf5StsFVVQ.lottie"
  style="width: 70px;height: 70px"
  speed="1.2"
  autoplay
  loop
></dotlottie-wc>` : cash >= 1000 ? `<script src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js" type="module"></script>
<dotlottie-wc class='file' src="https://lottie.host/ce083988-f5b7-4fb9-921c-619666b7d4d3/f6s8dqr9mp.lottie" style="width: 70px;height: 70px" speed="1" autoplay loop></dotlottie-wc>` : cash > 0 ? `<script src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js" type="module"></script>
<dotlottie-wc class='file'
  src="https://lottie.host/05b2bc4c-f748-48a6-bb22-6e0f29a56397/6VxQtxb45d.lottie"
  style="width: 70px;height: 70px"
  speed="1"
  autoplay
  loop
></dotlottie-wc>` : '👻 Refill';
  document.querySelector('.amount').innerHTML = `${dalasis}${cash}<br>${emoji}`;
}


// Add-to-cart button
document.querySelectorAll('.js-add').forEach(button => {
  button.addEventListener('click', async () => {
    const save = button.dataset.foody;
    const price = parseInt(button.dataset.price);

    if (cash < price) {
      memes();
      document.querySelector('.amount').innerHTML = `${dalasis}${cash} ur broke<br> <dotlottie-wc class='file'
  src="https://lottie.host/9468b5b4-f226-4fda-87b3-f70a9606bc8e/kRZBq1B4NU.lottie"
  style="width: 70px;height: 70px"
  speed="1"
  autoplay
  loop
></dotlottie-wc>`;
     
    }
 
  if (cash >= price){
document.querySelectorAll('.js-add').forEach((button)=>{
  button.addEventListener('click', (event)=>{
const tosave = event.target.closest('.product-containers')
const save = tosave.querySelector('.added-to-cart')
save.classList.add('added-to-cart-visible')

setTimeout(()=>{
save.classList.remove('added-to-cart-visible')
}, 300)
  })
})
}
else if (cash < price){
save.classList.add('added-to-cart')
}

 




    play();
    addtocart(save, price);
    cash -= price;
await saveCartToFirestore();
    updatecartquantity();
    updateCashDisplay();

    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { money: cash });
    }
  });
});

// Real-time like/dislike sync
function setupRealtimeListeners() {
  const foodsRef = collection(db, "foods");
  onSnapshot(foodsRef, snapshot => {
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      const name = data.name;
      const likeEl = document.querySelector(`.like-count[data-food="${name}"]`);
      const dislikeEl = document.querySelector(`.dislike-count[data-food="${name}"]`);
      if (likeEl) likeEl.textContent = data.likeCount || 0;
      if (dislikeEl) dislikeEl.textContent = data.dislikeCount || 0;
    });
  });
}



document.addEventListener('click', async (e) => {
  const moneyEl = e.target.closest('.admin');
  if (!moneyEl) return;

 
  cash += 200;
   updateCashDisplay();

  
  try {
    const user = auth.currentUser;
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, { money: increment(200) });
  } catch (err) {
    console.error('Failed to update money in Firestore', err);
  }
});



// Handle like/dislike clicks
function setupClickHandlers() {
  document.body.addEventListener('click', async (e) => {
    const user = auth.currentUser;
   
    let field = null;
    if (e.target.classList.contains('like')) field = 'likeCount';
    else if (e.target.classList.contains('dislike')) field = 'dislikeCount';
    else return;

    const container = e.target.closest('.product-containers');
    const name = container.querySelector(`.${field === 'likeCount' ? 'like' : 'dislike'}-count`).getAttribute('data-food');
    const ref = doc(db, "foods", name);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        name,
        likeCount: 0,
        dislikeCount: 0,
        likedBy: [user.uid],
        dislikedBy: []
      });
    }

    const docData = (await getDoc(ref)).data();
    const arrField = field === 'likeCount' ? 'likedBy' : 'dislikedBy';
    if (docData[arrField]?.includes(user.uid)) {
      return alert(`You already ${field === "likeCount" ? "liked" : "disliked"} this! lol ✌😎`);
    }

    const updates = {};
    updates[field] = increment(1);
    updates[arrField] = arrayUnion(user.uid);
    await updateDoc(ref, updates);
  });
}


// Startup
document.addEventListener("DOMContentLoaded", () => {
  setupRealtimeListeners();
  setupClickHandlers();

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      signOut(auth).then(() => {
        localStorage.removeItem("cart");
        window.location.href = "login.html";
      }).catch((error) => {
        console.error("Logout failed:", error);
        alert("Logout failed 😔");
      });
    });
  }
});


async function saveCartToFirestore() {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  await updateDoc(userRef, {
    cart: cart
  });
}
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js"; 
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  onSnapshot,
  increment,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAgcibxEec8dwJb4TZuQrmeoUM3pjylrBk",
  authDomain: "food-canteen-app-77e31.firebaseapp.com",
  projectId: "food-canteen-app-77e31"
};
function hideLoading(){
 setTimeout(()=>{
const loader = document.getElementById("loading-screen")
  if(loader) {loader.style.display = "none";
    loader.classList.add('hidden');
    setTimeout(()=> loader.remove(), 300)
  }
 }, 1300) 

}

 const he = document.querySelector('.sbec-header-right-section') 
 const buttons = document.querySelector('.search-button') 
 const cashs = document.querySelector('.cash'); 
 const scales = matchMedia('(max-width: 730px)');
 
 const scales1 = matchMedia('(max-width: 480px)') 
 const stick = document.querySelector('.stick');
  const search = document.querySelector('.search-bar')
  function scale (){ 
    if(scales1.matches) {
     
      stick.style.display='none'; }
   if(scales.matches)
    { buttons.addEventListener('click', funy) }
   else{ buttons.removeEventListener('click', funy) } }
   const funy = ()=>{ cashs.classList.toggle('cashh') 
    stick.classList.toggle('stickk') 
    search.classList.toggle('search') 
    he.classList.toggle('he') } 
    scale()

function formatCount(n) {
  n = Number(n) || 0;
  if (n >= 1000000) {
    return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (n >= 1000) {
    return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return String(n);
}


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// Audio
function play() {
  const sound = new Audio('media/sound.mp3');
  sound.play();
}
function memes() {
  const meme = new Audio('media/nope.mp3');
  meme.play();
}

import { cart } from '../cart/cart.js';
import { food } from "../food.unit/food.js";
import { addtocart} from '../cart/cart.js';

let dalasis = 'D';
let cash = 0;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    cash = 0;
    updatecartquantity();

    



    updateCashDisplay()
AOS.init();
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    
hideLoading()

   if (docSnap.exists()) {
  const data = docSnap.data();
  cash = data.money || 0;
 
updateCashDisplay()


cart.length = 0; // clear the current cart
if (docSnap.data().cart) {
  docSnap.data().cart.forEach(item => cart.push(item));
}

  // Load cart from Firestore
  if (data.cart) {
cart.length=0 // clear old cart
    data.cart.forEach(item => cart.push(item));
    updatecartquantity(); // show correct number
  }
}

      else {
      await setDoc(userRef, { money: 0 });
      cash = 0;
      updateCashDisplay();
    }

  } else {
window.location.href='login.html'
  }
});

// Display food
let foods = '';
food.forEach((eat) => {
  foods += `
  
  <div class="product-containers"  data-aos="fade-in"
     data-aos-offset="100"
     data-aos-delay="0"
     data-aos-duration="200"
     data-aos-easing="ease-in" >

    <div class="product-image-containers" >
      <img class="product-images" src="${eat.Image} " >
    </div>
    <div class="product-names limit-text-to-2-line">${eat.name}</div>
    

    <!-- RATING BLOCK (new) -->
    <div class="rating-block" style="position:relative; display:flex; margin-top:0px;margin: auto; padding-bottom: 30px">
      <img class="rating-image" src="images1/ratings/rating-0.png" data-product-id="${eat.name}" alt="rating" style="display:block; width:160px; height:auto;">
      <div class="rating-overlay" data-product-id="${eat.name}" style="position:absolute; left:0; top:0; right:0; bottom:0; cursor:pointer;"></div>
      <div class="rating-info" style="font-size:15px; position:absolute; color:blue;right: -10px; font-weight:900 ;">  <span class="rating-count">0</span></div>
    </div>
    <!-- END RATING BLOCK -->

    <div class="prices data-price"><span class="dalasis">D</span>${eat.price}</div>
    <div class="like-container">
   <img class='like' src="images1/thumb-up.png">
      <div class="like-count" data-food="${eat.name}">0</div>

     <img class='dislike' src="images1/thumb-down.png">
      <div class="dislike-count" data-food="${eat.name}">0</div>
 </div>
<div class='all' data-aos="fade-in"
     data-aos-offset="100"
     data-aos-delay="300"
     data-aos-duration="3000"
     data-aos-easing="ease-in"><div class='foods-names food'  >About ${eat.name}
     </div><div class='discription'>${eat.info}</div><div class='discription1'><span class='spans'>Allergies 1:</span> ${eat.Allergies1}</div><div class='discription1'><span class='spans'>Allergies 2:</span> ${eat.Allergies2}</div></div>
    <div class="product-quantity-containers">
     <div class='inside'>info &#8595 </div>
    </div>
    <div class="product-spacer"></div>
    <div class="added-to-cart"><img src="images1/iconss/checkmark.png"> Added</div>
    <button class="add-to-cart-buttons button-primarys js-add" data-foody="${eat.name}" data-price="${eat.price}">Order Now</button>
  </div>
  `;
});
document.querySelector('.js-food').innerHTML = foods;


(function setupLiveSearchStartsWith() {
 
  let searchInput = document.querySelector('.search-bar');
  if (!searchInput || searchInput.tagName !== 'INPUT') {
    searchInput = document.createElement('input');
    searchInput.id = 'liveSearch';
    searchInput.placeholder = 'Type first letters (e.g. "e")...';
    searchInput.autocomplete = 'off';
    searchInput.style.cssText = 'width:100%;max-width:420px;padding:8px 12px;margin:12px 0;border-radius:6px;border:1px solid #ddd;font-size:15px';
    const parent = document.querySelector('.js-food')?.parentElement || document.body;
    parent.insertBefore(searchInput, document.querySelector('.js-food'));
  }

  
  let noResults = document.getElementById('no-search-results');
  if (!noResults) {
    noResults = document.createElement('div');
    noResults.id = 'no-search-results';
    noResults.textContent = 'No items match your search.';
    noResults.style.cssText = 'display:none;color:#666;margin:8px 0;';
    const foodList = document.querySelector('.js-food');
    if (foodList && foodList.parentNode) foodList.parentNode.insertBefore(noResults, foodList.nextSibling);
    else document.body.appendChild(noResults);
  }

 
  function debounce(fn, delay = 120) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), delay);
    };
  }


  const filterFn = () => {
    const q = (searchInput.value || '').trim().toLowerCase();
    const cards = document.querySelectorAll('.product-containers');
    let visible = 0;

    cards.forEach(card => {
      const name = (card.querySelector('.product-names')?.textContent || '').trim().toLowerCase();

      if (!q) {
        card.style.display = ''; 
        visible++;
        return;
      }

      const match = name.startsWith(q);
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });

    noResults.style.display = visible ? 'none' : '';
  };


  filterFn();


  searchInput.addEventListener('input', debounce(filterFn, 120));
})();


document.querySelectorAll('.inside').forEach((of)=>{
  of.addEventListener('click', ()=>{
 const all = of.closest('.product-containers')
const everyclick = all.querySelector('.all')
const info = all.querySelector('.inside')
const alls =all.querySelector('.like-container')
if(everyclick){
  everyclick.classList.toggle('alls')
 
}if(alls){
alls.classList.toggle('likee')
 
}if(info){
  info.classList.toggle('information')
}
  })
})

// --- RATING CODE: attach handlers + realtime listeners ---
// helper: convert numeric rating (0..5, step 0.5) -> filename
function getImageForRating(rating) {
  const idx = Math.round(rating * 10); // e.g. 3.0 -> 30 ; 3.5 -> 35 ; 0.5 -> 5
  const padded = String(idx).padStart(2, '0'); // "05", "30", "35"
  return `images1/ratings/rating-${padded}.png`;
}

function attachCompositeImageRatings() {
  // attach click behavior to overlays
  document.querySelectorAll('.rating-overlay').forEach(overlay => {
    const productId = overlay.dataset.productId;
    if (!productId) return;

    // remove existing handler if any
    overlay.onclick = null;

    overlay.addEventListener('click', async (ev) => {
      const rect = overlay.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const fraction = x / rect.width;           // 0..1
      let step = Math.ceil(fraction * 10);      // 1..10
      if (step < 1) step = 1;
      if (step > 10) step = 10;
      const ratingValue = (step / 2);           // 0.5 .. 5.0

      const user = auth.currentUser;
      if (!user) { alert('Please sign in to rate'); return; }

      try {
        const ratingRef = doc(db, 'foods', productId, 'ratings', user.uid);
        await setDoc(ratingRef, { rating: ratingValue, ts: Date.now() });
        // instant feedback
        const img = document.querySelector(`.rating-image[data-product-id="${productId}"]`);
        if (img) img.src = getImageForRating(ratingValue);
      } catch (err) {
        console.error('Failed to save rating', err);
        alert('Failed to save rating.');
      }
    });
  });

  // attach realtime listeners for averages
  document.querySelectorAll('.rating-image').forEach(img => {
    const productId = img.dataset.productId;
    if (!productId) return;

    // unsubscribe previous if existed
    if (img.__unsub) img.__unsub();

    const ratingsCol = collection(db, 'foods', productId, 'ratings');
    img.__unsub = onSnapshot(ratingsCol, (snap) => {
      let total = 0, count = 0;
      snap.forEach(d => {
        const r = Number(d.data().rating) || 0;
        // include zeros? we skip zero to avoid bias if needed; change logic if you want zero to count
        if (r >= 0) { total += r; count++; }
        if (total >= 1000){
  return (total / 1000).toFixed(1).replace(/\.0$/, '') + 'k';

}if (count >= 1000){
  return (count/ 1000).toFixed(1).replace(/\.0$/, '') + 'k';

}if (r >= 1000){
  return (r/ 1000).toFixed(1).replace(/\.0$/, '') + 'k';

}
      });
      const avg = count ? (total / count) : 0;
      const rounded = Math.round(avg * 2) / 2; // nearest 0.5
      img.src = getImageForRating(rounded);

      const parent = img.closest('.rating-block');
      if (parent) {
        const avgEl = parent.querySelector('.rating-avg');
        const countEl = parent.querySelector('.rating-count');
        if (avgEl) avgEl.textContent = avg ? avg.toFixed(2) : '0.00';
  if (countEl) countEl.textContent = formatCount(count);
      }
    }, err => console.error('ratings onSnapshot error', productId, err));
  });
}
// --- end rating code ---

// Update quantity
function updatecartquantity() {
  let cartQuantity = 0;
  cart.forEach(item => {
    cartQuantity += item.quantity;
  });
  document.querySelector('.js-quantity').textContent = cartQuantity;
}

// Update cash with emoji
function updateCashDisplay() {
  
  document.querySelector('.amount').innerHTML = `${dalasis}${cash.toLocaleString()}`;
}


// Add-to-cart button
document.querySelectorAll('.js-add').forEach(button => {
  button.addEventListener('click', async () => {
    const save = button.dataset.foody;
    const price = parseInt(button.dataset.price);

    if (cash < price) {
      memes();
  
    }
 
  if (cash >= price){
document.querySelectorAll('.js-add').forEach((button)=>{
  button.addEventListener('click', (event)=>{
const tosave = event.target.closest('.product-containers')
const save = tosave.querySelector('.added-to-cart')
save.classList.add('added-to-cart-visible')

setTimeout(()=>{
save.classList.remove('added-to-cart-visible')
}, 300)
  })
})
}
else if (cash < price){
save.classList.add('added-to-cart')
}

    play();
    addtocart(save, price);
    cash -= price;
await saveCartToFirestore();
    updatecartquantity();
    updateCashDisplay();

    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { money: cash });
    }
  });
});

// umm This is for Real-time like/dislike sync i think
function setupRealtimeListeners() {
  const foodsRef = collection(db, "foods");
  onSnapshot(foodsRef, snapshot => {
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      const name = data.name;

      const likeEl = document.querySelector(`.like-count[data-food="${name}"]`);
      const dislikeEl = document.querySelector(`.dislike-count[data-food="${name}"]`);

      const likeVal = Number(data.likeCount) || 0;
      const dislikeVal = Number(data.dislikeCount) || 0;

      if (likeEl) likeEl.textContent = formatCount(likeVal);
      if (dislikeEl) dislikeEl.textContent = formatCount(dislikeVal);
    });
  }, err => console.error('foods onSnapshot error', err));
}




document.addEventListener('click', async (e) => {
  const moneyEl = e.target.closest('.admin');
  if (!moneyEl) return;

 
  cash += 0;
   updateCashDisplay();

  
  try {
    const user = auth.currentUser;
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, { money: increment(100) });
  } catch (err) {
    console.error('Failed to update money in Firestore', err);
  }
});


// Handle like/dislike clicks i think
function setupClickHandlers() {
  document.body.addEventListener('click', async (e) => {
    const user = auth.currentUser;
   
    let field = null;
    if (e.target.classList.contains('like')) field = 'likeCount';
    else if (e.target.classList.contains('dislike')) field = 'dislikeCount';
    else return;

    const container = e.target.closest('.product-containers');
    const name = container.querySelector(`.${field === 'likeCount' ? 'like' : 'dislike'}-count`).getAttribute('data-food');
    const ref = doc(db, "foods", name);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        name,
        likeCount: 0,
        dislikeCount: 0,
        likedBy: [user.uid],
        dislikedBy: []
      });
    }

    const docData = (await getDoc(ref)).data();
    const arrField = field === 'likeCount' ? 'likedBy' : 'dislikedBy';
    if (docData[arrField]?.includes(user.uid)) {
      return alert(`You already ${field === "likeCount" ? "liked" : "disliked"} this! lol ✌😎`);
    }

    const updates = {};
    updates[field] = increment(1);
    updates[arrField] = arrayUnion(user.uid);
    await updateDoc(ref, updates);
  });
}



document.addEventListener("DOMContentLoaded", () => {
  setupRealtimeListeners();
  setupClickHandlers();

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      signOut(auth).then(() => {
        localStorage.removeItem("cart");
        window.location.href = "login.html";
      }).catch((error) => {
        console.error("Logout failed:", error);
        alert("Logout failed 😔");
      });
    });
  }

  // attach rating handlers after DOMContentLoaded (products already injected earlier)
  attachCompositeImageRatings();
});

async function saveCartToFirestore() {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  await updateDoc(userRef, {
    cart: cart
  });
}
document.querySelector('.stick').addEventListener('click', (fun) =>{
  const hope = document.querySelector('.amount')
  const hopes = document.getElementById('logoutBtn')
  const hoping = document.querySelector('.info');
  let peak = 'un-stick';
  let peaks = 'stick-up'
  const text = document.querySelector('.stick').textContent=`${peak}`;
   if( text === peak){
    const text = document.querySelector('.stick').textContent=`${peaks}`;
  }else if(text === peak){
    const text = document.querySelector('.stick').textContent=`${peaks}`;
  }
    hope.classList.toggle('amounts');
   hope.classList.toggle('.amount');
hopes.classList.toggle('logs')
    hopes.classList.toggle('.logoutBtn');
    hoping.classList.toggle('infos')
    hoping.classList.toggle('.info')
  
})
/*    document.querySelector('.amount').innerHTML = `${dalasis}${cash} Insufficient <br> <dotlottie-wc class='file'
  src="https://lottie.host/9468b5b4-f226-4fda-87b3-f70a9606bc8e/kRZBq1B4NU.lottie"
  style="width: 70px;height: 70px"
  speed="1"
  autoplay
  loop
></dotlottie-wc>`;


let emoji = cash >= 5000 ? `<dotlottie-wc class='file'
  src="https://lottie.host/91075a26-47f9-4f2f-80a7-3a2c3e2e6937/KgYiKOfBJC.lottie"
style="width: 70px;height: 70px"
  speed="1"
  autoplay
  loop
></dotlottie-wc>` : cash >= 3000 ? `<dotlottie-wc class='file'
  src="https://lottie.host/7cf74e13-11bd-4862-99c8-a437984e19ce/CFLVrHl8uh.lottie"
  style="width: 70px;height: 70px"
  autoplay
  loop
></dotlottie-wc>` : cash >= 1000 ? `<script src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js" type="module"></script>
<dotlottie-wc class='file' src="https://lottie.host/ce083988-f5b7-4fb9-921c-619666b7d4d3/f6s8dqr9mp.lottie" style="width: 70px;height: 70px" speed="1" autoplay loop></dotlottie-wc>` : cash > 0 ? `<script src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js" type="module"></script>
<dotlottie-wc class='file'
  src="https://lottie.host/05b2bc4c-f748-48a6-bb22-6e0f29a56397/6VxQtxb45d.lottie"
  style="width: 70px;height: 70px"
  speed="1"
  autoplay
  loop
></dotlottie-wc>` : '👻 Refill';

*/ 
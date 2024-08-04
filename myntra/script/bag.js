let bagItemObjects;
onLoad();

function onLoad() {
  loadBagItemObjects();
  displayBagItems();
  displaybagsummary();
}

// load item from array-bagitems to array-baagitemobject based on id , transform(id->object)
function loadBagItemObjects() {
  console.log(bagItems);
  bagItemObjects = bagItems.map(itemId => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
  console.log(bagItemObjects);
}

//display bagitems by using function generateitemhtml(generate for 1 item)
function displayBagItems() {
  let containerElement = document.querySelector('.bag-items-container');
  let innerHTML = '';
  bagItemObjects.forEach(bagItem => {
    innerHTML += generateItemHTML(bagItem);
  });
  containerElement.innerHTML = innerHTML;
} 

function generateItemHTML(item) {
  return `<div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="${item.image}">
    </div>
    <div class="item-right-part">
      <div class="company">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-container">
        <span class="current-price">Rs ${item.current_price}</span>
        <span class="original-price">Rs ${item.original_price}</span>
        <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${item.return_period} days</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${item.delivery_date}</span>
      </div>
    </div>

    <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
  </div>`;
}

//on clicking cross button or removing from bag

function removeFromBag(itemid){
  bagItems=bagItems.filter(element => element!=itemid);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagItems();
  displayBagIcon();
  displaybagsummary();
}

//display baag summary
function displaybagsummary(){
  let bagSummaryElement=document.querySelector('.bag-summary');
  
  let noOfitems=bagItems.length;
  let totalMRP=0;
  let discount=0;
  const conviencefees=99;
  bagItemObjects.forEach(element => {
    totalMRP+=element.original_price;
    discount+=element.original_price-element.current_price;
  });

  let totalamount=totalMRP-discount+conviencefees;
   bagSummaryElement.innerHTML=`
              <div class="bag-details-container">
              <div class="price-header">PRICE DETAILS ( ${noOfitems} Items) </div>
              <div class="price-item">
                <span class="price-item-tag">Total MRP</span>
                <span class="price-item-value">Rs ${totalMRP}</span>
              </div>
              <div class="price-item">
                <span class="price-item-tag">Discount on MRP</span>
                <span class="price-item-value priceDetail-base-discount">-Rs ${discount}</span>
              </div>
              <div class="price-item">
                <span class="price-item-tag">Convenience Fee</span>
                <span class="price-item-value">Rs 99</span>
              </div>
              <hr>
              <div class="price-footer">
                <span class="price-item-tag">Total Amount</span>
                <span class="price-item-value">Rs ${totalamount}</span>
              </div>
            </div>
            <button class="btn-place-order">
              <div class="css-xjhrni">PLACE ORDER</div>
            </button>
            `;
}



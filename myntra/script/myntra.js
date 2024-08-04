let bagItems;
onload();



function onload(){
    let bagstring=localStorage.getItem('bagItems');
    bagItems=bagstring?JSON.parse(bagstring):[];
    dislplayOnHomePage();
    displayBagIcon();
}

   // function performing on clicking Add to bag
function addtobag(bagid){
    bagItems.push(bagid);
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    displayBagIcon();
}
 
// function for displaying bag icon
function displayBagIcon(){
    let bagItem_element=document.querySelector('.bag-items');
    if(bagItems.length>0){
    bagItem_element.style.visibility='visible';
    bagItem_element.innerText=bagItems.length;
   }
    else{
        bagItem_element.style.visibility='hidden';
    }
}

// function for displaying home page
function dislplayOnHomePage(){
    let itemContainer=document.querySelector('.items-container');
    if(!itemContainer) return;
    let innerhtml=``;
items.forEach(item => {
    innerhtml+=`<div class="item-container">
        <img src="${item.image}" class="item-img">
        <div class="rating">${item.rating.stars} * | ${item.rating.count}</div>
        <div class="company-name">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price">
            <span class="current-price">Rs  ${item.current_price}</span>
            <span class="original-price">Rs  ${item.original_price}</span>
            <span class="discount">( ${item.discount_percentage}% OFF)</span>
        </div>
        <button class="btn-add-bag" onclick="addtobag(${item.id})">Add to Bag</button>
    </div>`
});

itemContainer.innerHTML=innerhtml;
}

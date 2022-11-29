# Development

### Link to Deployed Website
https://elzyh369.github.io/development_page

### Goal and Value of the Application
The goal of this app is to create an online store for my own art prints.


I've always wanted to create an art porfolio and online store, and this assignment was a great opportunity for me to get started.

### Usability Principles Considered
I used a minimalistic layout for this assignment to make the artworks stand out. 


Artwork items styled with flex for consistency.


The title of the page is marked in bold so users will know the purpose of this page immediately.


'Cart total' is highlighted in black in contrast to the white surrounding so users could easily locate where it is (learnability).


Sort/filter put in a box with 'default' button checked automatically to indicate that the buttons/checkboxes in this container are all clickable.


Although the price and item names are included in the image for each item, I decided to show them again underneath in case the images fail to load.

### Organization of Components
Similar to the structure we had in the react studio, I created an assets folder, a components foder, and a main App.js file.


ArtworkData.json in the assets folder is designed to store all information for each item.


ArtItems.js is the component for each item that includes the image, name, price, add to cart, and remove to cart button.


In the App.js file, I designed multiple functions that are related to sort, filter, and cart(add/remove). The sort and filter functions together create the selection box component, and the cart functions help with the aggregator component.

### How Data is Passed Down Through Components
artitems mapped
price passed on to addToCart()

### How the User Triggers State Changes
'activeStyleFilters' is an empty array when users first enters site, when users click corresponding style filters, the state will change to an array of items that matches the value that the filter is looking for. 'activeContentFilters' has a similar idea to 'activeStyleFilters'.


'sortBy' is set to an array of items with the order of 'id' in ArtworkData.json. When users clicks sort by price, the state will change to an array of all items with price from low to high.


'cart' has an empty state in the beginning. When users add/remove items, the state will be changed to 'newCart', which contains aggregated price of items that are currently in cart.


'displayProducts' visually shows the art items. When users first enter the website its default state is set to 'ArtworkData', which means it will display items in the order it was presented in ArtworkData.json. When users sort or filter, it will visually display the new state from 'sortBy', 'activeStyleFilters', and 'activeContentFilters'.

### Credits
Code inspiration from:

Gear Up Slides, React Studio, TA hours, https://www.w3schools.com/jsref/jsref_includes.asp, https://www.w3docs.com/snippets/javascript/how-to-check-and-uncheck-checkbox-with-javascript-and-jquery.html


Image credits:
I created the illustrations/photos during free time. They were not used in any other class at Brown or for any other assignments.

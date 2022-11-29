import logo from './logo.svg';
import './App.css';
import ArtworkData from './assets/ArtworkData.json';
import ArtItems from './components/ArtItems';
import { useEffect, useState } from 'react';

ArtworkData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

function App() {

  const [names, setNames] = useState([]);
  const [cart, setCart] = useState([]);
  const [sortBy, setSortBy] = useState('id');
  const [query, setQuery] = useState([]);
  const [activeStyleFilters, setActiveStyleFilers] = useState([]);
  const [activeContentFilters, setActiveContentFilers] = useState([]);
  const [displayProducts, setDisplayProducts] = useState(ArtworkData)

  function addToCart(item) {
    const newCart = [...cart, item]
    setCart(newCart);

    // item.inCart = item.inCart===1?0:1;
    // var arr = cart;
    // if (item.inCart===0){
    //   for (var i = 0; i < arr.length; i++){
    //     if(item.id===arr[i].id){
    //       arr.splice(i,1);
    //     }
    //   }
    //   setCart(current => [...arr]);
    // }
    // setCart(current => [...arr, item]);
  }

  function removeFromCart(item) {
    const newCart = [...cart]
    newCart.splice(newCart.indexOf(item), 1)
    setCart(newCart);
  }

  function subTotal() {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price;
    }
    return total;
  }

  function compare(num) {
    console.log(num)
    return function (a, b) {

      return a[num] - b[num];
    }
  }

  function sortItems(event) {
    // if (event.target.value === "Default") {
    //   var arr = ArtworkData;
    //   arr.sort(compare("id"));
    //   setNames(current => [...arr]);
    //   setSortBy(current => "id");
    // }
    // else if (event.target.value === "Price") {
    //   var arr = ArtworkData;
    //   arr.sort(compare("price"));
    //   setNames(current => [...arr]);
    //   setSortBy(current => "Price");
    // }
    const arr = sort(event.target.value, ArtworkData)

    setNames([...arr]);
    setSortBy(event.target.value);
    setDisplayProducts(arr)
  }

  function sort(sortBy, items) {

    var arr = [...items];
    arr.sort(compare(sortBy));
    return arr;
  }

  function filterItems(art) {
    var arr = ArtworkData;
    var arr2 = [];

    if (query.includes('color') || query.includes('B&W')) {
      for (var i = 0; i < arr.length; i++) {
        if (query.includes(arr[i].type)) {
          arr2.push(arr[i]);
        }
      }
    }
    else if (query.includes('animal') || query.includes('portrait') || query.includes('other')) {
      for (var i = 0; i < arr.length; i++) {
        if (query.includes(arr[i].content)) {
          arr2.push(arr[i]);
        }
      }
    }

    setNames(current => [...arr2]);
    setQuery(current => [...arr2]);
  }

  function selectFilter(event) {
    // update filter state variable
    const { name, value } = event.target;

    // let newActiveFilters = [...activeFilters]
    // if (activeFilters.includes(event.target.value)) {
    //   newActiveFilters.splice(newActiveFilters.indexOf(event.target.value), 1);
    // } else
    //   newActiveFilters.push(event.target.value);
    let styleFilter = [...activeStyleFilters]
    let contentFilter = [...activeContentFilters]
    if (name === 'style') {

      if (styleFilter.includes(value)) {
        styleFilter.splice(styleFilter.indexOf(value), 1);
      } else
        styleFilter.push(value);
      setActiveStyleFilers(styleFilter);
    } else if (name === 'content') {

      if (contentFilter.includes(value)) {
        contentFilter.splice(contentFilter.indexOf(value), 1);
      } else
        contentFilter.push(value);
      setActiveContentFilers(contentFilter);
    }

    // call a function that applies filter + sorting (based on the updated state variables)
    const filteredProducts = ArtworkData.filter(
      (item) => {

        if (styleFilter.length !== 0 && contentFilter.length !== 0) {
          return styleFilter.includes(item.type) && contentFilter.includes(item.content)
        }
        else if (contentFilter.length === 0 && styleFilter.length !== 0) {
          return styleFilter.includes(item.type);
        }
        else if (styleFilter.length === 0 && contentFilter.length !== 0) {
          return contentFilter.includes(item.content);
        }
        return true;
      }
    )


    const sortedProducts = sort(sortBy, filteredProducts)

    setDisplayProducts(sortedProducts)

    // if(query.includes(event.target.value)){
    //   for (var i=0; i<query.length; i++){
    //     if(query[i]===event.target.value){
    //       query.splice(i,1)
    //     }
    //   }
    // }
    // else{
    //   const newQuery = [...query, event.target.value]
    //   setQuery(newQuery);
    //   console.log("newQuery", newQuery)
    // }
    // filterItems();
  }




  return (
    <body>

      <div className="title">
        <h1>MY ART STORE</h1>
      </div>

      <div className="description">
        <h2>Shop my illustration and <br /> photography prints.</h2>
      </div>

      <div className="total">
        <h3>Cart Total: {subTotal()}</h3>
      </div>

      <div className="selection_box">
        <div className="selection_sub">
          <h3><u>Sort by:</u></h3>
          <div className="selection_each">
            <label style={{ display: 'flex' }}><input checked={sortBy === 'id'} onChange={sortItems}  type="radio" value="id" name='sort' /> <h3>Default</h3> </label>
          </div>
          <div className="selection_each">
            <label style={{ display: 'flex' }}><input checked={sortBy === 'price'} onChange={sortItems} type="radio" value="price" name='sort' /> <h3>Price (low to high)</h3> </label>
          </div>
        </div>
        <div className="selection_sub">
          <h3><u>Style:</u></h3>
          <div className="selection_each">
            <label style={{ display: 'flex' }}><input checked={activeStyleFilters.includes('color')} onChange={selectFilter} type="checkbox" value="color" name='style' /> <h3>Color</h3> </label>
          </div>
          <div className="selection_each">
            <label style={{ display: 'flex' }}><input checked={activeStyleFilters.includes('B&W')} onChange={selectFilter} type="checkbox" value="B&W" name='style' /> <h3>B&W</h3> </label>
          </div>
        </div>
        <div className="selection_sub">
          <h3><u>Content:</u></h3>
          <div className="selection_each">
            <label style={{ display: 'flex' }}><input checked={activeContentFilters.includes('animal')} onChange={selectFilter} type="checkbox" value="animal" name='content' /> <h3>Animal</h3> </label>
          </div>
          <div className="selection_each">
            <label style={{ display: 'flex' }}><input checked={activeContentFilters.includes('portrait')} onChange={selectFilter} type="checkbox" value="portrait" name='content' /> <h3>Portrait</h3> </label>
          </div>
          <div className="selection_each">
            <label style={{ display: 'flex' }}><input checked={activeContentFilters.includes('other')} onChange={selectFilter} type="checkbox" value="other" name='content' /> <h3>Other</h3> </label>
          </div>
        </div>

      </div>
      <div className="products">
        {displayProducts.map((item, index) => (
          <ArtItems item={item} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />
        ))}
      </div>

    </body>
  );
}

export default App;

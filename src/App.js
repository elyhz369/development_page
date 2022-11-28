import logo from './logo.svg';
import './App.css';
import ArtworkData from './assets/ArtworkData.json';
import ArtItems from './components/ArtItems';
import {useState} from 'react';

ArtworkData.forEach((item)=>{
  item.image = process.env.PUBLIC_URL + "/" + item.image;
  item.inCart = 0;
});

function App(){

  const[names, setNames] = useState([]);
  const[cart, setCart] = useState([]);
  const[sortBy,setSortBy] = useState('Default');
  const[query,setQuery] = useState([]);

  function addToCart(item){
    item.inCart = item.inCart===1?0:1;
    var arr = cart;
    if (item.inCart===0){
      for (var i = 0; i < arr.length; i++){
        if(item.id===arr[i].id){
          arr.splice(i,1);
        }
      }
      setCart(current => [...arr]);
    }
    setCart(current => [...arr, item]);
  }

  function subTotal(){
    let total = 0;
    for (let i = 0; i < names.length; i++){
      total += names[i].price;
    }
    return total;
  }

  function compare(num) {
    return function (a, b) {
      return a[num] - b[num];
    }
  }

  function sortItems(event) {
    if(event.target.value==="Default"){
      var arr = ArtworkData;
      arr.sort(compare("id"));
      setNames(current => [...arr]);
      setSortBy(current =>"Default");
    }
    else if(event.target.value==="Price"){
      var arr = ArtworkData;
      arr.sort(compare("price"));
      setNames(current => [...arr]);
      setSortBy(current =>"Price");
    }
  }

  function filterItems(art){
	  var arr = ArtworkData;
	  var arr2 = [];
    
	  if(query.includes('color')||query.includes('B&W')){
      for (var i = 0; i < arr.length; i++){
        if(query.includes(arr[i].type)){
          arr2.push(arr[i]);
        }
      }
    }
    else if(query.includes('animal')||query.includes('portrait')||query.includes('other')){
      for (var i = 0; i < arr.length; i++){
        if(query.includes(arr[i].content)){
          arr2.push(arr[i]);
        }
      }
    }
    setNames(current => [...arr2]);
    setQuery(current => [...arr2]);
  }

  function selectFilter(event){
    if(query.includes(event.target.value)){
      for (var i=0; i<query.length; i++){
        if(query[i]===event.target.value){
          query.splice(i,1)
        }
      }
    }
    else{
      query.push(event.target.value)
      setQuery(current=>[...query])
    }
    filterItems();
  }



  return(
    <body>

    <div className="title">
      <h1>MY ART STORE</h1>
    </div>

    <div className="description">
      <h2>Shop my illustration and <br/> photography prints.</h2>
    </div>

    <div className="total">
	    <h3>Cart Total: {subTotal()}</h3>
	  </div>

    <div className="selection_box">
      <div className="selection_sub">
        <h3>Sort by:</h3>
        <div className="selection_each">
        <label><input onChange={sortItems} defaultChecked type="radio" value="Default" name='sort'/> <h3>Default</h3> </label>
        </div>
        <div className="selection_each">
        <label><input onChange={sortItems} type="radio" value="Price" name='sort'/> <h3>Price</h3> </label>
        </div>
      </div>
      <div className="selection_sub">
        <h3>Style:</h3>
        <div className="selection_each">
        <label><input onChange={selectFilter} type="checkbox" value="color" name='sort'/> <h3>Color</h3> </label>
        </div>
        <div className="selection_each">
        <label><input onChange={selectFilter} type="checkbox" value="B&W" name='sort'/> <h3>B&W</h3> </label>
        </div>
      </div>
      <div className="selection_sub">
        <h3>Content:</h3>
        <div className="selection_each">
        <label><input onChange={selectFilter} type="checkbox" value="animal" name='sort'/> <h3>Animal</h3> </label>
        </div>
        <div className="selection_each">
        <label><input onChange={selectFilter} type="checkbox" value="portrait" name='sort'/> <h3>Portrait</h3> </label>
        </div>
        <div className="selection_each">
        <label><input onChange={selectFilter} type="checkbox" value="other" name='sort'/> <h3>Other</h3> </label>
        </div>
      </div>
      
    </div>
    <div className="products">
      {ArtworkData.map((item,index) => (
        <ArtItems item = {item} addToCart = {addToCart}/>
      ))}
    </div>

    </body>
  );
}

export default App;

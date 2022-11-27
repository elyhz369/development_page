import logo from './logo.svg';
import './App.css';
import ArtworkData from './assets/ArtworkData.json';
import ArtItems from './components/ArtItems';
import {useState} from 'react';

ArtworkData.forEach((item)=>{
  item.image = process.env.PUBLIC_URL + "/" + item.image;
  item.inCart = 0
});

function App(){

  const[names, setNames] = useState([])
  const[names2, setNames2] = useState([])
  const[sortBy,setSortBy] = useState('Default')
  const[query,setQuery] = useState([])
  const[price, setPrice] = useState([])
  const[cartTotal,setCartTotal] = useState(0)
	const[cartChange,setCartChange] = useState(false)




  return(
    <body>
    <div className="container">
      <h1>MY ART STORE</h1>
      <h2>Shop my illustration and photography prints.</h2>
      {ArtworkData.map((item,index) => (
        <ArtItems item = {item} addToCart = {addToCart}/>
      ))}

      <div>
        <h3>Cart Total: {subTotal()}</h3>
      </div>
    </div>
    </body>
  );
}

export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
// export default App;

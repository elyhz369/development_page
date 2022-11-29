import "./ArtItems.css"

function ArtItems({item, cart, addToCart, removeFromCart}){
    let isInCart = false;
    if (cart.includes(item)){
        isInCart = true;
    }
    return(
        <div className = "ArtItems">
            <img src = {item.image} alt='image' width='310px'></img>
            <h4>{item.name} | price: {item.price} <br/> style: {item.type} | content: {item.content}</h4>
            {!isInCart && <div  className="button_add" onClick = {()=>{addToCart(item)}}>ADD TO CART</div>}
            {isInCart && <div  className="button_rem" onClick = {()=>{removeFromCart(item)}}>REMOVE</div>}
        </div>
    )
}

export default ArtItems
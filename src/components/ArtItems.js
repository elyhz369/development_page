import "./ArtItems.css"

function ArtItems(props){
    return(
        <div className = "ArtItems">
            <img src = {props.item.image} alt='image'></img>
            {props.item.inCart===0 && <div  className="button_add" onClick = {()=>{props.addToCart(props.item)}}>ADD TO CART</div>}
            {props.item.inCart===1 && <div  className="button_rem" onClick = {()=>{props.addToCart(props.item)}}>REMOVE</div>}
        </div>
    )
}

export default ArtItems
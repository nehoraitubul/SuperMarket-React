import { Button } from "@mui/material";
import './BuyButton.css'
import { useState } from "react";
import { CART_ACTIONS, useCart, useCartDispatch } from '../AppContext';



export function BuyButton(props) {

    const cartState = useCart()
    const dispatch = useCartDispatch()

    console.log('this is the current cart products: ', cartState);
    console.log('cartState.products[props.product_cat_id]', cartState.products[props.product_cat_id]);

    const [quantity, setQuantity] = useState(false)

    const handleClick = () => {
        dispatch({
            type: CART_ACTIONS.CART_ADD_TO_CART,
            addedProduct: props.product_cat_id
        })
    }


    return (
        <>
        {cartState.products[props.product_cat_id] == undefined ?
        <Button className="buy-button" fullWidth={true}
        sx={{color: '#fff', backgroundColor: '#4caf50', transition: "background-color 0.3s",
        "&:hover":{ backgroundColor: '#66bb6a'}}} onClick={handleClick}>
            BUY
        </Button>
        :
        <Button>CLICKED</Button>
        }
        </>
    )
}
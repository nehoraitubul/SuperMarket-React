import { Box, Button } from "@mui/material";
import './BuyButton.css'
import { useState } from "react";
import { CART_ACTIONS, useCart, useCartDispatch } from '../AppContext';
import { QuantityButtons } from "./QuantityButtons";



export function BuyButton(props) {

    const cartState = useCart()
    const dispatch = useCartDispatch()

    // console.log('this is the current cart products: ', cartState);
    // console.log('cartState.products[props.product_cat_id]', cartState.products[props.product_cat_id]);

    const [quantity, setQuantity] = useState(false)

    const handleClick = () => {
        dispatch({
            type: CART_ACTIONS.CART_ADD_TO_CART,
            addedProduct: props.product_cat_id,
            productImg: props.product_img,
            productName: props.product_name,
            productUnit: props.product_unit,
            productPrice: props.product_price,
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
        <Box display={"flex"} flexDirection={"row"} >
            <QuantityButtons product_cat_id={props.product_cat_id} hovered={props.hovered} isMobile={props.isMobile}/>
        </Box>
        }
        </>
    )
}
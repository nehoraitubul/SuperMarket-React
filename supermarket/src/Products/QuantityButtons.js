import { Avatar, Box, Button, ButtonGroup, Chip, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { CART_ACTIONS, useCart, useCartDispatch } from '../AppContext';
import cartImg from '../images-all/7341123_e-commerce_online_shopping_ui_shopping cart_icon.svg'


export function QuantityButtons(props) {

    const cartState = useCart()
    const dispatch = useCartDispatch()

    // console.log('QuantityButtons', props.product_cat_id);

    // console.log('df',cartState.products[props.product_cat_id]);

    const [quantity, setQuantity] = useState(1)

    const handleAddClick = () => {
        setQuantity(quantity+1)
        dispatch({
            type: CART_ACTIONS.CART_ADD_QTY,
            addedProduct: props.product_cat_id
        })
    }

    const handleDeacClick = () => {
        setQuantity(quantity-1)
        dispatch({
            type: CART_ACTIONS.CART_REDUCE_QTY,
            addedProduct: props.product_cat_id
        })
    }


    return (
        <>
        {props.hovered &&
        <Box alignItems="center" justifyContent="space-between"
            maxHeight={'40px'} display={"flex"} flexDirection={"row"} sx={{width: '100%'}} >

            <Button sx={{maxWidth: '85px', color: '#fff', backgroundColor: '#4caf50', transition: "background-color 0.3s",
                    "&:hover":{ backgroundColor: '#66bb6a'}}}
                    onClick={handleAddClick} >+</Button>
            
            {/* <Button disabled> changed ID */}
            <TextField id={props.product_cat_id} variant="standard" value={cartState.products[props.product_cat_id]['quantity']}
                sx={{input: {textAlign: "center"}, maxWidth: '40px', textAlign: 'center'}} />
            {/* </Button> */}

            <Button sx={{maxWidth: '85px', color: '#fff', backgroundColor: '#4caf50', transition: "background-color 0.3s",
                    "&:hover":{ backgroundColor: '#66bb6a'}}}
                    onClick={handleDeacClick} >-</Button>

        </Box>
        }
        
        {props.hovered == false &&
            <Chip   sx={{minWidth: '80px'}}
                    avatar={<Avatar alt="Natacha" src={cartImg} />}
                    label={<Typography fontWeight={'bold'}>{cartState.products[props.product_cat_id]['quantity']}</Typography>}/>
        }
        </>
    )
}
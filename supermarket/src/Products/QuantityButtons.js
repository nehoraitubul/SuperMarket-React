import { Avatar, Box, Button, ButtonGroup, Chip, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { CART_ACTIONS, useCart, useCartDispatch } from '../AppContext';
import cartImg from '../images-all/7341123_e-commerce_online_shopping_ui_shopping cart_icon.svg'


export function QuantityButtons(props) {

    const cartState = useCart()
    const dispatch = useCartDispatch()

    // console.log('QuantityButtons', props.product_cat_id);
    // console.log('QuantityButtons', props.hovered);
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

    if(!props.isMobile){
    return (
        <>
        
        {props.hovered ?
        <Box alignItems="center" justifyContent="space-between"
            maxHeight={'40px'} display={"flex"} flexDirection={"row"} sx={{width: '100%'}} >

            <Button sx={{maxWidth: '85px', color: '#fff', backgroundColor: '#4caf50', transition: "background-color 0.3s",
                    "&:hover":{ backgroundColor: '#66bb6a'}}}
                    onClick={handleAddClick} >+</Button>
            
            <Button disabled>
            <TextField id={props.product_cat_id} variant="standard" value={cartState.products[props.product_cat_id]['quantity']}
                sx={{input: {textAlign: "center"}, maxWidth: '40px', textAlign: 'center'}} />
            </Button>

            <Button sx={{maxWidth: '85px', color: '#fff', backgroundColor: '#4caf50', transition: "background-color 0.3s",
                    "&:hover":{ backgroundColor: '#66bb6a'}}}
                    onClick={handleDeacClick} >-</Button>

        </Box>
        
        :
        
        <Chip
            sx={{minWidth: '80px'}}
            avatar={<Avatar src={cartImg} />}
            label={<Typography fontWeight={'bold'}>{cartState.products[props.product_cat_id]['quantity']}</Typography>}
        />

        }

        </>
    )
    }

    if(props.isMobile){
    return (
        <>
            {props.isMobile ? (
                <Box
                    alignItems="center"
                    justifyContent="space-between"
                    maxHeight={'40px'}
                    display={"flex"}
                    flexDirection={"row"}
                    sx={{ width: '100%' }}
                >
                    <Button
                        sx={{
                            maxWidth: '85px',
                            color: '#fff',
                            backgroundColor: '#4caf50',
                            transition: "background-color 0.3s",
                            "&:hover": { backgroundColor: '#66bb6a' }
                        }}
                        onClick={handleAddClick}
                    >
                        +
                    </Button>
                    <Button disabled>
                        <TextField
                            id={props.product_cat_id}
                            variant="standard"
                            value={cartState.products[props.product_cat_id]['quantity']}
                            sx={{ input: { textAlign: "center" }, maxWidth: '40px', textAlign: 'center' }}
                        />
                    </Button>
                    <Button
                        sx={{
                            maxWidth: '85px',
                            color: '#fff',
                            backgroundColor: '#4caf50',
                            transition: "background-color 0.3s",
                            "&:hover": { backgroundColor: '#66bb6a' }
                        }}
                        onClick={handleDeacClick}
                    >
                        -
                    </Button>
                </Box>
            ) : null}
        </>
    )
    }
    
}
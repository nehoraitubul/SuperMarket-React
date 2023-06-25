import { Avatar, Box, Button, Grid, ListItem, ListItemAvatar, Typography } from "@mui/material";
import { CART_ACTIONS, useCart, useCartDispatch } from '../AppContext';
import { useState } from "react";
import { ModalQtyButtons } from "../ProductModal/ModalQty";




export function CartProduct() {

    const cartState = useCart()
    const dispatch = useCartDispatch()

    const [hoveredItem, setHoveredItem] = useState(null);

    const handleItemHover = (itemId) => {
      setHoveredItem(itemId);
    };

    // console.log('CartProduct', cartState.products);


    return (
        <>
          {Object.keys(cartState.products).map((key) => {
            const value = cartState.products[key];
            const itemId = key;
            return (
              <ListItem key={itemId} onMouseEnter={() => handleItemHover(itemId)} onMouseLeave={() => handleItemHover(null)}>
                <ListItemAvatar sx={{pl: "10px"}}>
                  <Avatar style={{ width: 100, height: 100 }}>
                    <img src={value['img']} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </Avatar>
                </ListItemAvatar>
                <Box dir='rtl' flexDirection={'column'}>
                  <Typography sx={{textAlign: 'right'}} fontWeight={'bold'} variant="subtitle1">{value['name']}</Typography>
                  <Grid container direction={"row"}>
                    <Grid item direction={"column"}>
                      <Typography variant="subtitle2" sx={{ textAlign: 'right' }}>מחיר: {(value['price'] * value['quantity']).toFixed(2)} </Typography>
                      <Typography variant="subtitle2" sx={{ textAlign: 'right' }}>כמות: {value['quantity']} {value['unit']}</Typography>
                    </Grid>
                    {hoveredItem === itemId && (
                      <Box sx={{ textAlign: 'right', }}>
                        {/* <ModalQtyButtons /> */}
                      </Box>
                    )}
                  </Grid>
                </Box>

               
                
              </ListItem>
              
            )
          })}
        </>
      )

}
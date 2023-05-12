import { Avatar, Box, ListItem, ListItemAvatar, Typography } from "@mui/material";
import { CART_ACTIONS, useCart, useCartDispatch } from '../AppContext';




export function CartProduct() {

    const cartState = useCart()
    const dispatch = useCartDispatch()

    // console.log('CartProduct', cartState.products);


    return (
        <>
          {Object.keys(cartState.products).map((key) => {
            const value = cartState.products[key];
            return (
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{ width: 100, height: 100 }}>
                    <img src={value['img']} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </Avatar>
                </ListItemAvatar>
                <Box dir='rtl' flexDirection={'column'}>
                  <Typography sx={{textAlign: 'right'}} fontWeight={'bold'} variant="subtitle1">{value['name']}</Typography>
                  <Typography variant="subtitle2">כמות: {value['quantity']} {value['unit']}</Typography>
                </Box>
              </ListItem>
            )
          })}
        </>
      )

}
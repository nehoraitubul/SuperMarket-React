import { Avatar, Box, Button, Grid, IconButton, ListItem, ListItemAvatar, Typography } from "@mui/material";
import { CART_ACTIONS, useCart, useCartDispatch } from '../AppContext';
import { useState } from "react";
import { ModalQtyButtons } from "../ProductModal/ModalQty";
import { QuantityButtons } from "../Products/QuantityButtons";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';




export function CartProduct({ isMobile, isCheckout }) {

    const cartState = useCart()
    const dispatch = useCartDispatch()

    const [hoveredItem, setHoveredItem] = useState(null);

    const handleItemHover = (itemId) => {
      setHoveredItem(itemId);
    };

    // console.log('CartProduct', cartState.products);

    const handleDeleteProduct = (itemId) => {
      dispatch({
          type: CART_ACTIONS.CART_DELETE_PRODUCT,
          productId: itemId,
      });
  };

    if(!isCheckout) {
    return (
        <>
          {Object.keys(cartState.products).map((key) => {
            const value = cartState.products[key];
            const itemId = key;
            return (
              <ListItem key={itemId} onMouseEnter={() => handleItemHover(itemId)} onMouseLeave={() => handleItemHover(null)} sx={{ minHeight: '170px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', mb: '20px'}}>
                {!isMobile ? (
                <>
                {hoveredItem === itemId && (
                  <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                    <IconButton onClick={() => handleDeleteProduct(itemId)} aria-label="delete">
                      <DeleteForeverRoundedIcon fontSize="large" />
                    </IconButton>
                  </Box>
                )}
                </>
                )
                :
                <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                  <IconButton onClick={() => handleDeleteProduct(itemId)} aria-label="delete">
                    <DeleteForeverRoundedIcon fontSize="large" />
                  </IconButton>
                </Box>
                }
                <ListItemAvatar sx={{pl: "10px"}}>
                  <Avatar style={{ width: 100, height: 110 }}>
                    <img src={value['img']} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </Avatar>
                </ListItemAvatar>
                <Box dir='rtl' flexDirection={'column'}>
                  <Typography sx={{textAlign: 'right'}} fontWeight={'bold'} variant="subtitle1">{value['name']}</Typography>
                  <Grid container direction={"column"}>
                    <Grid item direction={"column"}>
                      <Typography variant="subtitle2" sx={{ textAlign: 'right', fontSize: 18 }}>מחיר: {(value['price'] * value['quantity']).toFixed(2)} </Typography>

                      {/* Hide When Hoover Only And Is Not Mobile*/}
                      { isMobile ? (
                        null
                      )
                      :(
                      <>
                      {hoveredItem !== itemId && (
                        <Typography variant="subtitle2" sx={{ textAlign: 'right', fontSize: 18 }}>כמות: {value['quantity']} {value['unit']}</Typography>
                      )}
                      </>
                      )
                      }

                    </Grid>


                    { isMobile ? (
                         <Box sx={{textAlign: 'right',}}>
                            <QuantityButtons
                            isMobile={isMobile} 
                            product_cat_id={itemId} 
                            hovered={true}
                          />
  
                        </Box>
                      )
                    :(
                    <>
                    {hoveredItem === itemId && (
                      <Box sx={{
                        textAlign: 'right',
                    }}>
                          
                          <QuantityButtons 
                          product_cat_id={itemId} 
                          hovered={true}
                        />

                      </Box>
                    )}
                    </>
                    )
                    }

                  </Grid>
                </Box>

               
                
              </ListItem>
              
            )
          })}
        </>
      )
      }

      if(isCheckout){
        return (
          <>
          {Object.keys(cartState.products).map((key) => {
            const value = cartState.products[key];
            const itemId = key;
            return (
              <ListItem key={itemId} onMouseEnter={() => handleItemHover(itemId)} onMouseLeave={() => handleItemHover(null)} sx={{ minHeight: '170px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', mb: '5px'}}>


                <Grid container direction={"row"} alignItems="center">
                    <Grid item xs={1} direction={"row"}>
                      
                        <IconButton onClick={() => handleDeleteProduct(itemId)} aria-label="delete">
                          <DeleteForeverRoundedIcon fontSize="large" />
                        </IconButton>
                      
                    </Grid>

                    <Grid item xs={2} direction={"row"}>
                      <ListItemAvatar sx={{pl: "10px"}}>
                        <Avatar style={{ width: 100, height: 110 }}>
                          <img src={value['img']} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </Avatar>
                      </ListItemAvatar>
                    </Grid>

                    <Grid item xs={3} direction={"row"}>
                      <Typography sx={{textAlign: 'center'}} fontWeight={'bold'} variant="subtitle1">{value['name']}</Typography>
                    </Grid>
                  
                    <Grid item xs={2} direction={"row"}>
                      <Typography variant="subtitle2" sx={{ textAlign: 'center', fontSize: 18 }}>{(value['price'] * value['quantity']).toFixed(2)} </Typography>
                    </Grid>

                    <Grid item xs={3} direction={"row"}>
                      <Box sx={{textAlign: 'right',}}>
                        <QuantityButtons isMobile={isMobile} product_cat_id={itemId} hovered={true}/>
                      </Box>
                    </Grid>

                    <Grid item xs={1} direction={"row"}>

                    </Grid>
               
                </Grid>
              </ListItem>
              
            )
          })}
        </>
        )
      }

}
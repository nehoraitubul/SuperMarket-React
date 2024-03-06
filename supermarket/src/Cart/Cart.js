import { Avatar, Box, Button, IconButton, List, ListSubheader, Typography, } from '@mui/material';
import { CART_ACTIONS, useCart, useCartDispatch } from '../AppContext';
import { CartProduct } from './CartProduct';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import ProductionQuantityLimitsRoundedIcon from '@mui/icons-material/ProductionQuantityLimitsRounded';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export function Cart({ isMobile }) {

    const cartState = useCart()
    const dispatch = useCartDispatch()


    const handleDelete = () => {
        setOpen(!open);

        dispatch({
            type: CART_ACTIONS.CART_DELETE_ALL
        })

    }


    const [open, setOpen] = useState(false);

    const handleTrashClick = () => {
        setOpen(!open);
        console.log(open);
    };

    const navigate = useNavigate();

    const navigateCheckout = () => {
        navigate('/checkout');
      };


    const buttonStyle = {
            minHeight: '70px',
            minWidth: '150px',
            backgroundColor: '#4d734e',
            // borderRadius: '30px',
            color: 'white',
            fontWeight: 'bold',
            fontSize: "20px",
            '&:hover': {
            backgroundColor: '#6db36f',
            },
    }

    



    return (
        <>
        <List 
            style={{bottom: 0, width: !isMobile ? 350 : "100%", 
            maxHeight: 'calc(100vh - 120px)', overflowY: 'auto', bgcolor: 'background.paper',}} dir='rtl'
            subheader={
                <ListSubheader id="nested-list-subheader" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography fontSize={'25px'} fontWeight={'bold'}>הסל שלי</Typography>
                        <IconButton onClick={handleTrashClick} disabled={cartState.empty}>
                            <DeleteForeverRoundedIcon />
                        </IconButton>
                </ListSubheader>
            }
        >

        { !isMobile &&
        (
            open ?

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', my: 10, }}>
                    <Typography fontSize={'20px'} fontWeight={'bold'} sx={{ mb: 1 }}>האם למחוק את כל הפריטים בסל?</Typography>
                    <Typography variant="subtitle2" sx={{ mb: 2 }}>לא נוכל לשחזר את הפריטים שבחרת</Typography>
                    <Button sx={{...buttonStyle, mb: 2}} onClick={handleDelete}>כן</Button>
                    <Button sx={buttonStyle} onClick={handleTrashClick}>לא, חזרה לסל</Button>
                </Box>

            :

            (cartState.empty ?

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', my: 10, }}>
                    <ProductionQuantityLimitsRoundedIcon sx={{fontSize: "80px"}}/>
                    <Typography fontSize={'20px'} fontWeight={'bold'} sx={{ mb: 1 }}>עגלת הקניות שלך ריקה</Typography>
                    <Typography variant="subtitle2" sx={{ mb: 2 }}>התחבר בשביל להמשיך את הקנייה שלך!</Typography>
                </Box>

                :
                
                <Box>
                    <CartProduct />

                    <Box sx={{ position: "fixed", backgroundColor: '#4caf50', bottom: 0, width: "100%", display: "flex", alignItems: "center", gap: 6, }}>
                        <Button sx={{...buttonStyle, textDecoration: 'none'}} variant="contained" color="primary" onClick={navigateCheckout}>לתשלום</Button>
                        <Typography fontSize={'23px'} fontWeight={'bold'} variant="subtitle1" color="white">₪{cartState.totalPrice}</Typography>
                    </Box>
                </Box>
                
            )
        )
        }

        { isMobile &&


        (cartState.empty ?

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', my: 10, }}>
                <ProductionQuantityLimitsRoundedIcon sx={{fontSize: "80px"}}/>
                <Typography fontSize={'20px'} fontWeight={'bold'} sx={{ mb: 1 }}>עגלת הקניות שלך ריקה</Typography>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>התחבר בשביל להמשיך את הקנייה שלך!</Typography>
            </Box>

            :
            
            <Box>
                <CartProduct isMobile={isMobile}/>
                {open && (
                    <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick = {handleTrashClick}
                >
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                            padding: '20px',
                            textAlign: 'center',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        
                        <Typography fontSize={'20px'} fontWeight={'bold'} sx={{ mb: 1 }}>
                            האם למחוק את כל הפריטים בסל?
                        </Typography>
                        <Typography variant="subtitle2" sx={{ mb: 2 }}>
                            לא נוכל לשחזר את הפריטים שבחרת
                        </Typography>
                        <Button sx={{...buttonStyle, ml: "5px", minWidth: "125px", fontSize: "17px"}} onClick={handleDelete}>
                            כן
                        </Button>
                        <Button sx={{...buttonStyle, minWidth: "125px", fontSize: "17px"}} onClick={handleTrashClick}>לא, חזרה לסל</Button>
                    </Box>
                </Box>
                )}
                <Box sx={{ position: "fixed", backgroundColor: '#4caf50', bottom: 0, width: "100%", display: "flex", alignItems: "center", gap: 6, }}>
                    <Button sx={{...buttonStyle, }} variant="contained" color="primary">לתשלום</Button>
                    <Typography fontSize={'23px'} fontWeight={'bold'} variant="subtitle1" color="white">₪{cartState.totalPrice}</Typography>
                </Box>
            </Box>
            
        )

        }

        </List>
        </>
    )
}

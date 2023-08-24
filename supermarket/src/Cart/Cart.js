import { Avatar, Box, Button, IconButton, List, ListSubheader, Typography, } from '@mui/material';
import { CART_ACTIONS, useCart, useCartDispatch } from '../AppContext';
import { CartProduct } from './CartProduct';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import ProductionQuantityLimitsRoundedIcon from '@mui/icons-material/ProductionQuantityLimitsRounded';
import { useState } from 'react';


export function Cart() {

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
            style={{bottom: 0, width: '100%', width: 350,
            maxHeight: 'calc(100vh - 259px)', overflowY: 'auto', bgcolor: 'background.paper',}} dir='rtl'
            subheader={
                <ListSubheader id="nested-list-subheader" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography fontSize={'25px'} fontWeight={'bold'}>הסל שלי</Typography>
                        <IconButton onClick={handleTrashClick} disabled={cartState.empty}>
                            <DeleteForeverRoundedIcon />
                        </IconButton>
                </ListSubheader>
            }
        >

        { open ?

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', my: 10, }}>
                <Typography fontSize={'20px'} fontWeight={'bold'} sx={{ mb: 1 }}>האם למחוק את כל הפריטים בסל?</Typography>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>לא נוכל לשחזר את הפריטים שבחרת</Typography>
                <Button sx={buttonStyle} onClick={handleDelete}>כן</Button>
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

                    <Box sx={{ position: "fixed", backgroundColor: '#4caf50', bottom: 0, width: "100%", display: "flex", alignItems: "center", gap: 4}}>
                        <Button sx={{...buttonStyle, }} variant="contained" color="primary">לתשלום</Button>
                        <Typography fontSize={'20px'} fontWeight={'bold'} variant="subtitle1" color="white"> ₪105.89</Typography>
                    </Box>
                </Box>
                
            )

        }

        </List>
        </>
    )
}

import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Typography } from '@mui/material';
import { CART_ACTIONS, useCart, useCartDispatch } from '../AppContext';
import ImageIcon from '@mui/icons-material/Image';
import { CartProduct } from './CartProduct';



export function Cart() {

    const cartState = useCart()
    const dispatch = useCartDispatch()


    return (
        <>
        <List  style={{bottom: 0, width: '100%', minWidth: 350,
                maxHeight: 'calc(100vh - 222px)', overflowY: 'auto', bgcolor: 'background.paper',}}
            dir='rtl'
            subheader={
                <ListSubheader id="nested-list-subheader">
                    <Typography fontSize={'25px'} fontWeight={'bold'}>הסל שלי</Typography>
                </ListSubheader>
            }
        >
        {cartState.empty ?
        <p>EMPTY</p>
        :
        
        <CartProduct />
        
        }
        </List>
        </>
    )
}

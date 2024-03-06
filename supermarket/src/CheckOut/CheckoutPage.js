import { AppBar, Box, Button, Divider, Grid, List, ListSubheader, Typography } from "@mui/material";
import { useCart, useCartDispatch } from "../AppContext";
import { CartProduct } from "../Cart/CartProduct";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";



export function CheckoutPage({ isMobile }) {

    const cartState = useCart()
    const dispatch = useCartDispatch()

    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/');
      };



    return(
        <>
            <AppBar sx={{ bgcolor: '#f1f1f1', color: 'text.primary', boxShadow: 'none', flexDirection: 'row', height: 150 }}>
            
                <Button disableRipple sx={{ ml: '100px', mt: '50px', textDecoration: 'none', color: '#616262', '&:hover': {backgroundColor: '#dadada'}, height: 50,}}
                onClick={navigateHome}>
                    <ArrowBackIosIcon />
                    <Typography variant="h6" sx={{ textAlign: 'center', fontSize: '22px', mb: '2px' }}>
                        המשך בקניות
                    </Typography>
                </Button>
            
                <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
                    Your Site Name
                </Typography>
                    
            </AppBar>

            <Grid container direction={"row"}>
                <Grid item sm={6}>
                    <List 
                        style={{top: 200, width: "100%", left: 50,
                        maxHeight: 'calc(100vh - 400px)', overflowY: 'auto', bgcolor: 'background.paper',  scrollbarWidth: 'none', }} dir='rtl'
                        subheader={
                            <ListSubheader id="nested-list-subheader" sx={{ display: 'block', bgcolor: '#f8f8f8', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Grid container direction={"row-reverse"} alignItems="center">
                                    <Grid item xs={1} direction={"row"} >
                                    
                                    </Grid>
                                    <Grid item xs={3} direction={"row"} >
                                        <Typography sx={{textAlign: 'center'}} fontSize={'20px'} fontWeight={'bold'}>כמות</Typography>
                                    </Grid>
                                    <Grid item xs={2} direction={"row"}>
                                        <Typography sx={{textAlign: 'center'}} fontSize={'20px'} fontWeight={'bold'}>מחיר</Typography>
                                    </Grid>
                                    <Grid item xs={3} direction={"row"}>
                                        <Typography sx={{textAlign: 'center'}} fontSize={'20px'} fontWeight={'bold'}>שם מוצר</Typography>
                                    </Grid>
                                </Grid>

                                <Divider sx={{ height: '3px', width: '100%', background:'#fbfbfb' }} />
                                
                            </ListSubheader>
                        }
                    >
                    

                        <Box>
                            <CartProduct isCheckout={true}/>
                        </Box>


                    </List>
                </Grid>

                <Grid item sm={6}>
                    <Box sx={{ backgroundColor: '#a22525', mt: '200px', mr: '50px',
                        maxHeight: 'calc(100vh - 400px)', overflowY: 'auto', bgcolor: 'background.paper',  scrollbarWidth: 'none', }} dir='rtl'>
                            <Typography sx={{textAlign: 'center'}} fontSize={'20px'} fontWeight={'bold'}>sdfdsfdsfsdfsdfsdfsdf</Typography>
                    </Box>
                </Grid>
               
            </Grid>
        </>
    )
}
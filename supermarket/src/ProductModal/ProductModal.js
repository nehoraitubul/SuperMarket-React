import { Backdrop, Box, Button, Fade, Grid, Modal, Typography, createTheme, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { PRODUCT_DETAILS } from "../URLS"
import axios from "axios"
import { ModalBuyButton } from "./ModalBuyButton";
import { CART_ACTIONS, useCart, useCartDispatch } from '../AppContext';


const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

const styles = (theme) => ({
    position: 'absolute', 
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 2,
    p: 4,
    flexDirection: 'column',
    minWidth: '60%', 
    minHeight: '80%',

})


export function ProductModal(props){

    const theme = useTheme();

    const cartState = useCart()
    const dispatch = useCartDispatch()
    
    
    const size_dic = {
        'g': 'גרם',
        'units': "יח'",
        'ml': 'מ"ל',
        'kg': "קילו",
        'l': 'ליטר',
        'm': 'מטר'
    }

    const size_cart = {
        'g': "יח'",
        'units': "יח'",
        'ml': "יח'",
        'kg': "קילו",
        'l': "יח'",
        'm': 'מטר'
    }


    const [data, setData] = useState(null);
    console.log("data", data);

    console.log('ProductModal', props.catalog_number);
    
    const getDetails = async () => {
        const response = await axios.get(`${PRODUCT_DETAILS}${props.catalog_number}`)
        // console.log("response", response);
        if(response.status === 200){
            setData(response.data)

        } else {

        }
    };

    useEffect(() => {
        getDetails()
    }, []);


    return (
        <>
        <div>
            {data &&
               
                <Box sx={styles}>

                    <Grid container spacing={2} justifyContent="space-between"> 
                        <Grid item xs={7} sx={{pr: 3, }}>
                            <Box dir='rtl'>
                                <Typography variant="button">{data.manufacturer_id.name}</Typography>
                                <Typography variant="h6">{data.name}</Typography>
                                <Typography fontWeight="bold" variant="h6" sx={{pt: 6, fontSize: 30}}>₪{data.price.price}</Typography>
                                <Typography variant="button" sx={{fontSize: 15}}>
                                    ₪{data.unit_of_measure_price} / {data.unit_of_measure} {size_dic[data.units]}
                                </Typography>

                                <div style={{paddingTop: '35px'}}>
                                <ModalBuyButton curr_quantity={cartState.products[data.catalog_number]}
                                                product_unit={size_cart[data.units]} product_cat_id={data.catalog_number}
                                                product_img={data.image} product_name={data.name}
                                />    
                                </div>

                            </Box>
                        </Grid>

                        <Grid item xs={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box>
                                <img src={data.image} style={{  maxWidth: '100%',
            maxHeight: '100%',
            width: '360px',
            height: '360px',
            objectFit: 'contain', backgroundColor: '#fafafa'}} />
                            </Box>
                        </Grid>
                    </Grid>
                    
                </Box>
        }

        </div>
        </>
    )
}
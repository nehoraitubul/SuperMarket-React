import axios from "axios"
import { useEffect, useState } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom'
import { SEARCH_CATEGORIES } from '../URLS';
import { Backdrop, Box, Button, Card, CardActions, CardContent, CardMedia, Fade, Grid, Modal, Typography } from "@mui/material";
import { BuyButton } from "./BuyButton";
import styled from "@emotion/styled";
import { ProductModal } from "../ProductModal/ProductModal";



export function ProductCard() {

    const urlParams = useParams()

    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    // const [pervProducts, setPervProducts] = useState([]);

    const location = useLocation()
    const {data}  = location.state
    const category_type = Object.keys(data)[0]
    const category_id = Object.values(data)[0]

    const params = {
        'page': page,
        [category_type]: category_id
    }

    const getCategories = async () => {
        const response = await axios.get(SEARCH_CATEGORIES, {params})
        if(response.status === 200){
            const allCategories = response.data
            // console.log('allCategories ', allCategories.results);
            // setProducts((prevProducts) => [...prevProducts, ...allCategories.results]);\
            setProducts(allCategories.results)
        }
    };


    useEffect(() => {
        setProducts([])
        setPage(1)
        getCategories()
    }, [urlParams]);

    // const loadMoreProducts = () => {
    //     setPage((prevPage) => prevPage + 1);
    // };


    // useEffect(() => {
    // const handleScroll = () => {
    //     const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    //     if (scrollTop + clientHeight >= scrollHeight - 20) { // Adjust the threshold value as needed
    //         loadMoreProducts();
    //     }
    // };

    // window.addEventListener('scroll', handleScroll);

    // return () => {
    //     window.removeEventListener('scroll', handleScroll);
    // };
    // }, []);

    // console.log('products state: ', products.length);

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

    const CardContentNoPadding = styled(CardContent)(`
        padding: 8px;
        &:last-child {
            padding-bottom: 0;
        }
    `);

    //  {products.length > 0 &&
    //     products.map((product) => {console.log(product)} )}


    const [hovered, setHovered] = useState(false);

    const handleHover = (productCatalogNumber) => {
        setHovered(productCatalogNumber);
      };
    
      const handleMouseLeave = () => {
        setHovered(null);
      };

    const [open, setOpen] = useState(false);
    const [curr_product, setCurr_product] = useState('');

    const handleClick = (catalog_num) => {
        setOpen(!open);
        setCurr_product(catalog_num)
        console.log(open);
    }



    return (
        <>
        <Box sx={{ mr: '150px', ml: '350px'}}>  {/*  ml: '350px'  */}
        <Grid container direction="row" alignItems="flex-start" justifyContent="flex-end">
        {products.length > 0 &&
            products.map((product) => 
                
                <Card key={product.catalog_number}
                sx={{ width: 250, height: 420, ml: '20px', mb: '10px', 
                position: 'relative', transition: "box-shadow 0.3s",
                "&:hover": {boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.4)", cursor: "pointer", "& button": {display: "block"}}, 
                "& button": {display: "none", width: "100%"}}} 
                onMouseEnter={() => handleHover(product.catalog_number)} onMouseLeave={handleMouseLeave}>
                    {/* <Link to='/' style={{ color: 'inherit', textDecoration: 'none'}} > */}
                    <div onClick={() => handleClick(product.catalog_number)}>
                    <CardMedia
                        component="img"
                        width= '190px' height= '190px' 
                        image={product.image}
                        sx={{ objectFit: "contain", backgroundColor: '#fafafa'}}
                    />
                    
                    <CardContentNoPadding>
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography variant="button">
                            {product.quantity} {size_dic[product.units]}
                        </Typography>

                        <Typography fontWeight="bold" variant="subtitle2">
                            {product.name}
                        </Typography>
                    
                        <Typography variant="button" sx = {{ pb: '25px'}}>
                            {product.more_info.manu_info.name}
                        </Typography>

                        <Typography fontWeight="bold" variant="h6">
                            ₪{product.more_info.price_info}
                        </Typography>

                        <Typography variant="button">
                            ₪{product.more_info.unit_of_measure_price} / {product.more_info.unit_of_measure} {size_dic[product.more_info.units]}
                        </Typography>
                        </Box>

                    </CardContentNoPadding>
                    </div>
                    {/* </Link> */}

                    <CardContent sx={{display: "flex", p: '0px'}}>
                        <CardActions>
                            <Box sx={{position: 'absolute', bottom: '5px', left: '5px', right: '5px'}}>
                                <BuyButton hovered={hovered === product.catalog_number} product_img={product.image} product_name={product.name}
                                            product_cat_id={product.catalog_number} key={product.catalog_number}
                                            product_unit={size_cart[product.units]} product_price={product.more_info.price_info}/>
                            </Box>
                        </CardActions>
                        
                    </CardContent>
                    


                </Card>
                
            )
            // {product.unit_of_measure} {size_dic[product.units]}
        }
        </Grid>
        {open == true &&
                     <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClick}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                        backdrop: {
                        timeout: 500,
                     },
                     }}>
                        <ProductModal catalog_number={curr_product}/>
                    </Modal>}
        </Box>
       
        </>
    )
}
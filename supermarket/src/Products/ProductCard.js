import axios from "axios"
import { useEffect, useState } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom'
import { MAIN_PAGE_PRODUCTS, SEARCH_CATEGORIES } from '../URLS';
import { Backdrop, Box, Button, Card, createTheme, useMediaQuery, CardActions, CardContent, CardMedia, Fade, Grid, Modal, Typography, Paper } from "@mui/material";
import { BuyButton } from "./BuyButton";
import styled from "@emotion/styled";
import { ProductModal } from "../ProductModal/ProductModal";



export function ProductCard() {

    const theme = createTheme({
        breakpoints: {
            values: {
                lg: 1024,
            },
        },
    });
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

    const urlParams = useParams()

    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    // const [pervProducts, setPervProducts] = useState([]);

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const category_type = queryParams.get('sc');
    const category_id = queryParams.get('category_id');
    // console.log('category_id = ', category_id);
    // console.log('category_type = ', category_type);
    // const {data}  = location.state || {}
    // const category_type = data ? Object.keys(data)[0] : '';
    // const category_id = data ? Object.values(data)[0] : '';

    const params = {
        'page': page,
        [category_type]: category_id
    }

    const getCategories = async () => {
        const isMainPage = location.pathname === '/';
        if (!isMainPage) {
        // console.log("getCategories axios");
        // console.log('location: ', location.state);
        const response = await axios.get(SEARCH_CATEGORIES, {params})
        if(response.status === 200){
            const allCategories = response.data
            // console.log('allCategories getCategories axios ', allCategories);
            // setProducts((prevProducts) => [...prevProducts, ...allCategories.results]);\
            setProducts(allCategories.results)
        }
        }
    };


    useEffect(() => {
        setProducts([])
        setPage(1)
        getCategories()
    }, [urlParams]);


    useEffect(() => {
        // Check if the current URL is the main page (e.g., '/')
        const isMainPage = location.pathname === '/';
        // console.log("inside location.pathname");
    
        if (isMainPage) {
          // Fetch different products for the main page
          const fetchMainProducts = async () => {
            const response = await axios.get(MAIN_PAGE_PRODUCTS);
            if (response.status === 200) {
              const mainPageProducts = response.data;
            //   console.log('mainPageProducts ', mainPageProducts);
              setProducts([]);
              setProducts(mainPageProducts);
            }
          };
    
          fetchMainProducts();
        }
      }, []);


    


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

    // {products.length > 0 &&
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

    let newPrice = null;
    const promoDetails = (p) => {
        if (p.promo_details && p.promo_details.length > 0 && p.promo_details[0].reward_type === 10) {
            newPrice = p.promo_details[0].discounted_price;
            let minQty = p.promo_details[0].min_qty.split('.')[0];
            let q;
            let boldNewPrice
            if (p.promo_details[0].max_qty !== null) {
                let maxQty = p.promo_details[0].max_qty.split('.')[0];
                q = 'קנה ' + minQty + ' יחידות, מוגבל עד ' + maxQty + 'יחידות';
            } else {
                boldNewPrice = <Typography fontWeight="bold">{newPrice}</Typography>;
                console.log(boldNewPrice);
                q = `קנה ${minQty} יחידות ב-`;
            }
            return q;
        }
        return null;
    }


    if(!isMobile){
    return (
        <>
        <Box sx={{ 
            mr: '20px', 
            ml: '370px',
            mt: '20px',
        }}>
        <Grid container direction="row" alignItems="flex-start" justifyContent="flex-end" sx={{gap: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
        {products.length > 0 &&
            products.map((product) => 
                
                <Card key={product.catalog_number}
                sx={{ width: '100%', height: '500px', ml: '20px', mb: '10px', 
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

                    {/* {console.log(product)} */}
                    
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

                        {product.promo_details.length > 0 && (
                                <Paper elevation={3} sx={{bgcolor: '#C8E6C9', ml: '10px', mr: '10px', mt: '10px', pr: '4px' }}>

                                    <Typography variant="subtitle1" fontWeight="bold">
                                        2 בהנחה |  בתוקף עד 25/03/24
                                    </Typography>

                                    <Typography variant="body1">
                                        {promoDetails(product)}
                                        {' '}
                                        {newPrice !== null && (
                                            <Typography variant="body1" component="span" fontWeight="bold">
                                                {newPrice}
                                            </Typography>
                                        )}
                                    </Typography>
                                    
                                </Paper>
                        )}

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


    if(isMobile){
    return (
        <>
        <Box sx={{ 
            mr: 0, 
            ml: 0,
            mt: '20px'
        }}>
        <Grid container direction="row" alignItems="flex-start" justifyContent="flex-end" sx={{gap: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
        {products.length > 0 &&
            products.map((product) => 
                <Card key={product.catalog_number}
                    sx={{ width: '100%', height: 420, ml: '20px', mb: '10px', 
                    position: 'relative', transition: "box-shadow 0.3s",
                    "&:hover": {boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.4)", cursor: "pointer"} }}>
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
                    <CardContent sx={{display: "flex", p: '0px'}}>
                        <CardActions>
                            <Box sx={{position: 'absolute', bottom: '5px', left: '5px', right: '5px'}}>
                                <BuyButton 
                                    product_img={product.image} 
                                    product_name={product.name}
                                    product_cat_id={product.catalog_number} 
                                    product_unit={size_cart[product.units]} 
                                    product_price={product.more_info.price_info}
                                    isMobile={isMobile}
                                />
                            </Box>
                        </CardActions>
                    </CardContent>
                </Card>
            )}
        </Grid>
        </Box>
        </>
    )
        }
}
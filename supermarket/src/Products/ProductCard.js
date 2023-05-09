import axios from "axios"
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom'
import { SEARCH_CATEGORIES } from '../URLS';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import image from '../images-all/10181040009.jpg'
import { BuyButton } from "./BuyButton";
import styled from "@emotion/styled";



export function ProductCard() {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);

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
            console.log('allCategories ', allCategories.results);
            setProducts(allCategories.results)
        }
    };


    useEffect(() => {
        getCategories()
    }, []);

    // console.log('products state: ', products.length);

    const size_dic = {
        'g': 'גרם',
        'units': 'יחידה',
        'ml': 'מ"ל',
        'kg': "קילו",
        'l': 'ליטר',
        'm': 'מטר'
    }

    const CardContentNoPadding = styled(CardContent)(`
        padding: 8px;
        &:last-child {
            padding-bottom: 0;
        }
    `);


    return (
        <>
        <Box sx={{ml:'300px', mr: '150px'}}>
        <Grid container direction="row" alignItems="flex-start" justifyContent="flex-end">
        {products.length > 0 &&
            products.map((product) => 
                
                <Card key={product.name} 
                sx={{ minWidth: 250, maxWidth: 450, maxHeight: 450, ml: '20px', mb: '10px', 
                position: 'relative', transition: "box-shadow 0.3s",
                "&:hover": {boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.4)", cursor: "pointer", "& button": {display: "block"}}, 
                "& button": {display: "none", width: "100%"}}}>
                    <Link to='/' style={{ color: 'inherit', textDecoration: 'none'}} >
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
                            ₪{product.unit_of_measure_price} / {product.unit_of_measure} {size_dic[product.units]}
                        </Typography>
                        </Box>

                    </CardContentNoPadding>
                    </Link>

                    <CardContent sx = {{display: "flex", p: '0px'}}>
                        <CardActions>
                            <Box sx={{position: 'absolute', bottom: '5px', left: '5px', right: '5px'}}>
                                <BuyButton product_cat_id={product.catalog_number} key={product.name}/>
                            </Box>
                        </CardActions>
                        
                    </CardContent>

                </Card>
                
            )
            // {product.unit_of_measure} {size_dic[product.units]}
        }
        </Grid>
        </Box>
        </>
    )
}
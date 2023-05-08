import axios from "axios"
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { SEARCH_CATEGORIES } from '../URLS';
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";



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


    return (
        <>
        <Grid container direction="row" alignItems="flex-start" justifyContent="flex-end">
        {products.length > 0 &&
            products.map((product) => 
                <Card key={product.name} sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="80"
                        image="C:\SuperMarker-Project\images-all\10181040009.jpg"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.name}
                        </Typography>
                    </CardContent>

                </Card>
            )
            
        }
        </Grid>
        </>
    )
}
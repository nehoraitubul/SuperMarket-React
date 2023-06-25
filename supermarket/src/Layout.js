import axios from "axios"
import "./Layout.css"
import { AppBar, Toolbar, Box, Container, Fab, Badge, Stack, useTheme, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { SearchDropDown } from './Menu/SearchDropDown';
import { Link, Outlet } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CategoryBar } from './Menu/CategoryBar';
import { CATEGORIES } from "./URLS"
import { CATEGORIES_ACTIONS, useCategories, useCategoriesDispatch } from "./AppContext";
import { Cart } from "./Cart/Cart";

export function Layout(){

    const theme = useTheme();
    const onlyBiglScreen = useMediaQuery(theme.breakpoints.up("lg"));
    const onlyMediumSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));


    const categoriesState = useCategories()
    const dispatch = useCategoriesDispatch()


    const getCategories = async () => {
        dispatch({type: CATEGORIES_ACTIONS.CATEGORIES_FETCH_START})
        const response = await axios.get(CATEGORIES)
        if(response.status === 200){
            const allCategories = response.data
            console.log("allCategories", allCategories);
            dispatch({
				type: CATEGORIES_ACTIONS.CATEGORIES_FETCH_SUCCESS,
				dataRecieved: allCategories
			})
        } else {
            dispatch({ type: CATEGORIES_ACTIONS.CATEGORIES_FETCH_ERROR, msg: response.statusText})
        }
    };

    useEffect(() => {
        getCategories()
    }, []);


  

    return(
        <>
        <Box> 
            <Box style={{ position: 'sticky', top: 0, zIndex: 1 }}>
            {categoriesState.categories!==null &&
            console.log("Categories:", categoriesState.categories[2])}
            <AppBar position="static" sx={{ backgroundColor: '#f3f3f3', color: '#555', pt: '9px', pb: '9px'}} elevation={0}>
                <Container maxWidth="lg" >
                    <Toolbar disableGutters>

                        <Badge badgeContent={99} color="primary">
                        <Fab sx={{":hover": {bgcolor: "#f1f1f1"}, boxShadow: 0}} disableRipple variant="extended" aria-label="add">
                            <ShoppingCartIcon sx={{ mr: 1 }} />
                            עגלת קניות
                        </Fab>
                        </Badge>

                        <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, justifyContent: 'center'}}>
                            <SearchDropDown />
                        </Box>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'center'}}>
                            <SearchDropDown />
                        </Box>

                        <Box sx={{ display: { xs: 'none', md: 'flex' }}}>
                            <Link color='textPrimary' style={{ color: 'inherit', textDecoration: 'inherit'}} href=""> היתחבר/הירשם </Link>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' }}}>
                            <Link color='textPrimary' style={{ color: 'inherit', textDecoration: 'inherit'}} href=""> היתחבר/הירשם </Link>
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>

            {/* Desktop Display */}
            <AppBar position="static" sx={{backgroundColor: '#f3f3f3', color: '#555', maxWidth: "100%", display: 'flex'}} elevation={0}>
            <div style={{ minHeight: "80px", paddingBottom: '10px', display: 'flex' ,flexGrow: 1, justifyContent: 'center'}} >
                 <Stack direction="row" spacing={1}>
                    <CategoryBar />
                </Stack>
                
            </div>
            </AppBar>


            {/* <AppBar position="static" sx={{backgroundColor: '#f3f3f3', color: '#555', maxWidth: "100%", display:  onlyBiglScreen ? 'flex' : 'none' }} elevation={0}>
            <div style={{ minHeight: "80px", paddingBottom: '10px', display: 'flex' ,flexGrow: 1, justifyContent: 'center'}} >
                 <Stack direction="row" spacing={1}>
                    <CategoryBar />
                </Stack>
                
            </div>
            </AppBar> */}

            {/* Desktop Display */}
            {/* <AppBar position="static" sx={{ backgroundColor: '#f3f3f3', color: '#555', pr: '60px', pl: '60px', display: { xs: 'none', md: 'flex' }}} elevation={0}>
            <div style={{ minHeight: "80px", paddingBottom: '10px'}} ref={scrollRef} className="container"
                id="container" onWheel={onWheel}>
                <Stack direction="row" spacing={2}>
                    <CategoryBar />
                </Stack>
            </div>
            </AppBar> */}

            {/* Phone Display */}
            {/* <AppBar position="static" sx={{backgroundColor: '#f3f3f3', color: '#555', display:  onlyMediumSmallScreen ? 'flex' : 'none'}} elevation={0}>
            <div style={{ minHeight: "80px", paddingBottom: '10px'}} ref={scrollRef} className="container"
                id="container" onTouchMove={onWheel} onWheel={onWheel}>
                <Stack direction="row" spacing={2}>
                    <CategoryBar />
                </Stack>
            </div>
            </AppBar> */}

        

            
        </Box>

        <Box display="flex" flexDirection="row" alignItems="flex-start">
            
            <Box style={{position: 'fixed'}}>
                <Cart />
            </Box>
            
        </Box>

        <div dir='rtl'>
     
        {/* ALL PRODUCTS */}
        <Outlet />


        </div>

        </Box>

        </>
    )
}
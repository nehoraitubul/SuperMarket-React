import axios from "axios"
import "./Layout.css"
import { AppBar, Toolbar, Box, Container, Fab, Badge, Stack, useTheme, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { SearchDropDown } from './Menu/SearchDropDown';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CategoryBar } from './Menu/CategoryBar';
import { CATEGORIES, MAIN_PAGE_PRODUCTS, ME } from "./URLS"
import { CATEGORIES_ACTIONS, useCategories, useCategoriesDispatch } from "./AppContext";
import { Cart } from "./Cart/Cart";
import Cookies from 'js-cookie';

export function Layout(){

    const theme = useTheme();
    const onlyBiglScreen = useMediaQuery(theme.breakpoints.up("lg"));
    const onlyMediumSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

    const [isLogIn, setIsLogIn] = useState(false);
    const [name, setName] = useState("g");


    const categoriesState = useCategories()
    const dispatch = useCategoriesDispatch()

    const location = useLocation();

    const isMainPage = location.pathname === '/';


    const getCategories = async () => {
        dispatch({type: CATEGORIES_ACTIONS.CATEGORIES_FETCH_START})
        const response = await axios.get(CATEGORIES)
        if(response.status === 200){
            const allCategories = response.data
            // console.log("allCategories", allCategories);
            dispatch({
				type: CATEGORIES_ACTIONS.CATEGORIES_FETCH_SUCCESS,
				dataRecieved: allCategories
			})
        } else {
            dispatch({ type: CATEGORIES_ACTIONS.CATEGORIES_FETCH_ERROR, msg: response.statusText})
        }
    };

    const checkLogIn = async () => {
        if(Cookies.get('accsses') !== 'undefined'){
            const token = Cookies.get('access');
            console.log(token);
            const config = {
                headers: {Authorization: `Bearer ${token}`},
            };
            try {
                const response = await axios.get(`${ME}`, config)
                if(response.status === 200){
                    setIsLogIn(true)
                    setName(`${response.data['first_name']} ${response.data['last_name']}`)
                    console.log(`${response.data['first_name']} ${response.data['last_name']}`);
                } 
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.log(error, "NOT TRUE!");
                }
            };
        }

    }

    useEffect(() => {
        getCategories()
        checkLogIn()
    }, []);



    // const getMainProducts = async () => {
        
    //     const response = await axios.get(MAIN_PAGE_PRODUCTS)
    //     if(response.status === 200){
    //         const allProducts = response.data
    //         console.log("allMainRandomProducts", allProducts);
    //     } else {
    //         console.log("allMainRandomProducts", "error");
    //     }
    // };

    // useEffect(() => {  
    //     getMainProducts()
    // }, []);


  

    return(
        <>
        <Box> 
            <Box style={{ position: 'sticky', top: 0, zIndex: 1 }}>
            {/* {categoriesState.categories!==null &&
            console.log("Categories:", categoriesState.categories[2])} */}
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

                        {isLogIn == false ?
                            <>
                            <Box sx={{ display: { xs: 'none', md: 'flex' }}}>
                                <NavLink color='textPrimary' style={{ color: 'inherit', textDecoration: 'inherit'}} to="login/"> היתחבר/הירשם </NavLink>
                            </Box>
                            <Box sx={{ display: { xs: 'flex', md: 'none' }}}>
                                <NavLink color='textPrimary' style={{ color: 'inherit', textDecoration: 'inherit'}} to="login/"> היתחבר/הירשם </NavLink>
                            </Box>
                            </>
                            :
                            <Box sx={{ display: { xs: 'none', md: 'flex' }}} dir="rtl">
                                <NavLink color='textPrimary' style={{ color: 'inherit', textDecoration: 'inherit'}} to="login/"> שלום {name} </NavLink>
                            </Box>
                        }

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
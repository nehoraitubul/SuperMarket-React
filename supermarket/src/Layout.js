import axios from "axios"
import "./Layout.css"
import { AppBar, Toolbar, Box, Container, Fab, Badge, Stack, useTheme, useMediaQuery, createTheme, Slide, Button, IconButton, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { SearchDropDown } from './Menu/SearchDropDown';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { CategoryBar } from './Menu/CategoryBar';
import { CATEGORIES, MAIN_PAGE_PRODUCTS, ME } from "./URLS"
import { CATEGORIES_ACTIONS, useCategories, useCategoriesDispatch } from "./AppContext";
import { Cart } from "./Cart/Cart";
import Cookies from 'js-cookie';

export function Layout(){

    const theme = createTheme({
        breakpoints: {
            values: {
                lg: 1024,
            },
        },
    });
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const [isCategoryMenuOpen, setCategoryMenuOpen] = useState(false);

    const toggleCategoryMenu = () => {
        setCategoryMenuOpen((prev) => !prev);
    };

    function closeSliders() {
        setCategoryMenuOpen(false);
      }



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
            <AppBar position="static" sx={{ backgroundColor: '#f3f3f3', color: '#555', pt: '9px', pb: '9px',  height: '82px'}} elevation={0} alignItems="center">
                <Container maxWidth="100%" >
                    <Toolbar disableGutters>
                        <Grid container spacing={13} >
                        <Grid item xs={2}>
                        {isMobile && (
                            
                            <Box style={{position: 'fixed'}}>
                                <Button variant="contained" color="primary" onClick={toggleCart}>
                                    <ShoppingCartIcon />
                                </Button>

                                <Slide direction="right" in={isCartOpen} mountOnEnter unmountOnExit>
                                <Box style={{ position: 'fixed', top: "82px", left: 0, width: '100%', height: '100%', zIndex: 999, backgroundColor: 'white' }}>
                                    <Cart isMobile={isMobile}/>
                                </Box>
                                </Slide>

                            </Box>
                            
                        )}
                        </Grid>
                        

                        <Grid item xs={8}>
                        <Box sx={{ flexGrow: 1, justifyContent: 'center'}}>
                            <SearchDropDown isMobile={isMobile}/>
                        </Box>
                        </Grid>

                        {/* <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'center'}}>
                            <SearchDropDown />
                        </Box> */}

                        {!isMobile && (

                        <Grid item xs={2} display={"flex"} justifyContent="flex-end" direction="row">
                        {isLogIn == false ?
                            <>
                            <Box sx={{ display: 'flex' }}>
                                <NavLink color='textPrimary' style={{ color: 'inherit', textDecoration: 'inherit', fontSize: '20px', marginTop: '10px'}} to="login/"> היתחבר/הירשם </NavLink>
                            </Box>
                            </>
                            :
                            <Box sx={{ display: { xs: 'none', md: 'flex' }}} dir="rtl">
                                <NavLink color='textPrimary' style={{ color: 'inherit', textDecoration: 'inherit'}} to="login/"> שלום {name} </NavLink>
                            </Box>
                        }
                        </Grid>
                        )}
                        
                        
                        {isMobile && (
                            <Grid item xs={2}>

                                <IconButton color="inherit" onClick={toggleCategoryMenu} style={{ position: 'fixed', top: 20, right: 0 }}>
                                    {isCategoryMenuOpen ? <CloseIcon sx={{ fontSize: '30px' }} /> : <MenuIcon sx={{ fontSize: '30px' }} />}
                                </IconButton>

                                <Slide direction="left" in={isCategoryMenuOpen} mountOnEnter unmountOnExit>
                                    <Box style={{position: 'fixed', top: "81px", right: 0, width: '100%', height: '100%', backgroundColor: 'white', zIndex: 999, overflowX: 'hidden'}}>     
                                        <CategoryBar isMobile={isMobile} closeSliders={closeSliders}/>
                                    </Box>
                                </Slide>

                            </Grid>
                            
                        )}
                        

                    </Grid>

                    </Toolbar>
                </Container>
            </AppBar>


            {!isMobile && (
                <AppBar position="static" sx={{backgroundColor: '#f3f3f3', color: '#555', maxWidth: "100%", display: 'flex'}} elevation={0}>
                    <div style={{ minHeight: "80px", paddingBottom: '10px', display: 'flex' ,flexGrow: 1, justifyContent: 'center'}} >
                        <Stack direction="row" spacing={1}>
                            <CategoryBar />
                        </Stack>
                    </div>
                </AppBar>
            )}


            


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

        {!isMobile && (
            <Box style={{position: 'fixed'}}>
                <Cart />
            </Box> 
        )}
            
        </Box>


        <div dir='rtl'>
     
        {/* ALL PRODUCTS */}
        <Outlet />


        </div>

        </Box>

        </>
    )
}
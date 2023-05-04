import { AppBar, Toolbar, Typography, IconButton, Grid, Box, Button, Container, Menu, MenuItem, TextField, Fab, Badge, Stack } from '@mui/material';
import { useRef, useState } from 'react';
import { SearchDropDown } from './Menu/SearchDropDown';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CategoryBar } from './Menu/CategoryBar';
import "./Layout.css"

export function Layout(){


    // const [anchorEl, setAnchorEl] = useState(null);
    // const open = Boolean(anchorEl);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    const onWheel = e => {
        e.preventDefault();
        const container = document.getElementById("container");
        const containerScrollPosition = document.getElementById("container").scrollLeft;
        container.scrollTo({
          top: 0,
          left: containerScrollPosition + e.deltaY,
          behaviour: "smooth"
        });
      };
      const scrollRef = useRef(null);

    return(
        <Box>
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
            <AppBar position="static" sx={{ backgroundColor: '#f3f3f3', color: '#555', pr: '60px', pl: '60px', display: { xs: 'none', md: 'flex' }}} elevation={0}>
            <div style={{ minHeight: "80px", paddingBottom: '10px'}} ref={scrollRef} className="container"
                id="container" onWheel={onWheel}>
                <Stack direction="row" spacing={2}>
                    <CategoryBar />
                </Stack>
            </div>
            </AppBar>

            {/* Phone Display */}
            <AppBar position="static" sx={{backgroundColor: '#f3f3f3', color: '#555', display: { xs: 'flex', md: 'none' }}} elevation={0}>
            <div style={{ minHeight: "80px", paddingBottom: '10px'}} ref={scrollRef} className="container"
                id="container" onTouchMove={onWheel} onWheel={onWheel}>
                <Stack direction="row" spacing={2}>
                    <CategoryBar />
                </Stack>
            </div>
            </AppBar>

            
            <AppBar position="static" sx={{ backgroundColor: '#f3f3f3', color: '#555'}} elevation={0}>
                <p>fd</p>
            </AppBar>
        </Box>
    )
}
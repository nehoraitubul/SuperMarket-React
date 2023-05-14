import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { PRODUCT_DETAILS } from "../URLS"
import axios from "axios"




const style = {
    position: 'absolute', 
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 2,
    p: 4,
}


export function ProductModal(props){
    
    const getDetails = async () => {
        const response = await axios.get(PRODUCT_DETAILS)
        if(response.status === 200){
            const allCategories = response.data
            console.log("allCategories", allCategories);

        } else {

        }
    };

    useEffect(() => {
        getDetails()
    }, []);


    return (
        <>
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
               
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>

        </div>
        </>
    )
}
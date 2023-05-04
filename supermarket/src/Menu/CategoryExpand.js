import { Box, Fade, Popper } from "@mui/material";
import { useEffect } from "react";




export function CategoryExpand() {

    const getCategories = async () => {
       console.log("CategoryExpand");
    };

    useEffect(() => {
        getCategories()
    }, []);


    return (
        <>
        {console.log("CategoryExpand")}
        {/* <Popper  transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
              The content of the Popper.
            </Box>
          </Fade>
        )}
      </Popper> */}
        </>
    )
}
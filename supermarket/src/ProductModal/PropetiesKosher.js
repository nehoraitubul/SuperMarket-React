import { Divider, Grid, Typography } from "@mui/material";
import { TextModal } from "./TextModal";


export function PropetiesKosher(props){

    let description = props.data.description;

    if (description) {
        description = description
          .replace(/<br\s*\/?>/g, '\n')
          .replace(/<[^>]+>/g, ' ');
      }
      


    return (
        <>
        {props.data && (

            props.data.description && (
            <>
            <Grid item sm={12} direction={'column'}>
                
                <TextModal title={'פרטים כלליים'} description={description} lineHeightDescription={2} mbDescription={2} lineHeightTitle={2.2} mbTitle={0}/>

                <Divider sx={{ color: '#fafafa',}} />

            </Grid>
            
            </>


            )
        )}



        {props.data && (
            <>
            <Grid item sm={6} direction={'row'} dir={'rtl'}>

            {props.data.kosher &&
                <TextModal title={'כשרות'} description={props.data.kosher} lineHeightDescription={1.7} mbDescription={2} lineHeightTitle={1.7} mbTitle={0}/>
            }

            {props.data.kosher_type &&
                <TextModal title={'חלבי/בשרי/פרווה'} description={props.data.kosher_type} lineHeightDescription={1.7} mbDescription={2} lineHeightTitle={1.7} mbTitle={0}/>
            }

            {props.data.foreign_milk &&
                <TextModal title={'חלב נוכרי'} description={props.data.foreign_milk} lineHeightDescription={2.2} mbDescription={2} lineHeightTitle={2.2} mbTitle={0}/>
            }

            {props.data.local_rabbinate &&
                <TextModal title={'רבנות מקומית'} description={props.data.local_rabbinate} lineHeightDescription={2.2} mbDescription={2} lineHeightTitle={2.2} mbTitle={0}/>
            }

            {props.data.passover &&
                <TextModal title={'פסח'} description={props.data.passover} lineHeightDescription={2.2} mbDescription={2} lineHeightTitle={2.2} mbTitle={0}/>
            }

            {props.data.manufacturing_country &&
                <TextModal title={'ארץ ייצור'} description={props.data.manufacturing_country} lineHeightDescription={2.2} mbDescription={2} lineHeightTitle={2.2} mbTitle={0}/>
            }

            </Grid>
            </>
        )}
        

        {props.data && (
            <>
            <Grid item sm={6} direction={'row'} dir={'rtl'}>

            {props.data.product_symbols &&
                <TextModal title={'סמל מזון'} description={props.data.product_symbols} lineHeightDescription={5} mbDescription={2} lineHeightTitle={5} mbTitle={0} photo={true}/>
            }

            {props.data.lactose_free || props.data.gluten_free || props.data.organic || props.data.no_preserv &&
                <TextModal title={'סימון בריאותי'} description={[props.data.lactose_free, props.data.gluten_free, props.data.organic, props.data.no_preserv]} lineHeightDescription={1.7} mbDescription={2} lineHeightTitle={1.7} mbTitle={0} photo={true}/>
            }

            {props.data.foreign_milk &&
                <TextModal title={'חלב נוכרי'} description={props.data.foreign_milk} lineHeightDescription={2.2} mbDescription={2} lineHeightTitle={2.2} mbTitle={0}/>
            }

            {props.data.local_rabbinate &&
                <TextModal title={'רבנות מקומית'} description={props.data.local_rabbinate} lineHeightDescription={2.2} mbDescription={2} lineHeightTitle={2.2} mbTitle={0}/>
            }

            {props.data.passover &&
                <TextModal title={'פסח'} description={props.data.passover} lineHeightDescription={2.2} mbDescription={2} lineHeightTitle={2.2} mbTitle={0}/>
            }

            {props.data.manufacturing_country &&
                <TextModal title={'ארץ ייצור'} description={props.data.manufacturing_country} lineHeightDescription={2.2} mbDescription={2} lineHeightTitle={2.2} mbTitle={0}/>
            }

            </Grid>
            </>
        )}
        </>
    )
}
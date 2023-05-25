import { Grid, Typography } from "@mui/material";


const typographyStyle = {
    fontSize: '16px',
    display: 'inline',
    lineHeight: 2.2,
    color: '#585858',
}


export function NutritionalValues(props){

    console.log('NutritionalValues', props.data);

    const nutritionalsDict = {
        'dietary_fiber': 'סיבים תזונתיים', 
        'sugars_from_carbohydrates': 'סוכרים מפחמימות',
        'energy': 'אנרגיה',
        'proteins': 'חלבונים',
        'carbohydrates': 'פחמימות',
        'fats': 'שומנים',
        'sodium': 'נתרן',
        'salt': 'מלח',
        'cholesterol': 'כולסטרול',
        'saturated_fat': 'שומן רווי',
        'trans_fatty_acids': 'חומצות שומן טראנס',
        'sugar': 'סוכר',
        'iron': 'ברזל',
        'calcium': 'סידן',

    }

    return (
        <>
        <Grid container item sm={6} direction={'column'}>
            <Typography fontSize={18} fontWeight={'bold'}>ערכים תזונתיים</Typography>
        {props.data &&   
            Object.keys(props.data).map((nutritional) => {
                if(props.data[nutritional] !== null && nutritionalsDict[nutritional]){
                    return (
                        <>
                        <div style={{display: 'flex', whiteSpace: 'nowrap'}}>
                            <Typography sx={{...typographyStyle, fontWeight: 'bold', width: '50%',}} variant="button">{nutritionalsDict[nutritional]}:</Typography>

                            <Typography sx={{ ...typographyStyle, width: '50%'}} variant="button">{props.data[nutritional]}</Typography>
                        </div>
                        </>
                    )
                }
            })     
        }

        </Grid>
        </>
    )
}
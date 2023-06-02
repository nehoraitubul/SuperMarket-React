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
          {props.data && (
            <Grid container item sm={Object.keys(props.data).some(
              (nutritional) => props.data[nutritional] !== null && nutritionalsDict[nutritional]
            ) ? 6 : 12} direction={'row'}>
              {Object.keys(props.data).some(
                (nutritional) => props.data[nutritional] !== null && nutritionalsDict[nutritional]
              ) && (
                <Grid item sm={12} direction={'column'}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography fontSize={18} fontWeight={'bold'}>
                        ערכים תזונתיים
                    </Typography>
                    <Typography>(100 גרם)</Typography>
                    </div>
                
              
      
              {Object.keys(props.data).map((nutritional) => {
                if (props.data[nutritional] !== null && nutritionalsDict[nutritional]) {
                  return (
                    <div key={nutritional} style={{ display: 'flex', whiteSpace: 'nowrap' }}>
                      <Typography
                        sx={{ ...typographyStyle, fontWeight: 'bold', width: '50%' }}
                        variant="button"
                      >
                        {nutritionalsDict[nutritional]}:
                      </Typography>
                      <Typography sx={{ ...typographyStyle, width: '50%' }} variant="button">
                        {props.data[nutritional]}
                      </Typography>
                    </div>
                  );
                }
                
              })}
              </Grid>

            )}
      
              {props.data.component && (
                 <Grid item sm={6} direction={'row'}>
                <div style={{ display: 'flex', whiteSpace: 'normal' }}>
                  <Typography sx={{ ...typographyStyle, fontWeight: 'bold', width: '50%' }} variant="button">
                    רכיבים&nbsp;
                  </Typography>
                  <Typography sx={{ ...typographyStyle, width: '50%', textOverflow: 'ellipsis' }} variant="button">
                    {props.data.component}
                  </Typography>
                </div>
                </Grid>
              )}
            </Grid>
          )}
        </>
      );
}
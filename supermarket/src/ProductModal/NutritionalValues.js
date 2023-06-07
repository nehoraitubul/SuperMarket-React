import { Divider, Grid, Typography } from "@mui/material";
import { TextModal } from "./TextModal";


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

          Object.keys(props.data).some(
            (nutritional) => props.data[nutritional] !== null && nutritionalsDict[nutritional]
          ) && (
            <>
            <Grid item sm={6} direction={'column'}>
            <div style={{ display: 'flex', alignItems: 'center' }}>

              <Typography fontSize={18} fontWeight={'bold'}>
                ערכים תזונתיים&nbsp;
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
              {/* <Divider orientation="vertical" sx={{ color: '#fafafa',}} /> */}
              </>


          )
        )}


      


        {props.data.component && (
          <>
          <Grid item sm={6} direction={'row'}>

          {props.data.allergies_properties &&
            <TextModal title={'מכיל לאלרגנים'} description={props.data.allergies_properties} lineHeightDescription={1.7} mbDescription={2} lineHeightTitle={1.7} mbTitle={0}/>
          }

          {props.data.allergies_traces &&
            <TextModal title={'עשוי להכיל לאלרגנים'} description={props.data.allergies_traces} lineHeightDescription={1.7} mbDescription={2} lineHeightTitle={1.3} mbTitle={0}/>
          }


          {props.data.component &&
            <TextModal title={'רשימת רכיבים'} description={props.data.component} lineHeightDescription={1.7} mbDescription={2} lineHeightTitle={2.2} mbTitle={0}/>
          }

          </Grid>
          </>
        )}

        </>
      );
}
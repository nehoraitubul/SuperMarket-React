import { Typography } from "@mui/material"


const typographyStyle = {
    fontSize: '16px',
    display: 'inline',
    lineHeight: 2.2,
    color: '#585858',
}

const highSugar = 'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/site_resources/general_images/321.png'
const saturatedFat = 'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/site_resources/general_images/322.png'
const highSalt = 'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/site_resources/general_images/320.png'
const greenSymbol = 'https://res.cloudinary.com/shufersal/image/upload/f_auto,q_auto/v1551800922/prod/site_resources/general_images/324.png'
const lactoseFree = 'https://dvg.co.il/wp-content/uploads/2019/01/lactuz-free-new-150x150.png'
const glutenFree = 'https://d226b0iufwcjmj.cloudfront.net/retailers/1302/resources/1593011090991-0.8524441042755821.jpg'
const organic = 'https://d226b0iufwcjmj.cloudfront.net/retailers/1302/resources/1593011077808-0.6269359395185927.jpg'

export function TextModal(props){

    const symbolDictionary = {
        '-322': saturatedFat,
        '-321': highSugar,
        '-320': highSalt,
        '-324': greenSymbol,
        '1': lactoseFree,
        '2': glutenFree,
        '3': organic,
    }

    return (
        <>
        {props.photo ? 

        <div style={{ display: 'flex', whiteSpace: 'normal' }}>
            <Typography sx={{ ...typographyStyle, fontWeight: 'bold', width: '35%', lineHeight: props.lineHeightTitle, mb: props.mbTitle }} variant="button">
                {props.title}&nbsp;
            </Typography>

            {Array.isArray(props.description) ? (
                props.description.map((showPhoto, index) => (
                    showPhoto && <img key={index} src={symbolDictionary[`${index + 1}`]} alt={`HealthSymbol ${index + 1}`} />
                ))
            ) : (
                props.description.split('-').map((number) => {
                    const imageUrl = symbolDictionary[`-${number}`];
            
                        return <img key={number} src={imageUrl} />;
                })
            )}

        </div>

        :

        <div style={{ display: 'flex', whiteSpace: 'normal' }}>
            <Typography sx={{ ...typographyStyle, fontWeight: 'bold', width: '35%', lineHeight: props.lineHeightTitle, mb: props.mbTitle }} variant="button">
                {props.title}&nbsp;
            </Typography>

            <Typography sx={{ ...typographyStyle, width: '100%', textOverflow: 'ellipsis', lineHeight: props.lineHeightDescription, mb: props.mbDescription }} variant="button">
                {props.description}
            </Typography>
        </div>

        }
        </>

    )
}
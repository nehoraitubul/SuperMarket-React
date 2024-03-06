import { Alert, AlertTitle, Box, Button, Grid, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import backgroundImage from "./loginbackground.png";
import { LOGIN } from "../URLS"
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export function LoginPage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isRegisterPage, setIsRegisterPage] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleToggleRegisterPage = () => {
        setIsRegisterPage(!isRegisterPage);
    };

    const handleLoginOrRegister = () => {

            const loginRequerst = async () => {
                try {
                    const response = await axios.post(`${LOGIN}`, {
                        "username": formData.email, "password": formData.password})
                    if(response.status === 200){
                        setShowWarning(false);
                        console.log(response.data);
                        Cookies.set('refresh', response.data['refresh'])
                        Cookies.set('access', response.data['access'])
                        setLoading(true)
                        setTimeout(() => {
                            navigate("/");
                        }, 2000);
                        
                    } 
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        setShowWarning(true);
                        console.log("NOT TRUE!");
                    }
                };
            }

        if (isRegisterPage) {
            // Send registration request with formData
            console.log("Register:", formData);
        } else {
            // Send login request with email and password
            console.log("Login:", formData.email, formData.password);
            loginRequerst()
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        const handleGlobalMouseUp = () => {
          setShowPassword(false);
        };
    
        if (showPassword) {
          window.addEventListener("mouseup", handleGlobalMouseUp);
        }
    
        return () => {
          window.removeEventListener("mouseup", handleGlobalMouseUp);
        };
      }, [showPassword]);

    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover", 
        width: "100wh", 
        height: "100vh", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    const loginBoxStyle = {
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        padding: "40px",
        width: "25%", 
        minWidth: "300px", 
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        color: "#fff",
        textAlign: "right",
        position: 'absolute', 
        right: '20%',
    };

    const textFieldStyle = {
        marginBottom: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: "4px",
        "& input": {
            color: "#fff",
        },
    };

    const buttonStyle = {
        backgroundColor: "#3F51B5", 
        "&:hover": {
            backgroundColor: "#303F9F", 
        },
    };
    
    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
    };

    const successAlertStyle = {
        backgroundColor: "#66bb6a", // Green color
        color: "#fff",
        padding: "30px",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    };

    const iconStyle = {
        fontSize: "4rem",
        marginBottom: "15px",
    };

    const alertTitleStyle = {
        fontSize: "1.8rem",
        fontWeight: "bold",
        marginBottom: "5px",
    };

    const alertMessageStyle = {
        fontSize: "1.2rem",
        maxWidth: "90%",
    };


    return (
        <Box sx={containerStyle}>
            <Box sx={loginBoxStyle} dir="rtl">
                <Typography variant="h5" gutterBottom>
                    {isRegisterPage ? "הרשמה" : "התחברות"}
                </Typography>
                <Typography variant="body2"  sx={{ color: "#FF5722" }} gutterBottom>
                    {showWarning && "אחד מהפרטים שגוי"}
                </Typography>
                <TextField
                    sx={textFieldStyle}
                    placeholder='אימייל'
                    fullWidth
                    margin="normal"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    InputLabelProps={{ style: { color: "#fff" } }}
                />

                <TextField
                    sx={textFieldStyle}
                    placeholder='סיסמא'
                    fullWidth
                    margin="normal"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleLoginOrRegister();
                        }
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton onMouseDown={handleTogglePasswordVisibility} onMouseUp={handleTogglePasswordVisibility}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    InputLabelProps={{ style: { color: "#fff" } }}
                />

                {isRegisterPage && (
                    <>
                        <TextField
                            sx={textFieldStyle}
                            placeholder='שם פרטי'
                            fullWidth
                            margin="normal"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            InputLabelProps={{ style: { color: "#fff" } }}
                        />

                        <TextField
                            sx={textFieldStyle}
                            placeholder='שם משפחה'
                            fullWidth
                            margin="normal"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            InputLabelProps={{ style: { color: "#fff" } }}
                        />
                    </>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disableRipple
                    sx={{ ...buttonStyle, mt: '10px', mb: '10px' }}
                    onClick={handleLoginOrRegister}
                >
                    {isRegisterPage ? "הרשמה!" : "כניסה!"}
                </Button>

                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2" style={{ color: "#fff" }} onClick={handleToggleRegisterPage}>
                            {isRegisterPage ? "יש לך חשבון? התחבר!" : "אין לך חשבון? הירשם!"}
                        </Link>
                    </Grid>

                    <Grid item>
                        <Link href="#" variant="body2" style={{ color: "#fff" }}>
                            {isRegisterPage ? "" : "שכחת סיסמא?"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
                    
            {loading === true && (
                <Box sx={overlayStyle} dir="rtl">
                    <Box sx={successAlertStyle}>
                        <CheckCircleIcon sx={iconStyle} />
                        <Typography variant="h4" sx={alertTitleStyle}>תודה שחזרת!</Typography>
                        <Typography variant="body1" sx={alertMessageStyle}>
                            בקרוב תועבר לדף הבית.
                        </Typography>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

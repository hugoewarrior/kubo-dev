import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Container, FormControl, IconButton, InputLabel, OutlinedInput } from '@mui/material';
//import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
//import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import moment from 'moment';



function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export const SignUp = () => {

    const history = useNavigate();

    const [snack_, setSnack] = useState(
        {
            message: null,
            snack_type: "info"
        } as any
    );

    const [signUp_form, setform] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        phone_number: '',
        birthdate: moment().format("MM/DD/YYYY"),
        name: '',
        phone_code: '',
        username: ''
    } as any);
    const [attributeList, setAttList] = useState([])
    const [loading, setLoading] = useState(false as boolean)
    const [show_pw, setShowPw] = useState(false);


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={4} sm={4}>
                            <TextField
                                autoComplete="given-name"
                                name="phone_code"
                                required
                                fullWidth
                                id="phone_code"
                                label="Phone Code"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={8} sm={8}>
                            <TextField
                                required
                                fullWidth
                                id="phone_number"
                                label="Phone Number"
                                name="phone_number"
                                autoComplete="family-name"
                                value={signUp_form.phone_number}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={signUp_form.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {/* <MobileDatePicker

                                label="Birthdate"
                                inputFormat="MM/DD/YYYY"
                                value={signUp_form.birthdate}
                                onChange={(e) => update_log_in_form_prop('birthdate', moment(e).format("MM/DD/YYYY"))}
                                renderInput={(params) => <TextField fullWidth color="primary" {...params} />}
                            /> */}
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <OutlinedInput
                                    required
                                    fullWidth
                                    name="password"
                                    type={show_pw ? "password" : "text"}
                                    id="password"
                                    label="Password"
                                    autoComplete="new-password"
                                    endAdornment={(
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPw((show) => !show)}
                                                edge="end"
                                            >
                                                {show_pw ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">Re-enter Password</InputLabel>
                                <OutlinedInput
                                    required
                                    fullWidth
                                    name="password2"
                                    type="password"
                                    id="password2"
                                    autoComplete="new-password"
                                    label="Re-enter Password"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href={"#"} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container >
    );
}

export default SignUp;
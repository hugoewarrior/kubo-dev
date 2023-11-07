import { useContext, useState } from 'react';
import { AuthContext, ICognitoSignResponse } from '@kubo-dev/kubo-auth'
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
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { CustomSnackBar, Copyright } from '../../../components'
import { ISnackMessage } from '../../../types'
import { useNavigateBasedOnRole } from '../../../hooks';


const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
};

export const LoginPage = () => {

    const { login, loading } = useContext(AuthContext);
    const { naviageByRole } = useNavigateBasedOnRole()

    const [snack, setSnack] = useState(
        {
            snackType: "info",
            message: null
        } as ISnackMessage);

    const [loginForm, setloginForm] = useState({
        Username: '',
        Password: ''
    });

    const [showPW, setShowPw] = useState(false);


    /**
     * Updates the values for local state
     * @param prop_name 
     * @param value 
     */
    const updateLocalForm = (prop_name: string, value: string) => {
        setloginForm((l) => {
            return { ...l, [prop_name]: value }
        })
    }


    /**
     * Submits the login form and navigates to the appropriate page based on the user's role.
     * @returns {Promise<void>}
     */
    const submitForm = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            e.preventDefault();
            const resp: ICognitoSignResponse = await login(
                loginForm.Username,
                loginForm.Password);
            naviageByRole(resp);
        } catch (e) {
            console.error("error", e)
            setSnack((l) => ({ ...l, message: String(e), snackType: "error" }))
        }
    }




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
                <div style={{ cursor: "pointer", textAlign: "center" }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Bistro
                    </Typography>
                    <Typography variant="caption">
                        Log In
                    </Typography>
                </div>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => updateLocalForm('Username', e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPW ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => updateLocalForm('Password', e.target.value)}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPw((l) => !l)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPW ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>

                        }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        type='submit'
                        sx={{ mt: 3, mb: 2 }}
                        onClick={submitForm}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Log In"}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href={"#"} variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href={"#"} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
            <CustomSnackBar
                message={String(snack?.message)}
                open={Boolean(snack?.message)}
                variant={snack?.snackType}
                onClose={() => setSnack((l) => { return { ...l, message: null } })}
                hiddeable={false}
            />
        </Container>
    );
}


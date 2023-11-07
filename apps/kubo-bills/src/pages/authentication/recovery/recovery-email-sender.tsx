/**
 * Component displayed when user select the "Forgot Password option", showing a box to insert the username or email they want
 * to recover 
 */

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { Avatar, Box, Button, Container, CssBaseline, Divider, Grid, TextField, Typography } from '@mui/material';

import { CustomSnackBar } from '../../../components';


interface IRecover_Email_ComponentForm {
    Username: string
}

export const RecoverEmailSenderComponent = () => {

    const navigate = useNavigate();


    const [snack_, setSnack] = useState(
        {
            message: null,
            snack_type: "info"
        } as any
    );

    const [login_form, setform] = useState({
        Username: '',
    } as IRecover_Email_ComponentForm);



    const [loading, setLoading] = useState(false as boolean)


    /**
     * Local functions
     */



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
                <Avatar src="/images/password_reset.png" sx={{ m: 1, bgcolor: 'secondary.main', width: 86, height: 86 }}>
                </Avatar>

                <Typography variant="h5">
                    Having trouble loging in?
                </Typography>
                <Typography variant="caption">
                    Don't worry we will help you recover your credentials!
                </Typography>


                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email or Username"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        
                    />
                    <Typography variant="caption">
                        Type your email or username
                    </Typography>

                    <Button
                        fullWidth
                        
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        
                    >
                        {loading ? "Sending..." : "Send recovery link"}
                    </Button>
                </Box>
                <Divider />

                <Grid container>
                    <Grid item xs>
                        <Link href={"#"} variant="body2">
                            Return to Log In page
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            <CustomSnackBar
                message={String(snack_.message)}
                open={Boolean(snack_.message)}
                variant={snack_.snack_type}
                onClose={() => setSnack((l:any) => { return { ...l, message: null } })}
                hiddeable={false}
            />
        </Container >
    )
}

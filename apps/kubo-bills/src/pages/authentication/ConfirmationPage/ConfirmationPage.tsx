import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Container } from '@mui/material';


export const ConfirmationPage = () => {

    const location = useLocation();


    const [sub, setSub] = useState("");


    useEffect(() => {
        if (location.state) setSub((location).state.userSub)
    }, [location.state])

    return (
        <Container maxWidth="xl"
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            {sub ?
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Registration Almost Complete
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <b>We have sent you an confirmation email.</b> Please, click the link in your inbox,
                            after that return to login with the credentials used on this registrarion process.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            onClick={() => console.log("PRESSED")}
                            size="small">Return to Login Page</Button>
                    </CardActions>
                </Card>
                :
                <div />

            }
        </Container >
    );
}
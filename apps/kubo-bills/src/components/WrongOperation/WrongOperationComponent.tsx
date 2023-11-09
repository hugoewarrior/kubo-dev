import { returnStringRoute } from "@kubo-dev/kubo-auth"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import { AUTH_PREFIX, AUTH_ROUTES } from "../../routes"

export const WrongOperationComponent = () => {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign:"center"
                }}
            >
                <>
                    <Typography variant="h5">
                        Ups! Something went wrong
                    </Typography>
                    <Typography variant="caption">
                        We were not able to process this action, to back to
                        <Link href={"#" + returnStringRoute(AUTH_PREFIX, AUTH_ROUTES.LOGIN)} variant="body2">
                            {String(" login page")}
                        </Link> and try again.
                    </Typography>
                </>

            </Box>
        </Container >
    )
}
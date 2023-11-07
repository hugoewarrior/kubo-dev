import Link from "@mui/material/Link";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import Typography from "@mui/material/Typography";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Copyright(props: DefaultComponentProps<any>) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props} >
            {'Copyright © '}
            <Link color="inherit" href={"#"}>
                Bistro
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
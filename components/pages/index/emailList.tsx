import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    Snackbar,
    TextField,
    Typography
} from "@material-ui/core";
import styles from './emailList.module.scss'
import Email from '@material-ui/icons/Email';
import {useState} from "react";

export default function EmailList() {
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);
    const handleButtonClick = () => {
        if (!loading) {
            setOpen(true);
            setSuccess(false);
            setLoading(true);
            setDisabled(true);
            fetch("/api/email_list?email=" + email).then(() => {
                setSuccess(true);
                setLoading(false);
                setDisabled(false);
            })
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <Card className={styles.card}>
            <CardContent>
                <Typography paragraph>
                    <Email/>{" "}E-posta listemize abone olarak tüm etkinliklerimizden haberdar olabilirsiniz.
                </Typography>
                <Container>
                    <TextField value={email} onChange={(e) => {
                        setEmail(e.currentTarget.value)
                    }} onBlur={(e) => {
                        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                        if (!re.test(e.currentTarget.value)) {
                            setDisabled(true)
                            alert("Lütfen geçerli bir e-posta adresi girin")
                        } else {
                            setDisabled(false)
                        }
                    }} label={"---E-posta adresi"} fullWidth={true}/>
                    <Grid container justify={"center"} style={{marginTop: "20px"}}>
                        <Button className={success ? "success" : ""} onClick={handleButtonClick} disabled={disabled}>
                            Abone ol
                            {loading && <CircularProgress size={24} className={styles.buttonProgress}/>}
                        </Button>
                    </Grid>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        classes={{root: styles.snackbarRoot}}
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message="E-posta adresiniz kaydedildi"
                        action={
                            <IconButton size="small" aria-label="close" color="inherit"/>
                        }
                    />
                </Container>
            </CardContent>
        </Card>
    )
}

import React from "react";
import { useScrollTrigger, Zoom, Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const styles = {
    div: { position: 'fixed', bottom: 20, right: 20 }
}

const onClick = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}
const BackToTop = props => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 70,
    })
    return (
        <Zoom
            in={trigger}>
            <div
                onClick={onClick}
                style={styles.div}>
                <Fab
                    color='primary'
                    size='small'
                >
                    <KeyboardArrowUpIcon />
                </Fab>
            </div>
        </Zoom>
    )
}

export default BackToTop
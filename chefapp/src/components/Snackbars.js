import { Snackbar, SnackbarContent } from "@mui/material";
import React from "react";
import { connect } from "react-redux";

const Snackbars = props => {
    return (
        <div>
            {props._bars.map((el, index) => (
                <Snackbar
                    style={{ position: 'fixed', bottom: (30 + 70 * index), }}
                    key={el.key}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={true}
                >
                    <SnackbarContent
                        style={{ backgroundColor: el.color }}
                        message={el.message}
                    />
                </Snackbar>
            ))}
        </div>
    )
}

const mapStateToProps = state => ({
    _bars: state.snackbars.bars
  })

export default connect(
    mapStateToProps,
)(Snackbars)
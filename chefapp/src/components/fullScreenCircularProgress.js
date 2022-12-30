import React from "react";
import { connect } from "react-redux";
import { CircularProgress } from "@mui/material";

const fullScreenCircularProgres = props => {
    return (
        <div>
            <CircularProgress />
        </div>
    )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(fullScreenCircularProgres)
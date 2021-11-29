import { makeStyles, Paper } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

export default function (props) {
    const useStyles = makeStyles(theme => ({
        paper: {
            padding: theme.spacing(2),
            display: "flex",
            overflow: "hidden",
            flexDirection: "column",
        },
        fixedHeight: {
            height: props.height,
            margin: theme.spacing(2),
        },
    }))
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        < Paper className={fixedHeightPaper} >
            <React.Fragment>
                {props.children}
            </React.Fragment>
        </Paper >
    )
}
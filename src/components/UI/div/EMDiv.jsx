import classes from "./EMDiv.module.css"

const EMDiv = ({children, right, width}) => {
    return(
        <div className={classes.emDiv} style={{width: width}}>
            <div>{children}</div>
            <div className={classes.right} >{right}</div>
        </div>
    )
}

export default EMDiv;
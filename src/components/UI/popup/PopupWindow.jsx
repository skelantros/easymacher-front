import React from "react"
import cl from './PopupWindow.module.css'

const PopupWindow = ({children, visible, setVisible}) => {
    const rootClasses = [cl.popupWindow];

    if(visible) rootClasses.push(cl.active); 

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.popupWindowContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default PopupWindow;
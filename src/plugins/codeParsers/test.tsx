import React from "react";

/**
 * use this for bg layers later
 * extra note add bg-position 
 position: fixed;
     top: 20px; 
     left: -175px; 
     z-index: 9999999; 
    right: 54px;
    width: 200px;
    left: auto;
    bottom: 0;
    height: 265px;
    top: auto;
 */

export function testComponent(){
    const temp = ['1','2','3'];
    return(
        
        <div className="myCustomClass">
            {temp.map(element => 
                <div key={element}>
                    <p>{element}</p>
                </div>
            )}
            <p>My cool Test Component</p>
        </div>
    )
}
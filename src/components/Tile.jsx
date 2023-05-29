import React from 'react';

const Tile = (props) => {
    const tile = {id: props.id, content: props.value, zones: props.zones}
    //console.log(props);

    function generateClassName() {
        let className = "Tile"+ " "+ tile.content;

        let zone = tile.zones;
        for (const [key, value] of Object.entries(zone)) {
            if(value===true) className+=" "+key;
        }
        return(className)
        //tile.zones.forEach(element =>
       // if(element===true) className+=" "+)
    }

    if (props.value === "queen")
        return (
            <div className={generateClassName()} style={{backgroundColor: props.color}} id={props.id}>
                <img src='./img/queen.png' width={"60%"} height={"60%"} alt={""}/>
            </div>)
    if (props.value === "rook")
        return (
            <div className={generateClassName()} style={{backgroundColor: props.color}} id={props.id}>
                <img src='./img/rook.png' width={"60%"} height={"60%"} alt={""}/>
            </div>)
    if (props.value === "obstacle")
        return (
            <div className={generateClassName()} style={{backgroundColor: props.color}} id={props.id}>
                <img src='./img/obstacle.png' width={"60%"} height={"60%"} alt={""}/>
            </div>)
    if (props.value === "rookAttackZone")
        return (
            <div className={generateClassName()} style={{backgroundColor: props.color}} id={props.id}>

            </div>)
    if (props.value === "dot")
        return (
            <div className={generateClassName()} style={{backgroundColor: props.color, }} id={props.id}>
                <img src='./img/dot.png' width={"60%"} height={"60%"} alt={""}/>
            </div>)
    if (props.value === "markedRook")
        return (
            <div className={generateClassName()} style={{backgroundColor: props.color}} id={props.id}>
                <img src='./img/rook.png' width={"60%"} height={"60%"} alt={""}/>
            </div>)
    if (props.value === "markedQueen")
        return (
            <div className={generateClassName()} style={{backgroundColor: props.color}} id={props.id}>
                <img src='./img/queen.png' width={"60%"} height={"60%"} alt={""}/>
            </div>)
        return (
            <div className={generateClassName()} style={{backgroundColor: props.color}} id={props.id}>
                <span>{props.id}</span>
            </div>
        );
};


//<img src='./img/queen.png' width={"80%"} height={"80%"} alt={""}/>
export default Tile;
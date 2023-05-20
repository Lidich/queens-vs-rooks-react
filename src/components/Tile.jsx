import React from 'react';

const Tile = (props) => {
    //console.log(props);
    if (props.value === "queen")
        return (
            <div className="Tile queen" style={{backgroundColor: props.color}} id={props.id}>
                <img src='./img/queen.png' width={"60%"} height={"60%"} alt={""}/>
            </div>)
    if (props.value === "rook")
        return (
            <div className="Tile rook" style={{backgroundColor: props.color}} id={props.id}>
                <img src='./img/rook.png' width={"60%"} height={"60%"} alt={""}/>
            </div>)
    if (props.value === "obstacle")
        return (
            <div className="Tile obstacle" style={{backgroundColor: props.color}} id={props.id}>
                <img src='./img/obstacle.png' width={"60%"} height={"60%"} alt={""}/>
            </div>)
    if (props.value === "rookAttackZone")
        return (
            <div className={"Tile "+props.value} style={{backgroundColor: props.color}} id={props.id}>

            </div>)
    if (props.value === "dot")
        return (
            <div className="Tile dot" style={{backgroundColor: props.color}} id={props.id}>
                <img src='./img/dot.png' width={"60%"} height={"60%"} alt={""}/>
            </div>)
    if (props.value === "markedRook")
        return (
            <div className="Tile markedRook" style={{backgroundColor: props.color}} id={props.id}>
                <img src='./img/rook.png' width={"60%"} height={"60%"} alt={""}/>
            </div>)
    if (props.value === "markedQueen")
        return (
            <div className="Tile markedQueen" style={{backgroundColor: props.color}} id={props.id}>
                <img src='./img/queen.png' width={"60%"} height={"60%"} alt={""}/>
            </div>)
        return (
            <div className="Tile" style={{backgroundColor: props.color}} id={props.id}>
                <span>{props.id}</span>
            </div>
        );
};


//<img src='./img/queen.png' width={"80%"} height={"80%"} alt={""}/>
export default Tile;
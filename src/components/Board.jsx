import React, {useEffect, useState} from 'react';
import Tile from "./Tile";
import tile from "./Tile";

const Board = () => {

    const Pieces =
        {   Queen: 'queen',
            Rook: 'rook',
            Obstacle: 'obstacle' ,
            None: 'none',
            RookAttackZone: 'rookAttackZone',
            MarkedRook: 'markedRook',
            MarkedQueen: 'markedQueen',
            Dot: 'dot'};

    const Zones =
        {
            FirstMoveZone: {firstRookAttackZone: false,
                secondRookAttackZone: false,
                queenAttackZone: false,
                firstRookMoveZone: false,
                secondRookMoveZone: false,
                queenMoveZone: false,
            },
            SecondMoveZone: {firstRookAttackZone: false,
                secondRookAttackZone: false,
                queenAttackZone: false,
                firstRookMoveZone: false,
                secondRookMoveZone: false,
                queenMoveZone: false,
            },
            QueenMoveZone: {firstRookAttackZone: false,
                secondRookAttackZone: false,
                queenAttackZone: false,
                firstRookMoveZone: false,
                secondRookMoveZone: false,
                queenMoveZone: false,
            },
            None: {firstRookAttackZone: false,
                secondRookAttackZone: false,
                queenAttackZone: false,
                firstRookMoveZone: false,
                secondRookMoveZone: false,
                queenMoveZone: false,
            },
            FirstAttackZone: {firstRookAttackZone: false,
                secondRookAttackZone: false,
                queenAttackZone: false,
                firstRookMoveZone: false,
                secondRookMoveZone: false,
                queenMoveZone: false,
            },
            SecondAttackZone: {firstRookAttackZone: false,
                secondRookAttackZone: false,
                queenAttackZone: false,
                firstRookMoveZone: false,
                secondRookMoveZone: false,
                queenMoveZone: false,
            },
            QueenAttackZone: {firstRookAttackZone: false,
                secondRookAttackZone: false,
                queenAttackZone: false,
                firstRookMoveZone: false,
                secondRookMoveZone: false,
                queenMoveZone: false,
            },
            FirstSecondAttackZone: {firstRookAttackZone: false,
                secondRookAttackZone: false,
                queenAttackZone: false,
                firstRookMoveZone: false,
                secondRookMoveZone: false,
                queenMoveZone: false,
            },
            AllAttackZone: {firstRookAttackZone: false,
                secondRookAttackZone: false,
                queenAttackZone: false,
                firstRookMoveZone: false,
                secondRookMoveZone: false,
                queenMoveZone: false,
            },
            FirstQueenAttackZone: {firstRookAttackZone: false,
                secondRookAttackZone: false,
                queenAttackZone: false,
                firstRookMoveZone: false,
                secondRookMoveZone: false,
                queenMoveZone: false,
            },
            SecondQueenAttackZone: {firstRookAttackZone: false,
                secondRookAttackZone: false,
                queenAttackZone: false,
                firstRookMoveZone: false,
                secondRookMoveZone: false,
                queenMoveZone: false,
            },
            FirstSecondMoveZone: {firstRookAttackZone: false,
                secondRookAttackZone: false,
                queenAttackZone: false,
                firstRookMoveZone: false,
                secondRookMoveZone: false,
                queenMoveZone: false,
            },
            FirstQueenMoveZone: {firstRookAttackZone: false,
                secondRookAttackZone: false,
                queenAttackZone: false,
                firstRookMoveZone: false,
                secondRookMoveZone: false,
                queenMoveZone: false,
            },
            AllMoveZone: {firstRookAttackZone: false,
                secondRookAttackZone: false,
                queenAttackZone: false,
                firstRookMoveZone: false,
                secondRookMoveZone: false,
                queenMoveZone: false,
            },
        }

    const chessBoardTemp = [];

    //const chessBoardCopy = [];

    //const rooks = {firstRookPosId: 'a8', secondRookPosId: 'h8'}

    /*
    const [rooks, setRooks] =
        useState({firstRookPosId: "a8", secondRookPosId: "h8"})
    */

    /*
    function updateRooks(newFirstRookPosId, newSecondRookPosId){
    }
     */

    const boardIdMap = new Map();

    const [queenMoveCount, setQueenMoveCount] = useState(0)

    const [rooksMoveCount, setRooksMoveCount] = useState(0)

    const [chessBoard, editBoard] = useState(chessBoardTemp);

    const [queenPosId, setQueenPosId] = useState("e1")

    const [firstRookPosId, setFirstRookPosId] = useState('a8')

    const [secondRookPosId, setSecondRookPosId] = useState('h8')

    const [grabbedPiece, grabPiece] = useState({type: Pieces.None, posId: "none"});

    const n = 2

    class IdClass{
        id = ''
        idLetter = ''
        idNumber;
        constructor(id) {
            this.id = id
            this.idLetter = id.substring(0,1)
            this.idNumber = parseInt(id.substring(1,2))
        }

        up(n){
            if(n!==undefined)
            for(let i=0;i<n;i++){
                if(this.idNumber!==8) {
                    this.idNumber = this.idNumber + 1;
                    this.id = this.idLetter + this.idNumber;
                }
                else break
            }
            else {
                if(this.idNumber!==8) {
                    this.idNumber = this.idNumber + 1;
                    this.id = this.idLetter + this.idNumber;
                }
            }
        }
        down(n){
            if(n!==undefined){
                for(let i=0;i<n;i++){
                    if(this.idNumber!==1){
                        this.idNumber--;
                        this.id=this.idLetter + this.idNumber;
                    }
                    else break
                }
            }
            else {
                if(this.idNumber!==1){
                    this.idNumber--;
                    this.id=this.idLetter + this.idNumber;
                }
            }
        }

        left(n){
            if(n!==undefined){
                for(let i=0;i<n;i++){
                    if(this.idLetter!=='a'){
                        this.idLetter=`${String.fromCharCode(this.idLetter.charCodeAt(0)-1)}`
                        this.id=this.idLetter + this.idNumber;
                    }
                    else break
                }
            }
            else {
                if(this.idLetter!=='a'){
                    this.idLetter=`${String.fromCharCode(this.idLetter.charCodeAt(0)-1)}`
                    this.id=this.idLetter + this.idNumber;
                }
            }
        }
        right(n){
            if(n!==undefined){
                for(let i=0;i<n;i++){
                    if(this.idLetter!=='h'){
                        this.idLetter=`${String.fromCharCode(this.idLetter.charCodeAt(0)+1)}`
                        this.id=this.idLetter + this.idNumber;
                    }
                    else break
                }
            }
            else {
                if(this.idLetter!=='h'){
                    this.idLetter=`${String.fromCharCode(this.idLetter.charCodeAt(0)+1)}`
                    this.id=this.idLetter + this.idNumber;
                }
            }
        }

        leftUp(n){
            if(n!==undefined){
                this.left(n);
                this.up(n)
            }
            else {
                this.left();
                this.up()
            }
        }
        leftDown(n){
            if(n!==undefined){
                this.left(n);
                this.down(n)
            }
            else {
                this.left();
                this.down()
            }
        }

        rightDown(n){
            if(n!==undefined){
                this.right(n);
                this.down(n)
            }
            else {
                this.right();
                this.down()
            }
        }
        rightUp(n){
            if(n!==undefined){
                this.right(n);
                this.up(n)
            }
            else {
                this.right();
                this.up()
            }
        }

    }


    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

            // swap elements array[i] and array[j]
            // we use "destructuring assignment" syntax to achieve that
            // you'll find more details about that syntax in later chapters
            // same can be written as:
            // let t = array[i]; array[i] = array[j]; array[j] = t
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Loop through each row of the chess board
    for (let i = 0; i < 8; i++) {
        // Loop through each column of the chess board
        let k=i;
        for (let j = 0; j < 8; j++) {
            // Determine the color of the tile based on the row and column
            const color = (i + j) % 2 === 0 ? 'light' : 'dark';

            // Create the ID of the tile using the row and column numbers
            const id = `${String.fromCharCode(97 + j)}${8 - i}`;

            k=i*8+j;

            boardIdMap.set(id, k);

            // Push the ID of the tile into the array
            //Queen
            if (id === queenPosId) {
                chessBoardTemp.push({id: id,
                    content: Pieces.Queen,
                    zones: {...Zones.None}
                })
                //chessBoardCopy.push({id: id, content: Pieces.Queen})
            }
            else {
                //Rooks
                if((id === "a8")||(id === "h8")) {
                    chessBoardTemp.push({id: id,
                        content: Pieces.Rook,
                        zones: {...Zones.None}
                    })
                    //chessBoardCopy.push({id: id, content: Pieces.Rook})
                }
                else {
                    //Obstacles
                    chessBoardTemp.push({id: id,
                        content: Pieces.None,
                        zones: {...Zones.None}
                    })
                    //chessBoardCopy.push({id: id, content: "none"})
                }
            }
        }
    }

    function copyBoard(board){
        /*
        chessBoardCopy.map((tile) =>
            ({...tile, content: chessBoard[boardIdMap.get(tile.id)].content}))
         */
        if(board.length>2){
            for(let i=0;i<64;i++){
                board[i] = {id: chessBoard[i].id, content: chessBoard[i].content, zones: {...chessBoard[i].zones}}
            }
        }
        else {
            for(let i=0;i<64;i++){
                board.push({id: chessBoard[i].id, content: chessBoard[i].content, zones: {...chessBoard[i].zones}})
            }
        }

    }

    function placeObstacles(n, board){
        let chessBoardShuffle = [];

        let chessBoardShuffleSlice = [];

        // Shuffling obstacles
        for (let i = 0; i < 8; i++) {
            // Loop through each column of the chess board
            let k=i;
            for (let j = 0; j < 8; j++) {
                // Determine the color of the tile based on the row and column
                const color = (i + j) % 2 === 0 ? 'light' : 'dark';

                // Create the ID of the tile using the row and column numbers
                const id = `${String.fromCharCode(97 + j)}${8 - i}`;

                k=i*8+j;


                // Push the ID of the tile into the array
                //Queen
                if (id === queenPosId) ;
                else {
                    //Rooks
                    if((id === "a8")||(id === "h8")) ;
                    else {
                        chessBoardShuffle.push({id: id,
                            content: Pieces.Obstacle,
                            zones: {...Zones.None}
                        })
                    }
                }
            }
        }


        shuffle(chessBoardShuffle)

        chessBoardShuffleSlice = chessBoardShuffle.slice(0, n);

        for(let i=0;i<chessBoardShuffleSlice.length;i++){
            //chessBoard[boardIdMap.get(chessBoardShuffleSlice[i].id)]=chessBoardShuffleSlice[i];
            board[boardIdMap.get(chessBoardShuffleSlice[i].id)]=chessBoardShuffleSlice[i];
        }

        //editBoard(prevState => [...prevState])
    }

    /*
    function updateBoardSingle(idSearch, newContent) {
        editBoard(prevState => [...prevState.map((tile) =>
                tile.id === idSearch
                    ? {...tile, content: newContent}
                    : {...tile}
            )]
        );
    }

     */

    function updateBoardSingle(idSearch, newContent, board) {
      board[boardIdMap.get(idSearch)].content = newContent
    }

    /*
    function movePiece(newPosId, grabbedPieceType) {
        let initialType = grabbedPieceType
        if (initialType !== Pieces.None) {
            if (initialType === Pieces.Queen) setQueenPosId(grabbedPiece.posId);
            updateBoardSingle(newPosId, initialType);
            updateBoardSingle(grabbedPiece.posId, Pieces.Obstacle)
            grabPiece({type: Pieces.None, posId: "none"})
        }
    }
     */

    function movePiece(newPosId, grabbedPieceType, board) {
        let initialType = grabbedPieceType
        if (initialType !== Pieces.None) {
            if (initialType === Pieces.Queen) setQueenPosId(grabbedPiece.posId);
            updateBoardSingle(newPosId, initialType, board);
            updateBoardSingle(grabbedPiece.posId, Pieces.Obstacle, board)
            grabPiece({type: Pieces.None, posId: "none"})
        }
    }

    function getItemFromBoard(id, board){
        return(board[boardIdMap.get(id)])
    }

    function calcRookAttackZones(id, board){

        let attackZones = {startRookAttackZones: [], newRookAttackZones: []}

        let startId = new IdClass(id);

        let tempId = new IdClass(id);

        let itemFromBoard = getItemFromBoard(tempId.id, board)

        //upLoop
        while (startId.id!=='error'){
            tempId.up();
            itemFromBoard = getItemFromBoard(tempId.id, board)
            if(
                (itemFromBoard.content===Pieces.Obstacle)
                || (itemFromBoard.content===Pieces.Queen)
                || (itemFromBoard.content===Pieces.Rook)
            )
            {
                tempId = new IdClass(startId.id)
                break
            }
            else {
                if(tempId.idNumber===8){
                    if(itemFromBoard.content!==Pieces.RookAttackZone) {
                        itemFromBoard.content = Pieces.RookAttackZone
                        attackZones.newRookAttackZones.push(itemFromBoard.id)
                    }
                    else {
                        attackZones.startRookAttackZones.push(itemFromBoard.id)
                    }

                    tempId = new IdClass(startId.id)
                    break
                }
                if(itemFromBoard.content!==Pieces.RookAttackZone) {
                    itemFromBoard.content = Pieces.RookAttackZone
                    attackZones.newRookAttackZones.push(itemFromBoard.id)
                }
                else {
                    attackZones.startRookAttackZones.push(itemFromBoard.id)
                }
            }

        }

        //downLoop
        while (startId.id!=='error'){
            tempId.down();
            itemFromBoard = getItemFromBoard(tempId.id, board)
            if(
                (itemFromBoard.content===Pieces.Obstacle)
                || (itemFromBoard.content===Pieces.Queen)
                || (itemFromBoard.content===Pieces.Rook)
                )
            {
                tempId = new IdClass(startId.id)
                break
            }
            else {
                if(tempId.idNumber===1){
                    if(itemFromBoard.content!==Pieces.RookAttackZone) {
                        itemFromBoard.content = Pieces.RookAttackZone
                        attackZones.newRookAttackZones.push(itemFromBoard.id)
                    }
                    else {
                        attackZones.startRookAttackZones.push(itemFromBoard.id)
                    }

                    tempId = new IdClass(startId.id)
                    break
                }
                if(itemFromBoard.content!==Pieces.RookAttackZone) {
                    itemFromBoard.content = Pieces.RookAttackZone
                    attackZones.newRookAttackZones.push(itemFromBoard.id)
                }
                else {
                    attackZones.startRookAttackZones.push(itemFromBoard.id)
                }
            }
        }

        //leftLoop
        while (startId.id!=='error'){
            tempId.left();
            itemFromBoard = getItemFromBoard(tempId.id, board)
            if(
                (itemFromBoard.content===Pieces.Obstacle)
                || (itemFromBoard.content===Pieces.Queen)
                || (itemFromBoard.content===Pieces.Rook)
            )
            {
                tempId = new IdClass(startId.id)
                break
            }
            else {
                if(tempId.idLetter==='a'){
                    if(itemFromBoard.content!==Pieces.RookAttackZone) {
                        itemFromBoard.content = Pieces.RookAttackZone
                        attackZones.newRookAttackZones.push(itemFromBoard.id)
                    }
                    else {
                        attackZones.startRookAttackZones.push(itemFromBoard.id)
                    }

                    tempId = new IdClass(startId.id)
                    break
                }
                if(itemFromBoard.content!==Pieces.RookAttackZone) {
                    itemFromBoard.content = Pieces.RookAttackZone
                    attackZones.newRookAttackZones.push(itemFromBoard.id)
                }
                else {
                    attackZones.startRookAttackZones.push(itemFromBoard.id)
                }
            }
        }

        //rightLoop
        while (startId.id!=='error'){
            tempId.right();
            itemFromBoard = getItemFromBoard(tempId.id, board)
            if(
                (itemFromBoard.content===Pieces.Obstacle)
                || (itemFromBoard.content===Pieces.Queen)
                || (itemFromBoard.content===Pieces.Rook)
            )
            {
                tempId = new IdClass(startId.id)
                break
            }
            else {
                if(tempId.idLetter==='h'){
                    if(itemFromBoard.content!==Pieces.RookAttackZone) {
                        itemFromBoard.content = Pieces.RookAttackZone
                        attackZones.newRookAttackZones.push(itemFromBoard.id)
                    }
                    else {
                        attackZones.startRookAttackZones.push(itemFromBoard.id)
                    }

                    tempId = new IdClass(startId.id)
                    break
                }
                if(itemFromBoard.content!==Pieces.RookAttackZone) {
                    itemFromBoard.content = Pieces.RookAttackZone
                    attackZones.newRookAttackZones.push(itemFromBoard.id)
                }
                else {
                    attackZones.startRookAttackZones.push(itemFromBoard.id)
                }
            }
        }
        return(attackZones)
    }

    function showWays(id, board){
        let startId = new IdClass(id);

        let tempId = new IdClass(id);

        //rookWays
        if(getItemFromBoard(id, board).content===Pieces.Rook){
            //upLoop
            while (startId.id!=='error'){
                tempId.up();
                if((getItemFromBoard(tempId.id, board).content===Pieces.Obstacle)||
                    (getItemFromBoard(tempId.id, board).content===Pieces.Queen)||
                    (getItemFromBoard(tempId.id, board).content===Pieces.Rook))
                {
                    tempId = new IdClass(startId.id)
                    break
                }
                else {
                    if(getItemFromBoard(tempId.id, board).content===Pieces.Queen){
                        getItemFromBoard(tempId.id, board).content = Pieces.MarkedQueen
                        tempId = new IdClass(startId.id)
                        break
                    }
                    else{
                        if(tempId.idNumber===8){
                            getItemFromBoard(tempId.id, board).content = Pieces.Dot
                            tempId = new IdClass(startId.id)
                            break
                        }
                        getItemFromBoard(tempId.id, board).content = Pieces.Dot
                    }
                }

            }

            //downLoop
            while (startId.id!=='error'){
                tempId.down();
                if((getItemFromBoard(tempId.id, board).content===Pieces.Obstacle)||
                    (getItemFromBoard(tempId.id, board).content===Pieces.Queen)||
                    (getItemFromBoard(tempId.id, board).content===Pieces.Rook))
                {
                    tempId = new IdClass(startId.id)
                    break
                }
                else {
                    if(getItemFromBoard(tempId.id, board).content===Pieces.Queen){
                        getItemFromBoard(tempId.id, board).content = Pieces.MarkedQueen
                        tempId = new IdClass(startId.id)
                        break
                    }
                    else{
                        if(tempId.idNumber===1){
                            getItemFromBoard(tempId.id, board).content = Pieces.Dot
                            tempId = new IdClass(startId.id)
                            break
                        }
                        getItemFromBoard(tempId.id, board).content = Pieces.Dot
                    }
                }
            }

            //leftLoop
            while (startId.id!=='error'){
                tempId.left();
                if((getItemFromBoard(tempId.id, board).content===Pieces.Obstacle)||
                    (getItemFromBoard(tempId.id, board).content===Pieces.Queen)||
                    (getItemFromBoard(tempId.id, board).content===Pieces.Rook))
                {
                    tempId = new IdClass(startId.id)
                    break
                }
                else {
                    if(getItemFromBoard(tempId.id, board).content===Pieces.Queen){
                        getItemFromBoard(tempId.id, board).content = Pieces.MarkedQueen
                        tempId = new IdClass(startId.id)
                        break
                    }
                    else{
                        if(tempId.idLetter==='a'){
                            getItemFromBoard(tempId.id, board).content = Pieces.Dot
                            tempId = new IdClass(startId.id)
                            break
                        }
                        getItemFromBoard(tempId.id, board).content = Pieces.Dot
                    }
                }
            }

            //rightLoop
            while (startId.id!=='error'){
                tempId.right();
                if((getItemFromBoard(tempId.id, board).content===Pieces.Obstacle)||
                    (getItemFromBoard(tempId.id, board).content===Pieces.Queen)||
                    (getItemFromBoard(tempId.id, board).content===Pieces.Rook))
                {
                    tempId = new IdClass(startId.id)
                    break
                }
                else {
                    if(getItemFromBoard(tempId.id, board).content===Pieces.Queen){
                        getItemFromBoard(tempId.id, board).content = Pieces.MarkedQueen
                        tempId = new IdClass(startId.id)
                        break
                    }
                    else{
                        if(tempId.idLetter==='h'){
                            getItemFromBoard(tempId.id, board).content = Pieces.Dot
                            tempId = new IdClass(startId.id)
                            break
                        }
                        getItemFromBoard(tempId.id, board).content = Pieces.Dot
                    }
                }
            }

            editBoard(prevState => [...prevState])
        }

        //queenWays
        if(getItemFromBoard(id, board).content===Pieces.Queen){
            //upLoop
            while (startId.id!=='error'){
                tempId.up();
                if((getItemFromBoard(tempId.id, board).content===Pieces.Obstacle)||
                    (getItemFromBoard(tempId.id, board).content===Pieces.Queen)||
                    //(getItemFromBoard(tempId.id, board).content===Pieces.Rook)||
                    (getItemFromBoard(tempId.id, board).content===Pieces.RookAttackZone))
                {
                    tempId = new IdClass(startId.id)
                    break
                }
                else {
                    if(getItemFromBoard(tempId.id, board).content===Pieces.Rook){
                        getItemFromBoard(tempId.id, board).content = Pieces.MarkedRook
                        tempId = new IdClass(startId.id)
                        break
                    }
                    else {
                        if(tempId.idNumber===8){
                            getItemFromBoard(tempId.id, board).content = Pieces.Dot
                            tempId = new IdClass(startId.id)
                            break
                        }
                        getItemFromBoard(tempId.id, board).content = Pieces.Dot
                    }
                }

            }

            //downLoop
            while (startId.id!=='error'){
                tempId.down();
                if((getItemFromBoard(tempId.id, board).content===Pieces.Obstacle)||
                    (getItemFromBoard(tempId.id, board).content===Pieces.Queen)||
                    //(getItemFromBoard(tempId.id, board).content===Pieces.Rook)||
                    (getItemFromBoard(tempId.id, board).content===Pieces.RookAttackZone))
                {
                    tempId = new IdClass(startId.id)
                    break
                }
                else {
                    if(getItemFromBoard(tempId.id, board).content===Pieces.Rook){
                        getItemFromBoard(tempId.id, board).content = Pieces.MarkedRook
                        tempId = new IdClass(startId.id)
                        break
                    }
                    else {
                        if(tempId.idNumber===1){
                            getItemFromBoard(tempId.id, board).content = Pieces.Dot
                            tempId = new IdClass(startId.id)
                            break
                        }
                        getItemFromBoard(tempId.id, board).content = Pieces.Dot
                    }
                }
            }

            //leftLoop
            while (startId.id!=='error'){
                tempId.left();
                if((getItemFromBoard(tempId.id, board).content===Pieces.Obstacle)||
                    (getItemFromBoard(tempId.id, board).content===Pieces.Queen)||
                    //(getItemFromBoard(tempId.id, board).content===Pieces.Rook)||
                    (getItemFromBoard(tempId.id, board).content===Pieces.RookAttackZone))
                {
                    tempId = new IdClass(startId.id)
                    break
                }
                else {
                    if(getItemFromBoard(tempId.id, board).content===Pieces.Rook){
                        getItemFromBoard(tempId.id, board).content = Pieces.MarkedRook
                        tempId = new IdClass(startId.id)
                        break
                    }
                    else {
                        if(tempId.idLetter==='a'){
                            getItemFromBoard(tempId.id, board).content = Pieces.Dot
                            tempId = new IdClass(startId.id)
                            break
                        }
                        getItemFromBoard(tempId.id, board).content = Pieces.Dot
                    }
                }
            }

            //rightLoop
            while (startId.id!=='error'){
                tempId.right();
                if((getItemFromBoard(tempId.id, board).content===Pieces.Obstacle)||
                    (getItemFromBoard(tempId.id, board).content===Pieces.Queen)||
                    //(getItemFromBoard(tempId.id, board).content===Pieces.Rook)||
                    (getItemFromBoard(tempId.id, board).content===Pieces.RookAttackZone))
                {
                    tempId = new IdClass(startId.id)
                    break
                }
                else {
                    if(getItemFromBoard(tempId.id, board).content===Pieces.Rook){
                        getItemFromBoard(tempId.id, board).content = Pieces.MarkedRook
                        tempId = new IdClass(startId.id)
                        break
                    }
                    else {
                        if(tempId.idLetter==='h'){
                            getItemFromBoard(tempId.id, board).content = Pieces.Dot
                            tempId = new IdClass(startId.id)
                            break
                        }
                        getItemFromBoard(tempId.id, board).content = Pieces.Dot
                    }
                }
            }

            //leftUp loop
            while (startId.id!=='error'){
                tempId.left();
                tempId.up();
                if((getItemFromBoard(tempId.id, board).content===Pieces.Obstacle)||
                    (getItemFromBoard(tempId.id, board).content===Pieces.Queen)||
                    //(getItemFromBoard(tempId.id, board).content===Pieces.Rook)||
                    (getItemFromBoard(tempId.id, board).content===Pieces.RookAttackZone))
                {
                    tempId = new IdClass(startId.id)
                    break
                }
                else {
                    if(getItemFromBoard(tempId.id, board).content===Pieces.Rook){
                        getItemFromBoard(tempId.id, board).content = Pieces.MarkedRook
                        tempId = new IdClass(startId.id)
                        break
                    }
                    else {
                        if((tempId.idLetter==='a')||(tempId.idNumber===8)){
                            getItemFromBoard(tempId.id, board).content = Pieces.Dot
                            tempId = new IdClass(startId.id)
                            break
                        }
                        getItemFromBoard(tempId.id, board).content = Pieces.Dot
                    }

                }
            }

            //leftDown loop
            while (startId.id!=='error'){
                tempId.left();
                tempId.down();
                if((getItemFromBoard(tempId.id, board).content===Pieces.Obstacle)||
                    (getItemFromBoard(tempId.id, board).content===Pieces.Queen)||
                    //(getItemFromBoard(tempId.id, board).content===Pieces.Rook)||
                    (getItemFromBoard(tempId.id, board).content===Pieces.RookAttackZone))
                {
                    tempId = new IdClass(startId.id)
                    break
                }
                else {
                    if(getItemFromBoard(tempId.id, board).content===Pieces.Rook){
                        getItemFromBoard(tempId.id, board).content = Pieces.MarkedRook
                        tempId = new IdClass(startId.id)
                        break
                    }
                    else {
                        if((tempId.idLetter==='a')||(tempId.idNumber===1)){
                            getItemFromBoard(tempId.id, board).content = Pieces.Dot
                            tempId = new IdClass(startId.id)
                            break
                        }
                        getItemFromBoard(tempId.id, board).content = Pieces.Dot
                    }

                }
            }

            //rightDown loop
            while (startId.id!=='error'){
                tempId.right();
                tempId.down();
                if((getItemFromBoard(tempId.id, board).content===Pieces.Obstacle)||
                    (getItemFromBoard(tempId.id, board).content===Pieces.Queen)||
                    //(getItemFromBoard(tempId.id, board).content===Pieces.Rook)||
                    (getItemFromBoard(tempId.id, board).content===Pieces.RookAttackZone))
                {
                    tempId = new IdClass(startId.id)
                    break
                }
                else {
                    if(getItemFromBoard(tempId.id, board).content===Pieces.Rook){
                        getItemFromBoard(tempId.id, board).content = Pieces.MarkedRook
                        tempId = new IdClass(startId.id)
                        break
                    }
                    else {
                        if((tempId.idLetter==='h')||(tempId.idNumber===1)){
                            getItemFromBoard(tempId.id, board).content = Pieces.Dot
                            tempId = new IdClass(startId.id)
                            break
                        }
                        getItemFromBoard(tempId.id, board).content = Pieces.Dot
                    }

                }
            }

            //rightUp loop
            while (startId.id!=='error'){
                tempId.right();
                tempId.up();
                if((getItemFromBoard(tempId.id, board).content===Pieces.Obstacle)||
                    (getItemFromBoard(tempId.id, board).content===Pieces.Queen)||
                    //(getItemFromBoard(tempId.id, board).content===Pieces.Rook)||
                    (getItemFromBoard(tempId.id, board).content===Pieces.RookAttackZone))
                {
                    tempId = new IdClass(startId.id)
                    break
                }
                else {
                    if(getItemFromBoard(tempId.id, board).content===Pieces.Rook){
                        getItemFromBoard(tempId.id, board).content = Pieces.MarkedRook
                        tempId = new IdClass(startId.id)
                        break
                    }
                    else {
                        if((tempId.idLetter==='h')||(tempId.idNumber===8)){
                            getItemFromBoard(tempId.id, board).content = Pieces.Dot
                            tempId = new IdClass(startId.id)
                            break
                        }
                        getItemFromBoard(tempId.id, board).content = Pieces.Dot
                    }

                }
            }

            //editBoard(prevState => [...prevState])
        }
    }

    /*
    function clearWays() {
        editBoard(prevState => [...prevState.map((tile) =>
                tile.content === Pieces.Dot
                    ? {...tile, content: Pieces.None}
                    : {...tile}
            )]
        );
    }

     */

    function clearWays(board) {
        for(let i=0;i<64;i++){
            if(board[i].content===Pieces.MarkedRook) board[i].content = Pieces.Rook
            if(board[i].content===Pieces.MarkedQueen) board[i].content = Pieces.Queen
            if(board[i].content===Pieces.Dot) board[i].content = Pieces.None
        }
    }

    /*
    function clearRookWays() {
        editBoard(prevState => [...prevState.map((tile) =>
                tile.content === Pieces.RookAttackZone
                    ? {...tile, content: Pieces.None}
                    : {...tile}
            )]
        );
    }

     */

    function clearRookWays(board) {
        for(let i=0;i<64;i++){
            if(board[i].content===Pieces.RookAttackZone) board[i].content = Pieces.None
        }
    }



    function drawEndBlock(){
        if(queenMoveCount>=3) return(<div><img src='./img/queen.png' width={"40px"} height={"40px"} alt={""}/> pobeda </div>)
        if(rooksMoveCount>=3) return (<div><img src='./img/rook.png' width={"40px"} height={"40px"} alt={""}/> pobeda </div>)
    }

    function updateBoardFromCopy(board) {
        editBoard(prevState => [...prevState.map((tile) =>
                ({...tile, content: board[boardIdMap.get(tile.id)].content, zones: {...board[boardIdMap.get(tile.id)].zones}})
            )]
        );
    }

    function calcMoveZone(pieceId, boardCopy){
        let moveZonesIds = []
        let newMoveZonesIds = []
        copyBoard(boardCopy)
        if((pieceId===firstRookPosId)||(pieceId===secondRookPosId)){
            let tempRookId = new IdClass(pieceId)
            clearRookWays(boardCopy)
            moveZonesIds = calcRookAttackZones(tempRookId.id, boardCopy).newRookAttackZones
            boardCopy[boardIdMap.get(tempRookId.id)].content = Pieces.Obstacle
            while (moveZonesIds.length>0)
            {
                moveZonesIds.forEach(element => {
                    calcRookAttackZones(element, boardCopy).newRookAttackZones.forEach(element => newMoveZonesIds.push(element))
                })
                moveZonesIds = [];
                moveZonesIds = [...newMoveZonesIds];
                newMoveZonesIds = [];
            }
            boardCopy[boardIdMap.get(tempRookId.id)].content = Pieces.Rook
            boardCopy.forEach(element =>
            {
                if((pieceId===firstRookPosId)&&(element.content===Pieces.RookAttackZone)){
                    element.zones = {...element.zones, firstRookMoveZone: true}
                }
                if((pieceId===secondRookPosId)&&(element.content===Pieces.RookAttackZone)){
                    element.zones = {...element.zones, secondRookMoveZone: true}
                }
            })
        }

    }

    function boardClick(e) {




        let tempFirstRookPosId = firstRookPosId;
        let tempSecondRookPosId = secondRookPosId;

        let boardCopy = []

        copyBoard(boardCopy)

        let testF = false;
        if(testF){
            boardCopy[boardIdMap.get(e.target.id)].content = Pieces.Obstacle
            updateBoardFromCopy(boardCopy)
            return
        }

        clearWays(boardCopy)
        clearRookWays(boardCopy)
        if(tempFirstRookPosId!==Pieces.None) calcRookAttackZones(tempFirstRookPosId, boardCopy)
        if(tempSecondRookPosId!==Pieces.None) calcRookAttackZones(tempSecondRookPosId, boardCopy)


        if ((e.target.tagName === "IMG")&&
            (!e.target.parentNode.className.includes(Pieces.Dot)
                &&!e.target.parentNode.className.includes(Pieces.MarkedRook)
                &&!e.target.parentNode.className.includes(Pieces.MarkedQueen)
            )) {
            if (e.target.parentNode.className.includes(Pieces.Queen)) {
                grabPiece({type: Pieces.Queen, posId: e.target.parentNode.id})
                showWays(e.target.parentNode.id, boardCopy)
            }
            if (e.target.parentNode.className.includes(Pieces.Rook)&&(!e.target.parentNode.className.includes(Pieces.MarkedRook))){
                console.log(e.target.parentNode.className)
                grabPiece({type: Pieces.Rook, posId: e.target.parentNode.id})
                showWays(e.target.parentNode.id, boardCopy)
            }
        } else {
            if ((grabbedPiece.type !== Pieces.None)
                &&
                (e.target.parentNode.className.includes(Pieces.Dot)
                    ||e.target.parentNode.className.includes(Pieces.MarkedRook)
                    ||(e.target.parentNode.className.includes(Pieces.MarkedQueen)))
            ) {
                if(grabbedPiece.type===Pieces.Rook){
                    if(grabbedPiece.posId===firstRookPosId){
                        tempFirstRookPosId = e.target.parentNode.id;
                    }
                    if(grabbedPiece.posId===secondRookPosId){
                        tempSecondRookPosId = e.target.parentNode.id;
                    }
                    setRooksMoveCount(prevState => prevState+1)
                }
                else setQueenMoveCount(prevState => prevState+1)

                if(e.target.parentNode.id===firstRookPosId){
                    tempFirstRookPosId = Pieces.None;
                }
                if(e.target.parentNode.id===secondRookPosId){
                    tempSecondRookPosId = Pieces.None;
                }
                movePiece(e.target.parentNode.id, grabbedPiece.type, boardCopy)
                clearRookWays(boardCopy)
                clearWays(boardCopy)

                if(tempFirstRookPosId!==Pieces.None) calcRookAttackZones(tempFirstRookPosId, boardCopy)
                if(tempSecondRookPosId!==Pieces.None) calcRookAttackZones(tempSecondRookPosId, boardCopy)


                setFirstRookPosId(tempFirstRookPosId)
                setSecondRookPosId(tempSecondRookPosId)
            }
        }

        updateBoardFromCopy(boardCopy)
    }

    function test(e) {
        let boardCopy = []
        copyBoard(boardCopy)
        calcMoveZone(firstRookPosId, boardCopy)
        console.log(boardCopy)
        updateBoardFromCopy(boardCopy)
    }

    useEffect(() =>{
        let boardCopy = []
        copyBoard(boardCopy)
        placeObstacles(n, boardCopy)
        calcRookAttackZones(firstRookPosId, boardCopy)
        calcRookAttackZones(secondRookPosId, boardCopy)
        updateBoardFromCopy(boardCopy)
    }, [])

    return (
        <div>
            <div onClick={e => boardClick(e)} className="board">
                {chessBoard.map((obj, i) => {
                    let tile = obj.id
                    //Красим доску
                    return (<Tile
                        id={tile}
                        color={(i % 2 + Math.floor((i) / 8) % 2) % 2 === 0 ? 'lightblue' : 'darksalmon'}
                        key={tile}
                        value={obj.content}
                        zones={obj.zones}>
                    </Tile>)
                })
                }
            </div>
            <div className={"testing"}>
                <h1>QueenPosId: {queenPosId}</h1>
                <h1>GrabbedPieceType: {grabbedPiece.type} GrabbedPiecePosId: {grabbedPiece.posId}</h1>
                <h1>QueenMoveCount: {queenMoveCount}</h1>
                <h1>RooksMoveCount: {rooksMoveCount}</h1>
                <button onClick={test}>TEST</button>
                {drawEndBlock()}
            </div>
        </div>

    );
};

export default Board;
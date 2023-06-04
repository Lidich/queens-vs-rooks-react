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

    const startPieceStrategy = {
        PlayerQueen: 1,
        PlayerRook: 2,
        ComputerF1: 100,
        ComputerF2: 101,
        ComputerL1: 200,
        ComputerL2: 201
    }

    const [queenStrat, setQueenStrat] = useState(startPieceStrategy.PlayerQueen)

    const [rooksStrat, setRooksStrat] = useState(startPieceStrategy.PlayerRook)

    const [startGameFlag, setStartGameFlag] = useState(false)

    const boardIdMap = new Map();

    const [resetGameFlag, setResetGameFlag] = useState(0)

    const [inputText, setInputText] = useState("")

    const [whiteMoveFlag, setWhiteMoveFlag] = useState(true)

    const [queenMoveCount, setQueenMoveCount] = useState(0)

    const [rooksMoveCount, setRooksMoveCount] = useState(0)

    const [queenPosId, setQueenPosId] = useState("e1")

    const [firstRookPosId, setFirstRookPosId] = useState('a8')

    const [secondRookPosId, setSecondRookPosId] = useState('h8')


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
        }
    }

    function generateStartBorderArray(){
        let startBorderArray = []

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
                    startBorderArray.push({id: id,
                        content: Pieces.Queen,
                        zones: {...Zones.None}
                    })
                    //chessBoardCopy.push({id: id, content: Pieces.Queen})
                }
                else {
                    //Rooks
                    if((id === "a8")||(id === "h8")) {
                        startBorderArray.push({id: id,
                            content: Pieces.Rook,
                            zones: {...Zones.None}
                        })
                        //chessBoardCopy.push({id: id, content: Pieces.Rook})
                    }
                    else {
                        //Obstacles
                        startBorderArray.push({id: id,
                            content: Pieces.None,
                            zones: {...Zones.None}
                        })
                        //chessBoardCopy.push({id: id, content: "none"})
                    }
                }
            }
        }

        return(startBorderArray)
    }

    function populateEmptyBoard(board){
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
                if (id === "e1") {
                    board.push({id: id,
                        content: Pieces.Queen,
                        zones: {...Zones.None}
                    })
                    //chessBoardCopy.push({id: id, content: Pieces.Queen})
                }
                else {
                    //Rooks
                    if((id === "a8")||(id === "h8")) {
                        board.push({id: id,
                            content: Pieces.Rook,
                            zones: {...Zones.None}
                        })
                        //chessBoardCopy.push({id: id, content: Pieces.Rook})
                    }
                    else {
                        //Obstacles
                        board.push({id: id,
                            content: Pieces.None,
                            zones: {...Zones.None}
                        })
                        //chessBoardCopy.push({id: id, content: "none"})
                    }
                }
            }
        }
    }

    const [chessBoard, editBoard] = useState(generateStartBorderArray)



    const [grabbedPiece, grabPiece] = useState({type: Pieces.None, posId: "none"});

    // 0 - game continues
    // 1 - queen wins
    // 2 - rooks win
    const [endGameFlag, setEndgameFlag] = useState(0)

    //number of obstacles
    const [n, setNumberOfObstacles] = useState(25)

    const [tempN, setTempN] = useState(n)

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



    /*
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
     */

    function copyBoard(board){
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

    function copyBoardFrom(target, source){
        if(target.length>2){
            for(let i=0;i<64;i++){
                target[i] = {id: source[i].id, content: source[i].content, zones: {...source[i].zones}}
            }
        }
        else {
            for(let i=0;i<64;i++){
                target.push({id: source[i].id, content: source[i].content, zones: {...source[i].zones}})
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
            board[boardIdMap.get(chessBoardShuffleSlice[i].id)]=chessBoardShuffleSlice[i];
        }
    }

    function updateBoardSingle(idSearch, newContent, board) {
      board[boardIdMap.get(idSearch)].content = newContent
    }

    function movePiece(newPosId, grabbedPieceType, grabbedPieceId, board) {
        let initialType = grabbedPieceType
        if (initialType !== Pieces.None) {
            updateBoardSingle(newPosId, initialType, board);
            updateBoardSingle(grabbedPieceId, Pieces.Obstacle, board)
        }
    }

    function getItemFromBoard(id, board){
        return(board[boardIdMap.get(id)])
    }

    function markRook(id, board){
        if(id === Pieces.None) return

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
                || (itemFromBoard.content===Pieces.MarkedRook)
            )
            {
                if(itemFromBoard.content===Pieces.Queen) getItemFromBoard(id, board).content = Pieces.MarkedRook
                    tempId = new IdClass(startId.id)
                break
            }
            else {
                if(tempId.idNumber===8){
                    tempId = new IdClass(startId.id)
                    break
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
                || (itemFromBoard.content===Pieces.MarkedRook)
            )
            {
                if (itemFromBoard.content===Pieces.Queen) getItemFromBoard(id, board).content = Pieces.MarkedRook
                tempId = new IdClass(startId.id)
                break
            }
            else {
                if(tempId.idNumber===1){
                    tempId = new IdClass(startId.id)
                    break
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
                || (itemFromBoard.content===Pieces.MarkedRook)
            )
            {
                if (itemFromBoard.content===Pieces.Queen) getItemFromBoard(id, board).content = Pieces.MarkedRook
                tempId = new IdClass(startId.id)
                break
            }
            else {
                if(tempId.idLetter==='a'){
                    tempId = new IdClass(startId.id)
                    break
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
                || (itemFromBoard.content===Pieces.MarkedRook)
            )
            {
                if (itemFromBoard.content===Pieces.Queen) getItemFromBoard(id, board).content = Pieces.MarkedRook
                tempId = new IdClass(startId.id)
                break
            }
            else {
                if(tempId.idLetter==='h'){
                    tempId = new IdClass(startId.id)
                    break
                }
            }
        }
    }
    function calcRookAttackZones(id, board){

        if(id === Pieces.None) return

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
                || (itemFromBoard.content===Pieces.MarkedRook)
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
                || (itemFromBoard.content===Pieces.MarkedRook)
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
                || (itemFromBoard.content===Pieces.MarkedRook)
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
                || (itemFromBoard.content===Pieces.MarkedRook)
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

    function isRookProtected(rookId, board, FRID, SRID){
        clearRookWays(board)
        let tempId = new IdClass(rookId)
        let firstRooId = new IdClass(FRID)
        let secondRooId = new IdClass(SRID)

        let res = false

        if(rookId===Pieces.None) return (false)

        if(rookId===FRID){
            calcRookAttackZones(SRID, board)

            if(tempId.idNumber!==8){
                tempId.up()
                if(getItemFromBoard(tempId.id, board).id == SRID) res=true;
                if((firstRooId.idLetter===secondRooId.idLetter)&&(getItemFromBoard(tempId.id, board).content===Pieces.RookAttackZone)) res = true
                else tempId = new IdClass(rookId)
            }


            if(tempId.idNumber!==1){
                tempId.down()
                if(getItemFromBoard(tempId.id, board).id == SRID) res=true;
                if((firstRooId.idLetter===secondRooId.idLetter)&&(getItemFromBoard(tempId.id, board).content===Pieces.RookAttackZone)) res = true
                else tempId = new IdClass(rookId)
            }


            if(tempId.idLetter!=='a'){
                tempId.left()
                if(getItemFromBoard(tempId.id, board).id == SRID) res=true;
                if((firstRooId.idNumber===secondRooId.idNumber)&&(getItemFromBoard(tempId.id, board).content===Pieces.RookAttackZone)) res = true
                else tempId = new IdClass(rookId)
            }


            if(tempId.idLetter!=='h'){
                tempId.right()
                if(getItemFromBoard(tempId.id, board).id == SRID) res=true;
                if((firstRooId.idNumber===secondRooId.idNumber)&&(getItemFromBoard(tempId.id, board).content===Pieces.RookAttackZone)) res = true
                else tempId = new IdClass(rookId)
            }

            calcRookAttackZones(FRID, board)
            res = (res||false)
        }

        if(rookId===SRID){
            calcRookAttackZones(FRID, board)
            tempId.up()
            if(getItemFromBoard(tempId.id, board).id == FRID) res=true;
            if((firstRooId.idLetter===secondRooId.idLetter)&&(getItemFromBoard(tempId.id, board).content===Pieces.RookAttackZone)) res = true
            else tempId = new IdClass(rookId)

            tempId.down()
            if(getItemFromBoard(tempId.id, board).id == FRID) res=true;
            if((firstRooId.idLetter===secondRooId.idLetter)&&(getItemFromBoard(tempId.id, board).content===Pieces.RookAttackZone)) res = true
            else tempId = new IdClass(rookId)

            tempId.left()
            if(getItemFromBoard(tempId.id, board).id == FRID) res=true;
            if((firstRooId.idNumber===secondRooId.idNumber)&&(getItemFromBoard(tempId.id, board).content===Pieces.RookAttackZone)) res = true
            else tempId = new IdClass(rookId)

            tempId.right()
            if(getItemFromBoard(tempId.id, board).id == FRID) res=true;
            if((firstRooId.idNumber===secondRooId.idNumber)&&(getItemFromBoard(tempId.id, board).content===Pieces.RookAttackZone)) res = true
            else tempId = new IdClass(rookId)

            calcRookAttackZones(SRID, board)
            res = (res||false)
        }

        return(res)
    }

    function showWays(id, board, FRID, SRID){
        let startId = new IdClass(id);

        let tempId = new IdClass(id);

        let moveZones = {startMoveZones: [], newMoveZones: []}

        let itemFromBoard = getItemFromBoard(id, board)

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
        else{
            let FRIDclass = new IdClass(FRID)
            let SRIDclass = new IdClass(SRID)
            let QIDclass = new IdClass(startId.id)

            let rookProtectFlag = true;

            if(FRID!==Pieces.None) rookProtectFlag = isRookProtected(FRID, board, FRID, SRID)
            else rookProtectFlag=false;

            //upLoop
            while (startId.id!=='error'){
                tempId.up();
                itemFromBoard = getItemFromBoard(tempId.id, board)
                if((itemFromBoard.content===Pieces.Obstacle)||
                    (itemFromBoard.content===Pieces.Queen)||
                    //(itemFromBoard.content===Pieces.Rook)||
                    (itemFromBoard.content===Pieces.RookAttackZone)||
                    (itemFromBoard.content===Pieces.MarkedRook))
                {
                    tempId = new IdClass(startId.id)
                    break
                }
                else {
                    if(
                        (itemFromBoard.content===Pieces.Rook)
                    ){
                        if(!rookProtectFlag)
                        {
                            itemFromBoard.content = Pieces.MarkedRook
                            tempId = new IdClass(startId.id)
                            break
                        }
                        else {
                            tempId = new IdClass(startId.id)
                            break
                        }
                    }
                    else {
                        if(tempId.idNumber===8){
                            if(itemFromBoard.content!==Pieces.Dot) {
                                itemFromBoard.content = Pieces.Dot
                                moveZones.newMoveZones.push(itemFromBoard.id)
                            }
                            else {
                                moveZones.startMoveZones.push(itemFromBoard.id)
                            }
                            tempId = new IdClass(startId.id)
                            break
                        }
                        if(itemFromBoard.content!==Pieces.Dot) {
                            itemFromBoard.content = Pieces.Dot
                            moveZones.newMoveZones.push(itemFromBoard.id)
                        }
                        else {
                            moveZones.startMoveZones.push(itemFromBoard.id)
                        }
                    }
                }

            }

            //downLoop
            while (startId.id!=='error'){
                tempId.down();
                itemFromBoard = getItemFromBoard(tempId.id, board)
                if((itemFromBoard.content===Pieces.Obstacle)||
                    (itemFromBoard.content===Pieces.Queen)||
                    //itemFromBoard.content===Pieces.Rook)||
                    (itemFromBoard.content===Pieces.RookAttackZone)||
                    (itemFromBoard.content===Pieces.MarkedRook))
                {
                    tempId = new IdClass(startId.id)
                    break
                }
                else {
                    if(itemFromBoard.content===Pieces.Rook){
                        if(!rookProtectFlag)
                        {
                            itemFromBoard.content = Pieces.MarkedRook
                            tempId = new IdClass(startId.id)
                            break
                        }
                        else {
                            tempId = new IdClass(startId.id)
                            break
                        }
                    }
                    else {
                        if(tempId.idNumber===1){
                            if(itemFromBoard.content!==Pieces.Dot) {
                                itemFromBoard.content = Pieces.Dot
                                moveZones.newMoveZones.push(itemFromBoard.id)
                            }
                            else {
                                moveZones.startMoveZones.push(itemFromBoard.id)
                            }
                            tempId = new IdClass(startId.id)
                            break
                        }
                        if(itemFromBoard.content!==Pieces.Dot) {
                            itemFromBoard.content = Pieces.Dot
                            moveZones.newMoveZones.push(itemFromBoard.id)
                        }
                        else {
                            moveZones.startMoveZones.push(itemFromBoard.id)
                        }
                    }
                }
            }

            //leftLoop
            while (startId.id!=='error'){
                tempId.left();
                itemFromBoard = getItemFromBoard(tempId.id, board)
                if((itemFromBoard.content===Pieces.Obstacle)||
                    (itemFromBoard.content===Pieces.Queen)||
                    //itemFromBoard.content===Pieces.Rook)||
                    (itemFromBoard.content===Pieces.RookAttackZone)||
                    (itemFromBoard.content===Pieces.MarkedRook))
                {
                    tempId = new IdClass(startId.id)
                    break
                }
                else {
                    if(itemFromBoard.content===Pieces.Rook){
                        if(!rookProtectFlag)
                        {
                            itemFromBoard.content = Pieces.MarkedRook
                            tempId = new IdClass(startId.id)
                            break
                        }
                        else {
                            tempId = new IdClass(startId.id)
                            break
                        }
                    }
                    else {
                        if(tempId.idLetter==='a'){
                            if(itemFromBoard.content!==Pieces.Dot) {
                                itemFromBoard.content = Pieces.Dot
                                moveZones.newMoveZones.push(itemFromBoard.id)
                            }
                            else {
                                moveZones.startMoveZones.push(itemFromBoard.id)
                            }
                            tempId = new IdClass(startId.id)
                            break
                        }
                        if(itemFromBoard.content!==Pieces.Dot) {
                            itemFromBoard.content = Pieces.Dot
                            moveZones.newMoveZones.push(itemFromBoard.id)
                        }
                        else {
                            moveZones.startMoveZones.push(itemFromBoard.id)
                        }
                    }
                }
            }

            //rightLoop
            while (startId.id!=='error'){
                tempId.right();
                itemFromBoard = getItemFromBoard(tempId.id, board)
                if((itemFromBoard.content===Pieces.Obstacle)||
                    (itemFromBoard.content===Pieces.Queen)||
                    //(itemFromBoard.content===Pieces.Rook)||
                    (itemFromBoard.content===Pieces.RookAttackZone)||
                    (itemFromBoard.content===Pieces.MarkedRook))
                {
                    tempId = new IdClass(startId.id)
                    break
                }
                else {
                    if(itemFromBoard.content===Pieces.Rook){
                        if(!rookProtectFlag)
                        {
                            itemFromBoard.content = Pieces.MarkedRook
                            tempId = new IdClass(startId.id)
                            break
                        }
                        else {
                            tempId = new IdClass(startId.id)
                            break
                        }
                    }
                    else {
                        if(tempId.idLetter==='h'){
                            if(itemFromBoard.content!==Pieces.Dot) {
                                itemFromBoard.content = Pieces.Dot
                                moveZones.newMoveZones.push(itemFromBoard.id)
                            }
                            else {
                                moveZones.startMoveZones.push(itemFromBoard.id)
                            }
                            tempId = new IdClass(startId.id)
                            break
                        }
                        if(itemFromBoard.content!==Pieces.Dot) {
                            itemFromBoard.content = Pieces.Dot
                            moveZones.newMoveZones.push(itemFromBoard.id)
                        }
                        else {
                            moveZones.startMoveZones.push(itemFromBoard.id)
                        }
                    }
                }
            }

            //leftUp loop
            if((startId.idNumber!==8)&&(startId.idLetter!=='a')){
                while (startId.id!=='error'){
                    tempId.left();
                    tempId.up();
                    itemFromBoard = getItemFromBoard(tempId.id, board)
                    if((itemFromBoard.content===Pieces.Obstacle)||
                        (itemFromBoard.content===Pieces.Queen)||
                        //itemFromBoard.content===Pieces.Rook)||
                        (itemFromBoard.content===Pieces.RookAttackZone)||
                        (itemFromBoard.content===Pieces.MarkedRook))
                    {
                        tempId = new IdClass(startId.id)
                        break
                    }
                    else {
                        if(itemFromBoard.content===Pieces.Rook){
                            if(!rookProtectFlag)
                            {
                                itemFromBoard.content = Pieces.MarkedRook
                                tempId = new IdClass(startId.id)
                                break
                            }
                            else {
                                tempId = new IdClass(startId.id)
                                break
                            }
                        }
                        else {
                            if((tempId.idLetter==='a')||(tempId.idNumber===8)){
                                if(itemFromBoard.content!==Pieces.Dot) {
                                    itemFromBoard.content = Pieces.Dot
                                    moveZones.newMoveZones.push(itemFromBoard.id)
                                }
                                else {
                                    moveZones.startMoveZones.push(itemFromBoard.id)
                                }
                                tempId = new IdClass(startId.id)
                                break
                            }
                            if(itemFromBoard.content!==Pieces.Dot) {
                                itemFromBoard.content = Pieces.Dot
                                moveZones.newMoveZones.push(itemFromBoard.id)
                            }
                            else {
                                moveZones.startMoveZones.push(itemFromBoard.id)
                            }
                        }

                    }
                }
            }


            //leftDown loop
            if((startId.idNumber!==1)&&(startId.idLetter!=='a')){
                while (startId.id!=='error'){
                    tempId.left();
                    tempId.down();
                    itemFromBoard = getItemFromBoard(tempId.id, board)
                    if((itemFromBoard.content===Pieces.Obstacle)||
                        (itemFromBoard.content===Pieces.Queen)||
                        //itemFromBoard.content===Pieces.Rook)||
                        (itemFromBoard.content===Pieces.RookAttackZone)||
                        (itemFromBoard.content===Pieces.MarkedRook))
                    {
                        tempId = new IdClass(startId.id)
                        break
                    }
                    else {
                        if(itemFromBoard.content===Pieces.Rook){
                            if(!rookProtectFlag)
                            {
                                itemFromBoard.content = Pieces.MarkedRook
                                tempId = new IdClass(startId.id)
                                break
                            }
                            else {
                                tempId = new IdClass(startId.id)
                                break
                            }
                        }
                        else {
                            if((tempId.idLetter==='a')||(tempId.idNumber===1)){
                                if(itemFromBoard.content!==Pieces.Dot) {
                                    itemFromBoard.content = Pieces.Dot
                                    moveZones.newMoveZones.push(itemFromBoard.id)
                                }
                                else {
                                    moveZones.startMoveZones.push(itemFromBoard.id)
                                }
                                tempId = new IdClass(startId.id)
                                break
                            }
                            if(itemFromBoard.content!==Pieces.Dot) {
                                itemFromBoard.content = Pieces.Dot
                                moveZones.newMoveZones.push(itemFromBoard.id)
                            }
                            else {
                                moveZones.startMoveZones.push(itemFromBoard.id)
                            }
                        }

                    }
                }
            }


            //rightDown loop
            if((startId.idNumber!==1)&&(startId.idLetter!=='h')){
                while (startId.id!=='error'){
                    tempId.right();
                    tempId.down();
                    itemFromBoard = getItemFromBoard(tempId.id, board)
                    if((itemFromBoard.content===Pieces.Obstacle)||
                        (itemFromBoard.content===Pieces.Queen)||
                        //itemFromBoard.content===Pieces.Rook)||
                        (itemFromBoard.content===Pieces.RookAttackZone)||
                        (itemFromBoard.content===Pieces.MarkedRook))
                    {
                        tempId = new IdClass(startId.id)
                        break
                    }
                    else {
                        if(itemFromBoard.content===Pieces.Rook){
                            if(!rookProtectFlag)
                            {
                                itemFromBoard.content = Pieces.MarkedRook
                                tempId = new IdClass(startId.id)
                                break
                            }
                            else {
                                tempId = new IdClass(startId.id)
                                break
                            }
                        }
                        else {
                            if((tempId.idLetter==='h')||(tempId.idNumber===1)){
                                if(itemFromBoard.content!==Pieces.Dot) {
                                    itemFromBoard.content = Pieces.Dot
                                    moveZones.newMoveZones.push(itemFromBoard.id)
                                }
                                else {
                                    moveZones.startMoveZones.push(itemFromBoard.id)
                                }
                                tempId = new IdClass(startId.id)
                                break
                            }
                            if(itemFromBoard.content!==Pieces.Dot) {
                                itemFromBoard.content = Pieces.Dot
                                moveZones.newMoveZones.push(itemFromBoard.id)
                            }
                            else {
                                moveZones.startMoveZones.push(itemFromBoard.id)
                            }
                        }

                    }
                }
            }


            //rightUp loop
            if((startId.idNumber!==8)&&(startId.idLetter!=='h')){
                while (startId.id!=='error'){
                    tempId.right();
                    tempId.up();
                    itemFromBoard = getItemFromBoard(tempId.id, board)
                    if((itemFromBoard.content===Pieces.Obstacle)||
                        (itemFromBoard.content===Pieces.Queen)||
                        //itemFromBoard.content===Pieces.Rook)||
                        (itemFromBoard.content===Pieces.RookAttackZone)||
                        (itemFromBoard.content===Pieces.MarkedRook))
                    {
                        tempId = new IdClass(startId.id)
                        break
                    }
                    else {
                        if(itemFromBoard.content===Pieces.Rook){
                            if(!rookProtectFlag)
                            {
                                itemFromBoard.content = Pieces.MarkedRook
                                tempId = new IdClass(startId.id)
                                break
                            }
                            else {
                                tempId = new IdClass(startId.id)
                                break
                            }
                        }
                        else {
                            if((tempId.idLetter==='h')||(tempId.idNumber===8)){
                                if(itemFromBoard.content!==Pieces.Dot) {
                                    itemFromBoard.content = Pieces.Dot
                                    moveZones.newMoveZones.push(itemFromBoard.id)
                                }
                                else {
                                    moveZones.startMoveZones.push(itemFromBoard.id)
                                }
                                tempId = new IdClass(startId.id)
                                break
                            }
                            if(itemFromBoard.content!==Pieces.Dot) {
                                itemFromBoard.content = Pieces.Dot
                                moveZones.newMoveZones.push(itemFromBoard.id)
                            }
                            else {
                                moveZones.startMoveZones.push(itemFromBoard.id)
                            }
                        }

                    }
                }
            }

            if(!rookProtectFlag) {
                markRook(FRID, board)
                markRook(SRID, board)
            }
        }
        return(moveZones)
    }

    function clearWays(board) {
        for(let i=0;i<64;i++){
            if(board[i].content===Pieces.MarkedRook) board[i].content = Pieces.Rook
            if(board[i].content===Pieces.MarkedQueen) board[i].content = Pieces.Queen
            if(board[i].content===Pieces.Dot) board[i].content = Pieces.None
        }
    }

    function clearRookWays(board) {
        for(let i=0;i<64;i++){
            if(board[i].content===Pieces.RookAttackZone) board[i].content = Pieces.None
        }
    }

    function refreshPage() {
        window.location.reload(false);
    }

    function resetGame(){
        setQueenStrat(startPieceStrategy.PlayerQueen)
        setRooksStrat(startPieceStrategy.PlayerRook)
        setResetGameFlag(0)
        return
    }

    function replayGame(){
        setResetGameFlag(resetGameFlag+1)
    }

    function drawEndBlock(){
        if(endGameFlag===1) return(
            <div className={"endBlock"}>
                <img className={"endBlock-Image"} src='./img/queen.png' width={"40px"} height={"40px"} alt={""}/>
                Победа ферзя
                <br/>
                <button className={"btn"} onClick={resetGame}>Изменить настройки</button>
                <button className={"btn"} onClick={replayGame}>Реванш</button>
            </div>
        )

        if(endGameFlag===2) return(
            <div className={"endBlock"}>
                <img className={"endBlock-Image"} src='./img/rook.png' width={"40px"} height={"40px"} alt={""}/>
                Победа ладей
                <br/>
                <button className={"btn"} onClick={resetGame}>Изменить настройки</button>
                <button className={"btn"} onClick={replayGame}>Реванш</button>
            </div>
        )
        else return
    }

    function updateBoardFromCopy(board) {
        editBoard(prevState => [...prevState.map((tile) =>
                ({...tile, content: board[boardIdMap.get(tile.id)].content, zones: {...board[boardIdMap.get(tile.id)].zones}})
            )]
        );
    }

    function calcAllZones(board, queenID, firstRookID, secondRookID){
        if(firstRookID!==Pieces.None) calcMoveZone(firstRookID, board, queenID, firstRookID, secondRookID)
        if(secondRookID!==Pieces.None) calcMoveZone(secondRookID, board, queenID, firstRookID, secondRookID)
        calcMoveZone(queenID, board, queenID, firstRookID, secondRookID)
    }

    function clearMoveZones(board){
        board.forEach(element =>
        element.zones = {...Zones.None})
    }

    function calcMoveZone(pieceId, boardCopy, queenID, firstRookID, secondRookID){
        let moveZonesIds = []
        let newMoveZonesIds = []

        if((pieceId===firstRookID)||(pieceId===secondRookID)){
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
                if((pieceId===firstRookID)&&(element.content===Pieces.RookAttackZone)){
                    element.zones = {...element.zones, firstRookMoveZone: true}
                }
                if((pieceId===secondRookID)&&(element.content===Pieces.RookAttackZone)){
                    element.zones = {...element.zones, secondRookMoveZone: true}
                }
            })
            clearRookWays(boardCopy)
            calcRookAttackZones(firstRookID, boardCopy)
            calcRookAttackZones(secondRookID, boardCopy)
        }

        if((pieceId)===queenID){
            clearWays(boardCopy)
            moveZonesIds = showWays(pieceId, boardCopy, firstRookID, secondRookID).newMoveZones
            boardCopy[boardIdMap.get(pieceId)].content = Pieces.Obstacle
            while (moveZonesIds.length>0){
                moveZonesIds.forEach(element => {
                    showWays(element, boardCopy, firstRookID, secondRookID).newMoveZones.forEach(element => newMoveZonesIds.push(element))
                })
                moveZonesIds = [];
                moveZonesIds = [...newMoveZonesIds];
                newMoveZonesIds = [];
            }
            boardCopy[boardIdMap.get(pieceId)].content = Pieces.Queen
            boardCopy.forEach(element =>
            {
                if(element.content===Pieces.Dot){
                    element.zones = {...element.zones, queenMoveZone: true}
                }
            })
            clearWays(boardCopy)
        }
    }

    function checkAccessibilityByQueen(posId, board, FRID, SRID){
        let tempId = new IdClass(posId)

        tempId.up()
        if(getItemFromBoard(tempId.id, board).zones.queenMoveZone) return(true)
        else tempId = new IdClass(posId)

        tempId.down()
        if(getItemFromBoard(tempId.id, board).zones.queenMoveZone) return(true)
        else tempId = new IdClass(posId)

        tempId.left()
        if(getItemFromBoard(tempId.id, board).zones.queenMoveZone) return(true)
        else tempId = new IdClass(posId)

        tempId.right()
        if(getItemFromBoard(tempId.id, board).zones.queenMoveZone) return(true)
        else tempId = new IdClass(posId)

        tempId.leftUp()
        if(getItemFromBoard(tempId.id, board).zones.queenMoveZone) return(true)
        else tempId = new IdClass(posId)

        tempId.leftDown()
        if(getItemFromBoard(tempId.id, board).zones.queenMoveZone) return(true)
        else tempId = new IdClass(posId)

        tempId.rightUp()
        if(getItemFromBoard(tempId.id, board).zones.queenMoveZone) return(true)
        else tempId = new IdClass(posId)

        tempId.rightDown()
        if(getItemFromBoard(tempId.id, board).zones.queenMoveZone) return(true)
        else tempId = new IdClass(posId)

        return (false)
    }

    function checkAccessibilityByFirstRook(posId, board, FRID, SRID){
        let tempId = new IdClass(posId)
        let itemFromBoard = getItemFromBoard(tempId.id, board)

        tempId.up()
        itemFromBoard = getItemFromBoard(tempId.id, board)
        if((itemFromBoard.id===FRID)
            ||(itemFromBoard.zones.firstRookMoveZone)) return true
        else tempId = new IdClass(posId)

        tempId.down()
        itemFromBoard = getItemFromBoard(tempId.id, board)
        if((itemFromBoard.id===FRID)
            ||(itemFromBoard.zones.firstRookMoveZone)) return true
        else tempId = new IdClass(posId)

        tempId.left()
        itemFromBoard = getItemFromBoard(tempId.id, board)
        if((itemFromBoard.id===FRID)
            ||(itemFromBoard.zones.firstRookMoveZone)) return true
        else tempId = new IdClass(posId)

        tempId.right()
        itemFromBoard = getItemFromBoard(tempId.id, board)
        if((itemFromBoard.id===FRID)
            ||(itemFromBoard.zones.firstRookMoveZone)) return true
        else tempId = new IdClass(posId)

        return (false)
    }

    function checkAccessibilityBySecondRook(posId, board, FRID, SRID){
        let tempId = new IdClass(posId)
        let itemFromBoard = getItemFromBoard(tempId.id, board)

        tempId.up()
        itemFromBoard = getItemFromBoard(tempId.id, board)
        if((itemFromBoard.id===SRID)
            ||(itemFromBoard.zones.secondRookMoveZone)) return true
        else tempId = new IdClass(posId)

        tempId.down()
        itemFromBoard = getItemFromBoard(tempId.id, board)
        if((itemFromBoard.id===SRID)
            ||(itemFromBoard.zones.secondRookMoveZone)) return true
        else tempId = new IdClass(posId)

        tempId.left()
        itemFromBoard = getItemFromBoard(tempId.id, board)
        if((itemFromBoard.id===SRID)
            ||(itemFromBoard.zones.secondRookMoveZone)) return true
        else tempId = new IdClass(posId)

        tempId.right()
        itemFromBoard = getItemFromBoard(tempId.id, board)
        if((itemFromBoard.id===SRID)
            ||(itemFromBoard.zones.secondRookMoveZone)) return true
        else tempId = new IdClass(posId)

        return (false)
    }

    function    areWaysBetweenPiecesConsist(board, QID, FRID, SRID) {
       //check queen accessibility
        if ((checkAccessibilityByFirstRook(QID, board, FRID, SRID))
            &&(checkAccessibilityBySecondRook(QID, board, FRID, SRID))
        &&(checkAccessibilityByFirstRook(SRID, board, FRID, SRID))){
            //console.log("Пути между ладьями и ферзём существуют")
            return(true)
        }
        else {
            //console.log("Пути между ладьями и ферзём не существуют")
            return(false)
        }
    }

    function isThisRookEatebleNow(rookId, board, QID, FRID, SRID){
        if(rookId===Pieces.None) return (true)
        let res = false
        if(rookId===FRID){
            if(isRookProtected(FRID, board, FRID, SRID)) res = false
            else {
                showWays(QID, board, FRID, SRID)
                if(getItemFromBoard(FRID, board).content===Pieces.MarkedRook) res = true
                clearWays(board)
            }
        }
        if(rookId===SRID){
            if(isRookProtected(SRID, board, FRID, SRID)) res = false
            else {
                showWays(QID, board, FRID, SRID)
                if(getItemFromBoard(SRID, board).content===Pieces.MarkedRook) res = true
                clearWays(board)
            }
        }
        return res
    }

    function getFirstRookMoveZones(board, firstRookID) {
        let firstRookMoveZones = []
        board.forEach(element => {if(element.zones.firstRookMoveZone) firstRookMoveZones.push(element.id)})
        return(firstRookMoveZones)
    }

    function getSecondRookMoveZones(board, secondRookID) {
        let secondRookMoveZones = []
        board.forEach(element => {if(element.zones.secondRookMoveZone) secondRookMoveZones.push(element.id)})
        return(secondRookMoveZones)
    }

    function getQueenMoveZones(board, queenID) {
        let queenMoveZones = []
        board.forEach(element => {if(element.zones.queenMoveZone) queenMoveZones.push(element.id)})
        return(queenMoveZones)
    }

    function getRookAttackZones(board){
        let rookAttackZones = []
        board.forEach(element=>{if(element.content===Pieces.RookAttackZone) rookAttackZones.push(element.id)})
        return(rookAttackZones)
    }

    function didTheRooksWin(board, QID,  FRID, SRID){
        let res = false;
        if((getQueenMoveZones(board, QID).length===0)
            &&(!isThisRookEatebleNow(FRID, board,QID,FRID,SRID))
            &&(!isThisRookEatebleNow(SRID, board,QID,FRID,SRID))
        ) {
            res = true
        }
        return res
    }

    function checkWinCondition(board, QID, FRID, SRID){
        if(!whiteMoveFlag){
            if(didTheRooksWin(board, QID, FRID, SRID)){
                return(2)
            }
            if(queenMoveCount===15) return (1)
        }
        if(getRookAttackZones(board).length===0) return (1)
        if((!whiteMoveFlag)&&(rooksMoveCount===15))return (1)
        if((FRID===Pieces.None)&&(SRID===Pieces.None)) return (1)
        if((whiteMoveFlag)&&(queenMoveCount===15)) return (1)
        return (0)
    }

    function bestRooksMove(board, QID, FRID, SRID){
        let bestRooksMove = {initialRookId: FRID, bestMove: Pieces.None}
        let tempQueenMoveZones = getQueenMoveZones(board, QID)
        let tempRookAttackZones = []
        let minQueenMoveZones = 100

        let boardCopy = []
        copyBoardFrom(boardCopy, board)


        if(FRID!==Pieces.None){
            clearRookWays(board)
            calcRookAttackZones(FRID, board)
            tempRookAttackZones = getRookAttackZones(board)
            if((bestRooksMove.bestMove===Pieces.None)&&(tempRookAttackZones.length>0)){
                bestRooksMove.bestMove=tempRookAttackZones[0];
                bestRooksMove.initialRookId=FRID
            }
            tempRookAttackZones.forEach(element=>{
                copyBoardFrom(boardCopy, board)
                movePiece(element, Pieces.Rook, FRID, boardCopy)
                clearMoveZones(boardCopy)
                calcRookAttackZones(element, boardCopy)
                if(SRID!==Pieces.None) calcRookAttackZones(SRID, boardCopy)
                calcAllZones(boardCopy,QID,element,SRID)
                tempQueenMoveZones = getQueenMoveZones(boardCopy, QID)
                if(

                        (isThisRookEatebleNow(element, boardCopy, QID, element, SRID))
                        ||(SRID===Pieces.None)
                        ||(isThisRookEatebleNow(SRID, boardCopy, QID, element, SRID))

                );
                else {
                    if(tempQueenMoveZones.length<=minQueenMoveZones){
                        minQueenMoveZones = tempQueenMoveZones.length
                        bestRooksMove.initialRookId = FRID
                        bestRooksMove.bestMove = element
                    }
                }
            })
        }

        if(SRID!==Pieces.None){
            clearRookWays(board)
            calcRookAttackZones(SRID, board)
            tempRookAttackZones = getRookAttackZones(board)
            if((bestRooksMove.bestMove===Pieces.None)&&(tempRookAttackZones.length>0)){
                bestRooksMove.bestMove=tempRookAttackZones[0];
                bestRooksMove.initialRookId=SRID
            }
            tempRookAttackZones.forEach(element=>{
                copyBoardFrom(boardCopy, board)
                movePiece(element, Pieces.Rook, SRID, boardCopy)
                clearMoveZones(boardCopy)
                calcRookAttackZones(element, boardCopy)
                if(FRID!==Pieces.None) calcRookAttackZones(FRID, boardCopy)
                calcAllZones(boardCopy,QID,FRID,element)
                tempQueenMoveZones = getQueenMoveZones(boardCopy, QID)
                if(

                    (isThisRookEatebleNow(element, boardCopy, QID, FRID, element))
                    ||(FRID===Pieces.None)
                    ||(isThisRookEatebleNow(FRID, boardCopy, QID, FRID, element))

                );
                else {
                    if(tempQueenMoveZones.length<=minQueenMoveZones){
                        minQueenMoveZones = tempQueenMoveZones.length
                        bestRooksMove.initialRookId = SRID
                        bestRooksMove.bestMove = element
                    }
                }
            })
        }

        return(bestRooksMove)

    }

    function bestRooksMoveL2(board, QID, FRID, SRID){
        let bestRooksMove = {initialRookId: FRID, bestMove: Pieces.None}
        let tempRookAttackZones = []

        let tempFRattackZones = [];
        let tempSRattackZones = [];

        clearRookWays(board)
        if(FRID!==Pieces.None){
            calcRookAttackZones(FRID, board)
            tempFRattackZones = getRookAttackZones(board)
        }

        clearRookWays(board)
        if(SRID!==Pieces.None){
            calcRookAttackZones(SRID, board)
            tempSRattackZones = getRookAttackZones(board)
        }

        let maxRookAttackZones = 0

        let tempCount = 0;

        let boardCopy = []
        copyBoardFrom(boardCopy, board)


        if(FRID!==Pieces.None){
            clearRookWays(board)
            calcRookAttackZones(FRID, board)
            tempRookAttackZones = getRookAttackZones(board)
            if((bestRooksMove.bestMove===Pieces.None)&&(tempRookAttackZones.length>0)){
                bestRooksMove.bestMove=tempRookAttackZones[0];
                bestRooksMove.initialRookId=FRID
            }
            tempRookAttackZones.forEach(element=>{
                copyBoardFrom(boardCopy, board)
                movePiece(element, Pieces.Rook, FRID, boardCopy)
                clearMoveZones(boardCopy)
                calcRookAttackZones(element, boardCopy)
                if(SRID!==Pieces.None) calcRookAttackZones(SRID, boardCopy)
                if(
                    (isThisRookEatebleNow(element, boardCopy, QID, element, SRID))
                    ||(SRID===Pieces.None)
                    ||(isThisRookEatebleNow(SRID, boardCopy, QID, element, SRID))

                );
                else {
                    if(getRookAttackZones(boardCopy).length>=maxRookAttackZones){
                        maxRookAttackZones = getRookAttackZones(boardCopy).length
                        bestRooksMove.initialRookId = FRID
                        bestRooksMove.bestMove = element
                    }
                }
            })
        }

        if(SRID!==Pieces.None){
            clearRookWays(board)
            calcRookAttackZones(SRID, board)
            tempRookAttackZones = getRookAttackZones(board)
            if((bestRooksMove.bestMove===Pieces.None)&&(tempRookAttackZones.length>0)){
                bestRooksMove.bestMove=tempRookAttackZones[0];
                bestRooksMove.initialRookId=SRID
            }
            tempRookAttackZones.forEach(element=>{
                copyBoardFrom(boardCopy, board)
                movePiece(element, Pieces.Rook, SRID, boardCopy)
                clearMoveZones(boardCopy)
                calcRookAttackZones(element, boardCopy)
                if(FRID!==Pieces.None) calcRookAttackZones(FRID, boardCopy)
                if(
                    (isThisRookEatebleNow(element, boardCopy, QID, FRID, element))
                    ||(FRID===Pieces.None)
                    ||(isThisRookEatebleNow(FRID, boardCopy, QID, FRID, element))

                );
                else {
                    if(getRookAttackZones(boardCopy).length>=maxRookAttackZones){
                        maxRookAttackZones = getRookAttackZones(boardCopy).length
                        bestRooksMove.initialRookId = SRID
                        bestRooksMove.bestMove = element
                    }
                }
            })
        }

        return(bestRooksMove)
    }

    function clearBoard(board){
        for(let i=0;i<64;i++){
            if(board[i].content===Pieces.MarkedRook) board[i].content = Pieces.Rook
            if(board[i].content===Pieces.MarkedQueen) board[i].content = Pieces.Queen
            if(board[i].content===Pieces.Dot) board[i].content = Pieces.None
            if(board[i].content===Pieces.RookAttackZone) board[i].content = Pieces.None
            board[i].zones = {...Zones.None};
        }
    }

    function fillBoard(board, QID, FRID, SRID){
        if(FRID!==Pieces.None) calcRookAttackZones(FRID, board)
        if(SRID!==Pieces.None) calcRookAttackZones(SRID, board)
        calcAllZones(board, QID, FRID, SRID)
    }

    function getQueenWays(board){
        let queenWays = []
        for(let i=0;i<64;i++){
            if((board[i].content===Pieces.Dot)||(board[i].content===Pieces.MarkedRook)) queenWays.push(board[i].id)
        }
        return(queenWays)
    }

    function getFirstRookMoveZones(board){
        let firstRookMoveZones = []
        for(let i=0;i<64;i++){
            if(board[i].zones.firstRookMoveZone) firstRookMoveZones.push(board[i].id)
        }
        return(firstRookMoveZones)
    }

    function getSecondRookMoveZones(board){
        let secondRookMoveZones = []
        for(let i=0;i<64;i++){
            if(board[i].zones.secondRookMoveZone) secondRookMoveZones.push(board[i].id)
        }
        return(secondRookMoveZones)
    }

    function bestQueenMoveF1(board, QID, FRID, SRID){
        let bestQueenMove = {initialQueenId: QID, bestMove: Pieces.None}

        let initialBoard = []
        copyBoardFrom(initialBoard, board)

        let tempFirstRookMoveZones = []
        if(FRID!==Pieces.None) tempFirstRookMoveZones = getFirstRookMoveZones(board)


        let tempSecondRookMoveZones = []
        if (SRID!==Pieces.None) tempSecondRookMoveZones = getSecondRookMoveZones(board)

        let minRooksMoveZones = tempFirstRookMoveZones.length+tempSecondRookMoveZones.length

        showWays(QID, board, FRID, SRID)
        let queenWays = getQueenWays(board)
        clearWays(board)

        //move calc
        for(let i=0;i<queenWays.length;i++){
            let element = queenWays[i];

            if(getItemFromBoard(element, board).content===Pieces.Rook){
                bestQueenMove.bestMove = element;
                if(element===FRID) FRID=Pieces.None;
                if(element===SRID) SRID=Pieces.None;
                break;
            }

            movePiece(element, Pieces.Queen, QID, board)
            clearBoard(board)
            fillBoard(board, element, FRID, SRID)
            if(FRID!==Pieces.None) tempFirstRookMoveZones = getFirstRookMoveZones(board)
            if(SRID!==Pieces.None) tempSecondRookMoveZones = getSecondRookMoveZones(board)

            if(minRooksMoveZones>=(tempFirstRookMoveZones.length+tempSecondRookMoveZones.length)) {
                minRooksMoveZones = tempFirstRookMoveZones.length+tempSecondRookMoveZones.length
                bestQueenMove.initialQueenId = QID
                bestQueenMove.bestMove = element
            }
            copyBoardFrom(board, initialBoard)
        }

        return(bestQueenMove)

    }

    function bestQueenMoveF2(board, QID, FRID, SRID){
        let bestQueenMove = {initialQueenId: QID, bestMove: Pieces.None}

        let queenMoveZones = getQueenMoveZones(board, QID)
        let tempQueenMoveZones = [...queenMoveZones]
        let maxCount = 0;

        let initialBoard = []
        copyBoardFrom(initialBoard, board)

        showWays(QID, board, FRID, SRID)
        let queenWays = getQueenWays(board)
        clearWays(board)

        //move calc
        for(let i=0;i<queenWays.length;i++){
            let element = queenWays[i];

            if(getItemFromBoard(element, board).content===Pieces.Rook){
                bestQueenMove.bestMove = element;
                if(element===FRID) FRID=Pieces.None;
                if(element===SRID) SRID=Pieces.None;
                break;
            }

            movePiece(element, Pieces.Queen, QID, board)
            clearBoard(board)
            fillBoard(board, element, FRID, SRID)

            tempQueenMoveZones = getQueenMoveZones(board, QID)

            if(maxCount<=(tempQueenMoveZones.length)) {
                maxCount = tempQueenMoveZones.length
                bestQueenMove.initialQueenId = QID
                bestQueenMove.bestMove = element
            }
            copyBoardFrom(board, initialBoard)
        }

        return(bestQueenMove)
    }


    function makebestQueenMove(board, sQID, sFRID, sSRID){
        //if(!whiteMoveFlag) return;
        let boardCopy = board
        //copyBoard(boardCopy)
        let QID = sQID
        let FRID = sFRID
        let SRID = sSRID
        let bestQueenMove = {initialQueenId: QID, bestMove: Pieces.None}
        clearBoard(boardCopy)
        fillBoard(boardCopy, QID, FRID, SRID)

        let returnObj = {QID: QID, FRID: FRID, SRID: SRID, initialQueenId: QID, bestMove: Pieces.None}


        showWays(QID, boardCopy, FRID, SRID)
        let queenWays = getQueenWays(boardCopy)
        clearWays(boardCopy)

        if((bestQueenMove.bestMove===Pieces.None)&&(queenWays.length>0)) bestQueenMove.bestMove=queenWays[0]
        else {
            return(returnObj)
        }


        if(queenStrat==startPieceStrategy.ComputerF1) bestQueenMove = bestQueenMoveF1(boardCopy, QID, FRID, SRID)
        if(queenStrat==startPieceStrategy.ComputerF2) bestQueenMove = bestQueenMoveF2(boardCopy, QID, FRID, SRID)

        if(bestQueenMove.bestMove===FRID) FRID=Pieces.None;
        if(bestQueenMove.bestMove===SRID) SRID=Pieces.None;


        //make move
        movePiece(bestQueenMove.bestMove, Pieces.Queen, QID, boardCopy)
        clearBoard(boardCopy)
        fillBoard(boardCopy, bestQueenMove.bestMove, FRID, SRID)

        returnObj = {QID: bestQueenMove.bestMove, FRID: FRID, SRID: SRID, initialQueenId: QID, bestMove: bestQueenMove.bestMove}

        return(returnObj)


        /*
        setQueenPosId(bestQueenMove.bestMove)
        setFirstRookPosId(FRID)
        setSecondRookPosId(SRID)
        setQueenMoveCount(queenMoveCount+1)
        setWhiteMoveFlag(!whiteMoveFlag)
        setEndgameFlag(checkWinCondition(boardCopy, bestQueenMove.bestMove, FRID, SRID))
        updateBoardFromCopy(boardCopy)
         */
    }


    function bestQueenMoveBtnClick(){
        let boardCopy = []
        copyBoard(boardCopy)
        let tempInfo = makebestQueenMove(boardCopy, queenPosId, firstRookPosId, secondRookPosId)
        setQueenPosId(tempInfo.bestMove)
        setFirstRookPosId(tempInfo.FRID)
        setSecondRookPosId(tempInfo.SRID)
        setQueenMoveCount(queenMoveCount+1)
        setWhiteMoveFlag(!whiteMoveFlag)
        setEndgameFlag(checkWinCondition(boardCopy, tempInfo.bestMove, tempInfo.FRID, tempInfo.SRID))
        updateBoardFromCopy(boardCopy)
    }

    function makebestRooksMove(board, QID, FRID, SRID){
        let boardCopy = board
        let tempFRID = FRID
        let tempSRID = SRID

        clearMoveZones(boardCopy)
        calcAllZones(boardCopy, QID, tempFRID, tempSRID)

        let bestMove = {initialRookId: tempFRID, bestMove: Pieces.None}


        if(rooksStrat==startPieceStrategy.ComputerL1) {
            bestMove = bestRooksMove(boardCopy,QID,tempFRID,tempSRID)
        }
        if(rooksStrat==startPieceStrategy.ComputerL2) {
            bestMove = bestRooksMoveL2(boardCopy,QID,tempFRID,tempSRID)
        }

        let returnObj = {QID: QID, FRID: FRID, SRID: SRID, initialRookId: tempFRID, bestMove: bestMove.bestMove}

        if(bestMove.bestMove===Pieces.None){
            return(returnObj);
        }

        if(bestMove.initialRookId===tempFRID) tempFRID = bestMove.bestMove
        else tempSRID = bestMove.bestMove

        movePiece(bestMove.bestMove, Pieces.Rook, bestMove.initialRookId,boardCopy)

        clearMoveZones(boardCopy)
        calcAllZones(boardCopy,QID,tempFRID,tempSRID)
        if(tempFRID!==Pieces.None) calcRookAttackZones(tempFRID, boardCopy)
        if(tempSRID!==Pieces.None) calcRookAttackZones(tempSRID, boardCopy)

        returnObj = {QID: QID, FRID: tempFRID, SRID: tempSRID, initialRookId: bestMove.initialRookId, bestMove: bestMove.bestMove}

        return(returnObj)


    }

    function bestRooksMoveBtnClick(){
        let boardCopy = []
        copyBoard(boardCopy)
        let tempInfo = makebestRooksMove(boardCopy, queenPosId, firstRookPosId, secondRookPosId)

        setWhiteMoveFlag(!whiteMoveFlag)
        setFirstRookPosId(tempInfo.FRID)
        setSecondRookPosId(tempInfo.SRID)

        setRooksMoveCount(rooksMoveCount+1)
        setEndgameFlag(checkWinCondition(boardCopy, tempInfo.QID, tempInfo.FRID, tempInfo.SRID))
        updateBoardFromCopy(boardCopy)
    }

    function inputChanged(e){
        if(e.target.value>=30) e.target.value = 30
        if(e.target.value<=10) e.target.value = 10
        setInputText(e.target.value)
        setTempN(e.target.value)
        setNumberOfObstacles(e.target.value)
    }

    function changeNumberBtnClick(e){
        setTempN(inputText)
        setResetGameFlag(!resetGameFlag)
    }

    function boardClick(e) {
        if(endGameFlag>0) return;

        let tempFirstRookPosId = firstRookPosId;
        let tempSecondRookPosId = secondRookPosId;
        let tempQueenPosId = queenPosId;
        let boardCopy = []
        copyBoard(boardCopy)

        let testF = false;
        if(testF){
            boardCopy[boardIdMap.get(e.target.id)].content = Pieces.Obstacle
            updateBoardFromCopy(boardCopy)
            return
        }

        clearMoveZones(boardCopy)
        clearWays(boardCopy)
        clearRookWays(boardCopy)
        if(tempFirstRookPosId!==Pieces.None) calcRookAttackZones(tempFirstRookPosId, boardCopy)
        if(tempSecondRookPosId!==Pieces.None) calcRookAttackZones(tempSecondRookPosId, boardCopy)

        if ((e.target.tagName === "IMG")&&
            (!e.target.parentNode.className.includes(Pieces.Dot)
                &&!e.target.parentNode.className.includes(Pieces.MarkedRook)
                &&!e.target.parentNode.className.includes(Pieces.MarkedQueen)
            )) {

            if (
                (e.target.parentNode.className.includes(Pieces.Queen))
                &&(whiteMoveFlag)
            ) {
                grabPiece({type: Pieces.Queen, posId: e.target.parentNode.id})
                showWays(e.target.parentNode.id, boardCopy, tempFirstRookPosId, tempSecondRookPosId)
            }
            if (
                e.target.parentNode.className.includes(Pieces.Rook)
                &&(!e.target.parentNode.className.includes(Pieces.MarkedRook))
                &&(!whiteMoveFlag)
            ){
                grabPiece({type: Pieces.Rook, posId: e.target.parentNode.id})
                showWays(e.target.parentNode.id, boardCopy, tempFirstRookPosId, tempSecondRookPosId)
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
                if(grabbedPiece.type === Pieces.Queen) tempQueenPosId=e.target.parentNode.id
                movePiece(e.target.parentNode.id, grabbedPiece.type, grabbedPiece.posId, boardCopy)
                clearRookWays(boardCopy)
                clearWays(boardCopy)


                if(tempFirstRookPosId!==Pieces.None) calcRookAttackZones(tempFirstRookPosId, boardCopy)
                if(tempSecondRookPosId!==Pieces.None) calcRookAttackZones(tempSecondRookPosId, boardCopy)

                calcAllZones(boardCopy, tempQueenPosId, tempFirstRookPosId, tempSecondRookPosId)

                setWhiteMoveFlag(!whiteMoveFlag)
                setEndgameFlag(checkWinCondition(boardCopy,tempQueenPosId,tempFirstRookPosId,tempSecondRookPosId))

                grabPiece({type: Pieces.None, posId: "none"})
                setQueenPosId(tempQueenPosId)
                setFirstRookPosId(tempFirstRookPosId)
                setSecondRookPosId(tempSecondRookPosId)
            }
        }
        updateBoardFromCopy(boardCopy)
    }

    function test(e) {
        let boardCopy = []
        copyBoard(boardCopy)
        updateBoardFromCopy(boardCopy)
    }

    useEffect(() =>{
        if (resetGameFlag==0) return;
        let boardCopy = []

        let startArray = []

        let QID = "e1"
        let FRID = "a8"
        let SRID = "h8"

        populateEmptyBoard(startArray)
        copyBoardFrom(boardCopy, startArray)

        while (true){
            if(tempN===n)placeObstacles(n, boardCopy)
            else {
                placeObstacles(tempN, boardCopy)
                setNumberOfObstacles(tempN)
            }
            calcRookAttackZones(FRID, boardCopy)
            calcRookAttackZones(SRID, boardCopy)
            calcAllZones(boardCopy, QID, FRID, SRID)
            if(areWaysBetweenPiecesConsist(boardCopy, QID, FRID, SRID)) break
            else copyBoardFrom(boardCopy, startArray)
            //else copyBoard(boardCopy)
        }

        setRooksMoveCount(0)
        setQueenMoveCount(0)
        setEndgameFlag(0)
        setWhiteMoveFlag(true)
        setQueenPosId(QID)
        setFirstRookPosId(FRID)
        setSecondRookPosId(SRID)
        updateBoardFromCopy(boardCopy)
    }, [resetGameFlag])

    function queenStratSelectChanged(e){
        setQueenStrat(e.target.value)
    }

    function rooksStratSelectChanged(e){
        setRooksStrat(e.target.value)
    }

    function localcheckWinCondition(board, QID, FRID ,SRID, QmoveCount, RmoveCount, whiteMoveFlagL){
        if(!whiteMoveFlagL){
            if(didTheRooksWin(board, QID, FRID, SRID)){
                return(2)
            }
            if(QmoveCount===15) return (1)
        }
        if(getRookAttackZones(board).length===0) return (1)
        if((!whiteMoveFlagL)&&(RmoveCount===15))return (1)
        if((FRID===Pieces.None)&&(SRID===Pieces.None)) return (1)
        if((whiteMoveFlagL)&&(QmoveCount===15)) return (1)
        return (0)
    }

    function playComputerMatchClick(e){
        let boardCopy = []
        copyBoard(boardCopy)
        let QID = queenPosId;
        let FRID = firstRookPosId;
        let SRID = secondRookPosId;
        let tempQinfo = {QID: QID, FRID: FRID, SRID: SRID, initialQueenId: QID, bestMove: Pieces.None}
        let tempRinfo = {QID: QID, FRID: FRID, SRID: SRID, initialRookId: FRID, bestMove: Pieces.None}
        let whiteMoveFlagL = true;
        let QmoveCount = 0;
        let RmoveCount = 0;

        let k = 0;




        while(localcheckWinCondition(boardCopy, tempRinfo.QID, tempRinfo.FRID, tempRinfo.SRID, QmoveCount, RmoveCount, whiteMoveFlagL)===0){
            k++
            if(k===20){
                console.log("k==20")
                break
            }
            tempQinfo = makebestQueenMove(boardCopy, tempRinfo.QID, tempRinfo.FRID, tempRinfo.SRID);
            QmoveCount++;
            whiteMoveFlagL=false;
            if(tempQinfo.bestMove===Pieces.None) {
                setEndgameFlag(2)
                updateBoardFromCopy(boardCopy)
                return
            }
            if(localcheckWinCondition(boardCopy, tempQinfo.QID, tempQinfo.FRID, tempQinfo.SRID, QmoveCount, RmoveCount, whiteMoveFlagL)!==0) {
                QID = tempQinfo.bestMove;
                FRID = tempQinfo.FRID;
                SRID = tempQinfo.SRID;
                setEndgameFlag(localcheckWinCondition(boardCopy, QID, FRID, SRID, QmoveCount, RmoveCount, whiteMoveFlagL))
                updateBoardFromCopy(boardCopy)
                return
            }
            tempRinfo = makebestRooksMove(boardCopy, tempQinfo.bestMove, tempQinfo.FRID, tempQinfo.SRID);
            whiteMoveFlagL=true;
            RmoveCount++;
            if(tempRinfo.bestMove===Pieces.None) {
                QID = tempRinfo.bestMove;
                FRID = tempRinfo.FRID;
                SRID = tempRinfo.SRID;
                setEndgameFlag(localcheckWinCondition(boardCopy, QID, FRID, SRID, QmoveCount, RmoveCount, whiteMoveFlagL))
                updateBoardFromCopy(boardCopy)
                return
            }
        }

        QID = tempRinfo.bestMove;
        FRID = tempRinfo.FRID;
        SRID = tempRinfo.SRID;
        setEndgameFlag(localcheckWinCondition(boardCopy, QID, FRID, SRID, QmoveCount, RmoveCount, whiteMoveFlagL))
        updateBoardFromCopy(boardCopy)
        return
    }

    return (
        resetGameFlag>0
        ? (<div className={"boardComponent"}>
                <div className={"board-left"}>
                    <div className={"board-left-tile"}>8</div>
                    <div className={"board-left-tile"}>7</div>
                    <div className={"board-left-tile"}>6</div>
                    <div className={"board-left-tile"}>5</div>
                    <div className={"board-left-tile"}>4</div>
                    <div className={"board-left-tile"}>3</div>
                    <div className={"board-left-tile"}>2</div>
                    <div className={"board-left-tile"}>1</div>
                </div>
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
                <div className={"testing"} >
                    <div className={"inGameBlock"+" whiteMoveFlagIS"+endGameFlag}>
                        <h1 className={"whiteMoveFlag"}>{whiteMoveFlag ? "ход белых" : "ход чёрных"} </h1>
                        <h1 className={"moveCount"}>Количество ходов ферзя: {queenMoveCount}</h1>
                        <h1 className={"moveCount"}>Количество ходов ладей: {rooksMoveCount}</h1>


                        {
                            (whiteMoveFlag)&&(queenStrat!=1)&&(rooksStrat==2)
                                ? <button className={"computerMoveBtn btn"} onClick={bestQueenMoveBtnClick}>Сделать ход компьютера за ферзя</button>
                                : <></>
                        }
                        {
                                (!whiteMoveFlag)&&(rooksStrat!=2)&&(queenStrat==1)
                                ? <button className={"computerMoveBtn btn"} onClick={bestRooksMoveBtnClick}>Сделать ход компьютера за ладью</button>
                                : <></>
                        }
                        {
                            (queenMoveCount==0)&&(queenStrat>1)&&(rooksStrat>2)
                            ? <button className={"btn"} onClick={playComputerMatchClick}>Сыграть партию между компьютерами</button>
                                : <></>
                        }


                    </div>
                    {drawEndBlock()}

                </div>

                <div className={"board-bottom-corner"}>1</div>
                <div className={"board-bottom"}>
                    <div className={"board-bottom-tile"}>a</div>
                    <div className={"board-bottom-tile"}>b</div>
                    <div className={"board-bottom-tile"}>c</div>
                    <div className={"board-bottom-tile"}>d</div>
                    <div className={"board-bottom-tile"}>e</div>
                    <div className={"board-bottom-tile"}>f</div>
                    <div className={"board-bottom-tile"}>g</div>
                    <div className={"board-bottom-tile"}>h</div>
                </div>
            </div>)
            : (
                <div className={"startGameConfig"}>
                    <div className={"startGameConfig-title"}><h1 className={"GameTitle"}>QueenVsRooks</h1></div>
                    <div className={"startGameConfig-settings"}>
                        <div className={"QueenSettings"}>За ферзя играет:
                            <select className={"computer-human-select"} onChange={queenStratSelectChanged}>
                                <option value={startPieceStrategy.PlayerQueen}>Человек</option>
                                <option value={startPieceStrategy.ComputerF1}>Компьютер</option>
                            </select>
                            {queenStrat>1
                                ? (
                                    <select onChange={queenStratSelectChanged}>
                                        <option value={startPieceStrategy.ComputerF1}>Стратегия: БОРЬБА ЗА ВЛАСТЬ</option>
                                        <option value={startPieceStrategy.ComputerF2}>Стратегия: ЗАСТЕНЧИВАЯ КОРОЛЕВА</option>
                                    </select>
                                )
                                : <></>
                            }
                        </div>
                        <div className={"RooksSettings"}>За ладей играет:
                            <select className={"computer-human-select"} onChange={rooksStratSelectChanged}>
                                <option value={startPieceStrategy.PlayerRook}>Человек</option>
                                <option value={startPieceStrategy.ComputerL1}>Компьютер</option>
                            </select>
                            {rooksStrat>2
                                ? (
                                    <select onChange={rooksStratSelectChanged}>
                                        <option value={startPieceStrategy.ComputerL1}>Стратегия: ФЕРЗЬ В ТИСКАХ</option>
                                        <option value={startPieceStrategy.ComputerL2}>Стратегия: ЛАДЬИ АРТИЛЛЕРИСТЫ</option>
                                    </select>
                                )
                                : <></>
                            }
                        </div>
                        <div className={"ObstaclesSettings"}>
                            Количество препятствий: <input placeholder={tempN} type={"number"} min={"10"} max={"30"} onChange={inputChanged}/>
                            <span> (по умолчанию 25)</span>
                        </div>
                    </div>


                    <button className={"btn startGameConfig-startBtn"} onClick={() => {
                        setResetGameFlag(1)
                    }}>Начать игру</button>
                </div>
            )
    );
};

export default Board;


//TESTING RENDER BLOCK
/*
<h1>QueenPosId: {queenPosId}</h1>
<h1>GrabbedPieceType: {grabbedPiece.type} GrabbedPiecePosId: {grabbedPiece.posId}</h1>
<button onClick={test}>TEST</button>

<div className={"obstaclesBlock"}>
                            <h3>Количество препятствий: {n}</h3>
                            <div><button onClick={changeNumberBtnClick} className={"btn"}>Изменить</button>
                                <input placeholder={tempN} type={"number"} min={"10"} max={"30"} onChange={inputChanged}/></div>
                        </div>
 */
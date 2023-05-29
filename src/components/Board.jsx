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

    const boardIdMap = new Map();

    const [whiteMoveFlag, setWhiteMoveFlag] = useState(true)

    const [queenMoveCount, setQueenMoveCount] = useState(0)

    const [rooksMoveCount, setRooksMoveCount] = useState(0)

    const [chessBoard, editBoard] = useState(chessBoardTemp);

    const [queenPosId, setQueenPosId] = useState("e1")

    const [firstRookPosId, setFirstRookPosId] = useState('a8')

    const [secondRookPosId, setSecondRookPosId] = useState('h8')

    const [grabbedPiece, grabPiece] = useState({type: Pieces.None, posId: "none"});

    // 0 - game continues
    // 1 - queen wins
    // 2 - rooks win
    const [endGameFlag, setEndgameFlag] = useState(0)

    //number of obstacles
    const n = 22

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

    function movePiece(newPosId, grabbedPieceType, grabbedPieceId, board) {
        let initialType = grabbedPieceType
        if (initialType !== Pieces.None) {
            //if (initialType === Pieces.Queen) setQueenPosId(grabbedPiece.posId);
            updateBoardSingle(newPosId, initialType, board);
            updateBoardSingle(grabbedPieceId, Pieces.Obstacle, board)
            //grabPiece({type: Pieces.None, posId: "none"})
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

        //(getItemFromBoard(id, board).content===Pieces.Queen)
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
            //editBoard(prevState => [...prevState])

            if(!rookProtectFlag) {
                markRook(FRID, board)
                markRook(SRID, board)
            }
        }
        return(moveZones)
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
        if(endGameFlag===1) return(<div><img src='./img/queen.png' width={"40px"} height={"40px"} alt={""}/> pobeda {endGameFlag}</div>)
        if(endGameFlag===2) return (<div><img src='./img/rook.png' width={"40px"} height={"40px"} alt={""}/> pobeda {endGameFlag}</div>)
        else return (<div>vuz {endGameFlag}</div>)
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

        //copyBoard(boardCopy)

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
            console.log("Пути между ладьями и ферзём существуют")
            return(true)
        }
        else {
            console.log("Пути между ладьями и ферзём не существуют")
            return(false)
        }
    }

    function isThisRookEatebleNow(rookId, board, QID, FRID, SRID){
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
        ) res = true
        return res
    }

    function checkWinCondition(board, QID, FRID, SRID){
        if(didTheRooksWin(board, QID, FRID, SRID)){
            return(2)
        }
        if(getRookAttackZones(board).length===0) return (1)
        if(queenMoveCount===15) return (1)
        if(rooksMoveCount===15) return (1)
        if((FRID===Pieces.None)&&(SRID===Pieces.None)) return (1)
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


    function bestQueenMoveBtnClick(){
        if(!whiteMoveFlag) return;
        let boardCopy = []
        copyBoard(boardCopy)
        let QID = queenPosId
        let FRID = firstRookPosId
        let SRID = secondRookPosId
        let bestQueenMove = {initialQueenId: QID, bestMove: Pieces.None}
        clearBoard(boardCopy)
        fillBoard(boardCopy, QID, FRID, SRID)

        let tempFirstRookMoveZones = []
        if(FRID!==Pieces.None) tempFirstRookMoveZones = getFirstRookMoveZones(boardCopy)


        let tempSecondRookMoveZones = []
        if (SRID!==Pieces.None) tempSecondRookMoveZones = getSecondRookMoveZones(boardCopy)

        let minRooksMoveZones = tempFirstRookMoveZones.length+tempSecondRookMoveZones.length

        showWays(QID, boardCopy, FRID, SRID)
        let queenWays = getQueenWays(boardCopy)
        clearWays(boardCopy)

        if((bestQueenMove.bestMove===Pieces.None)&&(queenWays.length>0)) bestQueenMove.bestMove=queenWays[0]
        else {
            console.log("ходов для ферзя нет")
            setEndgameFlag(2)
            return
        }

        //move calc
        for(let i=0;i<queenWays.length;i++){
            let element = queenWays[i];

            if(getItemFromBoard(element, boardCopy).content===Pieces.Rook){
                bestQueenMove.bestMove = element;
                if(element===FRID) FRID=Pieces.None;
                if(element===SRID) SRID=Pieces.None;
                break;
            }

            movePiece(element, Pieces.Queen, QID, boardCopy)
            clearBoard(boardCopy)
            fillBoard(boardCopy, element, FRID, SRID)
            if(FRID!==Pieces.None) tempFirstRookMoveZones = getFirstRookMoveZones(boardCopy)
            if(SRID!==Pieces.None) tempSecondRookMoveZones = getSecondRookMoveZones(boardCopy)

            if(minRooksMoveZones>=(tempFirstRookMoveZones.length+tempSecondRookMoveZones.length)) {
                minRooksMoveZones = tempFirstRookMoveZones.length+tempSecondRookMoveZones.length
                bestQueenMove.initialQueenId = QID
                bestQueenMove.bestMove = element
            }
            copyBoard(boardCopy)
        }


        //make move
        movePiece(bestQueenMove.bestMove, Pieces.Queen, QID, boardCopy)
        clearBoard(boardCopy)
        fillBoard(boardCopy, bestQueenMove.bestMove, FRID, SRID)
        setQueenPosId(bestQueenMove.bestMove)
        setFirstRookPosId(FRID)
        setSecondRookPosId(SRID)
        setQueenMoveCount(queenMoveCount+1)
        setWhiteMoveFlag(!whiteMoveFlag)
        setEndgameFlag(checkWinCondition(boardCopy, QID, FRID, SRID))
        updateBoardFromCopy(boardCopy)
    }

    function bestRooksMoveBtnClick(){
        if(whiteMoveFlag) return;
        let boardCopy = []
        let tempFRID = firstRookPosId
        let tempSRID = secondRookPosId
        copyBoard(boardCopy)
        clearMoveZones(boardCopy)
        calcAllZones(boardCopy, queenPosId, tempFRID, tempSRID)
        let bestMove = bestRooksMove(boardCopy,queenPosId,tempFRID,tempSRID)
        if(bestMove.bestMove===Pieces.None){
            console.log("Ходов для ладей не осталось")
            setEndgameFlag(1)
            return;
        }
        if(bestMove.initialRookId===tempFRID) tempFRID = bestMove.bestMove
        else tempSRID = bestMove.bestMove
        console.log(bestMove)
        movePiece(bestMove.bestMove, Pieces.Rook, bestMove.initialRookId,boardCopy)

        clearMoveZones(boardCopy)
        calcAllZones(boardCopy,queenPosId,tempFRID,tempSRID)
        if(tempFRID!==Pieces.None) calcRookAttackZones(tempFRID, boardCopy)
        if(tempSRID!==Pieces.None) calcRookAttackZones(tempSRID, boardCopy)
        setWhiteMoveFlag(!whiteMoveFlag)
        setFirstRookPosId(tempFRID)
        setSecondRookPosId(tempSRID)

        setRooksMoveCount(rooksMoveCount+1)
        setEndgameFlag(checkWinCondition(boardCopy, queenPosId, tempFRID, tempSRID))
        updateBoardFromCopy(boardCopy)
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
                console.log(e.target.parentNode.className)
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


                setEndgameFlag(checkWinCondition(boardCopy,tempQueenPosId,tempFirstRookPosId,tempSecondRookPosId))
                setWhiteMoveFlag(!whiteMoveFlag)
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
        //console.log("FR protected: "+ isRookProtected(firstRookPosId, boardCopy, firstRookPosId, secondRookPosId))
        //console.log("FR eatable?: "+isThisRookEatebleNow(firstRookPosId,boardCopy,queenPosId,firstRookPosId,secondRookPosId))
        //console.log("SR protected: "+ isRookProtected(secondRookPosId, boardCopy, firstRookPosId, secondRookPosId))
        //console.log("SR eatable?: "+isThisRookEatebleNow(secondRookPosId,boardCopy,queenPosId,firstRookPosId,secondRookPosId))
        markRook(firstRookPosId, boardCopy)
        updateBoardFromCopy(boardCopy)
    }

    useEffect(() =>{
        let boardCopy = []
        copyBoard(boardCopy)

        while (true){
            placeObstacles(n, boardCopy)
            calcRookAttackZones(firstRookPosId, boardCopy)
            calcRookAttackZones(secondRookPosId, boardCopy)
            calcAllZones(boardCopy, queenPosId, firstRookPosId, secondRookPosId)
            if(areWaysBetweenPiecesConsist(boardCopy, queenPosId, firstRookPosId, secondRookPosId)) break
            else copyBoard(boardCopy)
        }

        updateBoardFromCopy(boardCopy)
    }, [])

    return (
        <div className={"boardComponent"}>
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
                    <h1>QueenPosId: {queenPosId}</h1>
                    <h1>GrabbedPieceType: {grabbedPiece.type} GrabbedPiecePosId: {grabbedPiece.posId}</h1>
                    <h1>QueenMoveCount: {queenMoveCount}</h1>
                    <h1>RooksMoveCount: {rooksMoveCount}</h1>
                    <h1>{whiteMoveFlag ? "ход белых" : "ход чёрных"} </h1>
                    <button onClick={test}>TEST</button>
                    {whiteMoveFlag ? <button onClick={bestQueenMoveBtnClick}>bestQueenMoveBtnClick</button> : <button onClick={bestRooksMoveBtnClick}>bestRooksMoveBtnClick</button>}
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
        </div>

    );
};

export default Board;

/*
<button onClick={bestQueenMoveBtnClick}>bestQueenMoveBtnClick</button>
                <button onClick={bestRooksMoveBtnClick}>bestRooksMoveBtnClick</button>
 */
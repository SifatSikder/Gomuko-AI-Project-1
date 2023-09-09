# Gomuko-AI-Project-1
Implementation of Gomuko (5 in a row) board game using minmax and alpha beta pruning algorithm  

# Team Members  
1.Tasnia Haque Esha - BSSE-1205  
2.Sifat Sikder- BSSE-1221  

# Implemented Functions so far  
**printboard(board):** print the board  
**initializeboard/clearboard(board):** flush the board  
**setmove(board,row,col,player):** set a move  
**blanks(board):** find the empty cells and returns an array of indexes  
**boardFull(board):** check whether the board is full or not  
**getScore(board):** if player 1 won then send a positive value else if player 2 won then send a same negative value or else send 0  
**winningplayer(board,player):** check if a particular player has won the game or not based on conditions
**gamewon(board):**  check if the game has been won by any player or not  
**Result print(board):** print the max win/ min win / draw results  
**Game()**  
  Take player choice-1st or 2nd  
  Clear the board  
  Set current player value  
  Play until game is won or board is full  
  Make a move and change the current player  
  When game finished print result  

**Makemove(board,player):**  
Make a move based on the current player
  1. PlayerMove
  2. AI Move

**Playermove(board,1):** fill a row column with 1  

**AI move(board,-1):** if the board is empty start in the middle. If not run minimax algo to get the optimum move (row,column,score). Then set the move on board and print it


# Currently Working On  
Minimax algorithm to generate the AI move

# battleship

Battleship game

Development in progress:

To begin you must press the 'Start New Game' button. The game is played by clicking the 'AI Board' to select a location to try. Immediately after the player move, the AI will generate a random coordinate pair, verify it has not used that pair yet, then checks that against the player's board for a hit.

after sinking all ships (5), the game ends, but not really; An alert displays, but the event listeners are still active and the 'New Game' button doesn't reset the board yet.

TODO:
new game button needs to reset the game boards (visually and the arrays)

designate a way to place specific ships

option to use two human players


*It is all one big file; splitting into modules is something for the future.

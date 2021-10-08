# battleship

Battleship game

Development in progress:

The game starts automatically. The game is played by clicking the 'AI Board' to select a location to try. Immediately after the player move, the AI will generate a random coordinate pair, verify it has not used that pair yet, then checks that against the player's board for a hit.

after sinking all ships (5), the game ends and an alert displays. The 'Start New Game' button refreshes the page, since that is the simplest way to reset all objects, DOM changes, and event listeners.

TODO:
designate a way to place specific ships

option to use two human players


*It is all one big file; splitting into modules is something for the future.

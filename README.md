# battleship

Battleship game

Development in progress:

currently the game is played through the console by using the runGame() command. it creates two players (AI and user) and populates a separate board for each (currently ship placement is hard coded, change will be made in the future), then prompts the player for an X and Y coordinate (separately) and checks if it is a hit against the computer. Immediately after, the AI will generate a random coordinate pair, verify it has not used that pair yet, then checks that against the player's board for a hit.

after sinking all ships (5), the game ends. Currently it ends by manually throwing a custom GAME OVER error; not the best option but it was what I could get working at the time.

TODO:
create UI 

designate a way to place specific ships

option to use two human players


*It is all one big file; splitting into modules is something for the future.
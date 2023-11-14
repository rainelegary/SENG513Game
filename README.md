Course: SENG 513
Date: OCT 12, 2023
Assignment 2
Name: Raine Legary
UCID: 30123317


# Biosphere Brawl

In this ecological war of unmatched intensity, you are met with the coveted role of central commander who controls the hivemind of your invasive plant species in a quest to completely conquer the biosphere and claim it as your own. Using incredibly powerful technology, you have the opportunity to momentarily control the direction of the wind to define the overall conquest direction of your plant species, and may strategically relocate individual units. You also happen to be able to control the characteristics of your invasive species, giving them a higher propensity for conquest and volatility, or greater caution and resilience. With these resources at hand, it's up to you to make a name for yourself as the emperor of the biosphere.


## Details

Platforms: Desktop and Mobile
Genre: Strategy, War


## Game Rules

This is a 2 or 4 player strategy game where players take turns controlling their invasive plant spcies. Each player can do the following on their turn:
- Make the wind travel North, East, South or West
- Modify their plant species to be more defensive or offensive
- Pick up individual units from their army and place new ones elsewhere
- After these parameters are selected, a fully automatic conquest phase takes place
- After the conquest phase, it is the next player's turn

Win Condition
- You win once your plant species is the only one remaining

Game UI and Controls
- The color of the game title indicates whose turn it is
- Click wind direction to change it
- Move Defense / Offense slider to adjust defense and offense stats
- Switch between deploying and gathering units by clicking the "Deploying"/ "Gathering" button
- While in Deploying mode: Click on any empty tile on the board to deploy units there (Costs 20 units per tile)
- While in Gathering mode: Click on a tile you own on the board to remove units from it (Gives back 10 units per tile)

Conquest mechanics
- After each player's turn, a conquest simulation automatically occurs and their plant species attempts to expand, given the parameters chosen by the player.
- The slider value translates to a linear scale between defense and offense. When the slider is on the left extreme, their plant's defense stat is 1 and their offense stat is 0. When the slider is on the right extreme,their defense stat is 0 and their offense stat is 1. Intermediate values are linear interpolations of these extremes. From here onward, we'll refer to the defense and offense defense stats as "o" and "d" in mathematical expressions. An attacker's offense stat is denoted attacker.o and defender's defense stat is denoted defender.d.

For each tile owned by the player during the conquest phase:
- The tile has an (o + 1)/2 chance of attempting conquest.
- If the tile attempts conquest, it has a 50% chance to attack downwind and a 25% chance to attack in the directions perpendicular to the wind, respectively.
- The odds of successful conquest against an enemy is (1 + attacker.o) : (1 + defender.d), resulting in a success probability of (1 + attacker.o) / (2 + attacker.o + defender.d). 
- The odds of successful conquest against an unoccupied space is (1 + attacker.o) : 1, resulting in a success probability of (1 + attacker.o) / (2 + attacker.o).
- If the attack is aimed out of bounds or targeting an already owned tile, then nothing happens.
- After successful conquest, the newly claimed tile will also perform a conquest attempt, and this effect may continue to chain.

Once all of the player's tiles have attempted conquest, some of the player's tiles may decay. Each tile will decay by the following rules:
- For each empty tile that it is adjacent to (shares an edge with), the tile will have a (1 - d) / 30 chance of becoming an empty tile itself, where "d" is the player's defense stat. The number of adjacent tiles that aren't owned by the player will be how many times this decay probability will attempt to erase the tile.


## Animations

When any tile changes color (i.e. successful conquest or tile decay), the old color fades into the next.
The wind direction image will rotate when it changes direction

## Reflection

The first part of this assignment, I did a lot of planning and design. I wanted to keep things nice and simple, while allowing for an original and fun experience. Since the game was required to be on one screen and multiplayer, I wanted to make it turn-based so that only one person had to be at the computer at any given time. I also designed it so that the users would be allowed to see what the other players are doing, as it would be very difficult to hide player actions from each other. For this reason, I decided to make a turn-based, full-knowledge strategy game. I took inspiration from the game Risk, wher each player controls an army with the quest of world domination. The features I added to make it my own, were allowing the user to change the stats of their plant army, and to have limited control over direct attacks, but have a more general, overseeing role by controlling the wind direction and letting it pay out from there. I did not think this was quite enough features and the player may feel a lack of control, so I decided that I'd also include the ability to gather and deploy troops to any location. Throughout this process, I consulting chtaGPT for feature ideas and ideas for what to call the game. I initially aimed to implement a hexagon-based board, but I realized that this was not easy to achieve using CSS, especially as I was a total beginner. To invest more time into the features of the game itself, I opted for a square-based grid. 

In the later planning stages, I also wanted to establish how offense and defense would work in the game. my idea was that offense and defense would introduce a good amount of diplomatic leverage between players. For example, if a player is being teamed up on from both sides, it can resort to a more defensive position and try to wait until the board evolves into a more advantageous layout for expansion opportunities. Once they found their opportunity, they could then choose to go more on offense and try to conquer new land at the right moment. On a finer level, the way I wanted defense to work would be that it would employ a more turtle-like strategy, less likely to succeed in attacks, but more likely to defend successfully. I also wnated the defense mechanic to have higehr stability and be less volatile than an offensive strategy. For this reason, I chose to include a decay feature where players that are high in defense are much less likely to decay. In this way, I thought that it would be interesting to create a distinction between stability and volatility in player strategies. There was a degree of uncertainty in how exactly tehse mechanics would be implemented, so I created a few placehpolder functions to determine how decay and conquest would work, but I would later iron them out as I play-tested the game.

Once the design was complete to this degree, I chose to begin implementation. I created the header first, placing all the required buttons that the user would need. I then created the board, and selected a few UI colors and background images. Once I wa shappy with the appearance, I amde it responsive to allow mobile users to play as well. Now that the UI was complete, I went straigt to implementing the functionality of the buttons and made sure that the UI updated as players switched between turns. Finally, I implemented the conquest and decay simulation methods, and entered the play-testing stage. I noticed that the decay rates were a little high and that it was very difficult to reach a conclusion to the game. I also had to update the functions for conquest and decay, as they made it difficult for players to gain ground consistently. After this, I added in a few simple animations.



## Assets

https://pixabay.com/vectors/arrow-head-right-pointing-40166/
https://www.pexels.com/photo/bird-s-eye-view-of-green-leafed-trees-1144687/
https://www.pexels.com/photo/blue-and-white-sky-2043012/


## Learning Resources

https://www.w3schools.com/howto/howto_js_rangeslider.asp

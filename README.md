Course: SENG 513
Date: OCT 12, 2023
Assignment 2
Name: Raine Legary
UCID: 30123317


# Biosphere Brawl

In this ecological war of unmatched intensity, you are met with the coveted role of being the central commander who controls the hivemind of your invasive plant species in a quest to completely conquer the biosphere and claim it as your own. Using incredibly powerful technology, you have the opportunity to momentarily control the direction of the wind to define the overall conquest direction of your plant species, and may strategically relocate individual units. You also happen to be able to control the characteristics of your invasive species, giving them a higher propensity for conquest and volatility, or greater caution and resilience. With these resources at hand, it's up to you to make a name for yourself as the emperor of the biosphere.


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
- The tile has a sqrt(o) chance of attempting conquest.
- If the tile attempts conquest, it has a 50% chance to attack downwind and a 25% chance to attack in the directions perpendicular to the wind, respectively.
- The odds of successful conquest against an enemy is (1 + attacker.o) : (1 + defender.d), resulting in a success probability of (1 + attacker.o) / (2 + attacker.o + defender.d). 
- The odds of successful conquest against an unoccupied space is (1 + attacker.o) : 1, resulting in a success probability of (1 + attacker.o) / (2 + attacker.o).
- If the attack is aimed out of bounds or targeting an already owned tile, then nothing happens.
- After successful conquest, the newly claimed tile will also perform a conquest attempt, and this effect may continue to chain.

Once all of the player's tiles have attempted conquest, some of the player's tiles may decay. Each tile will decay by the following rules:
- For each empty tile that it is adjacent to (shares an edge with), the tile will have a (1 - d) / 4 chance of becoming an empty tile itself, where "d" is the player's defense stat. The number of adjacent empty tiles will be how many times this 


## Animations

For each conquest attempt, there will be an arrow pointing from the attacking tile to the defending tile.
When any tile changes color (i.e. successful conquest or tile decay), the old color fades into the next.


## Assets

https://pixabay.com/vectors/arrow-head-right-pointing-40166/
https://www.pexels.com/photo/bird-s-eye-view-of-green-leafed-trees-1144687/
https://www.pexels.com/photo/blue-and-white-sky-2043012/


## Learning Resources

https://www.w3schools.com/howto/howto_js_rangeslider.asp

# Rotten Apples

A first-person browser game: hide in your front garden, watch the cars come down the street, and throw apples (or eggs) until the drivers swerve off the road.

**Play:** open `index.html` in a browser, or turn on GitHub Pages (Settings → Pages → deploy from `main`, root folder).

## How to play
- Tap the title screen to start, then pick a day. **Options** has sound, ammo, and a best-score reset
- **Aim** with the mouse or your finger
- **Hold, then release** to throw. Holding longer throws harder, and the dotted arc shows where it's headed
- **E** switches between apples and eggs. **P** pauses. **M** mutes
- Lead the car. Any hit scores, but only a **windshield** hit makes the driver swerve off the road
- Windshield hits, long shots, Camaros and streaks score the most. Crashed cars stay where they land, so keep pelting them
- A grey Cybertruck passes twice each round and is worth 2,300 wherever you hit it
- Hitting a police car costs 400 points

## Traffic
Sedans, hatchbacks, SUVs, pickups, sports cars, a third-generation Camaro, a lifted Ram, taxis on the rooftop, the odd cop, and the Cybertruck.

## Seven days
The game is a seven-day campaign. Every day runs the same loop: the Front Garden, the Treehouse, the Highway Overpass, the Rooftop at Dusk, then home. Your day total is the sum of the four rounds, and you can replay a spot to raise it. Every day is a tad harder: cars a little faster, traffic a little thinner, and the driver who comes for you a little quicker.

| Day | Cars |
|---|---|
| 1 | ×1.00 speed, full traffic |
| 2 | ×1.06 speed, ×0.93 traffic |
| 3 | ×1.12, ×0.86 |
| 4 | ×1.18, ×0.81 |
| 5 | ×1.24, ×0.76 |
| 6 | ×1.30, ×0.71 |
| 7 | ×1.36, ×0.68 |

After the rooftop you head home, and the driver you hit pulls into your driveway sideways with your apple still on the windshield, hops out, and comes at you shouting. You get **two apples**. Hit them before they reach your door to clear the day and unlock the next one. Miss both and you can try the showdown again. The driver looks different every day. Survive all seven showdowns and you win.

Far and fast hits pay more: 7 points a metre of distance, a long-shot bonus past 45 m and a sniper bonus past 70 m, on top of the windshield and streak bonuses.

### The spots
1. **Front Garden**: a quiet two-lane street
2. **The Treehouse**: a farm road seen from up in the oak
3. **Highway Overpass**: six lanes of traffic coming straight at you
4. **Rooftop at Dusk**: a city avenue with headlights on and lots of taxis

Built with [three.js](https://threejs.org) r128. It's one HTML file with no build step.

_Only in the game. Throwing anything at a real car can kill someone._

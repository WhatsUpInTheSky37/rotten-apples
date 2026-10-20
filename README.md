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
The game is a seven-day campaign. Each day is played from one of four spots, and every day the cars get faster and the traffic thinner. Clear the day's target to unlock the next; best scores are saved in your browser.

| Day | Spot | Cars | Target |
|---|---|---|---|
| 1 | Front Garden | ×1.00 speed, full traffic | 1,200 |
| 2 | The Treehouse | ×1.08 | 1,800 |
| 3 | Front Garden | ×1.16 | 2,400 |
| 4 | Highway Overpass | ×1.24 | 3,000 |
| 5 | The Treehouse | ×1.32 | 3,600 |
| 6 | Highway Overpass | ×1.40 | 4,200 |
| 7 | Rooftop at Dusk | ×1.48, thinnest traffic | final |

Hitting the target is only half of it. Once you have, you head home, and the driver you hit pulls into your driveway sideways with your apple still on the windshield, hops out, and comes at you shouting. You get **two apples**. Hit them before they reach your door to clear the day and unlock the next one. Miss both and you can try the showdown again. The driver looks different every day.

Targets stay reachable because far and fast hits pay more: 7 points a metre of distance, a long-shot bonus past 45 m and a sniper bonus past 70 m, on top of the windshield and streak bonuses.

### The spots
1. **Front Garden**: a quiet two-lane street
2. **The Treehouse**: a farm road seen from up in the oak
3. **Highway Overpass**: six lanes of traffic coming straight at you
4. **Rooftop at Dusk**: a city avenue with headlights on and lots of taxis

Built with [three.js](https://threejs.org) r128. It's one HTML file with no build step.

_Only in the game. Throwing anything at a real car can kill someone._

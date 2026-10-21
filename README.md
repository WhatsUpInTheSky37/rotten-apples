# Rotten Apples

A first-person browser game: hide in your front garden, watch the cars come down the street, and throw apples, tomatoes, eggs, corn cobs, watermelons or pumpkins until the drivers swerve off the road.

**Play:** open `index.html` in a browser, or turn on GitHub Pages (Settings → Pages → deploy from `main`, root folder).

## How to play
- Tap the title screen to start, then pick a day. **Options** has sound, ammo, and a best-score reset
- **Aim** with the mouse or your finger
- **Hold, then release** to throw. Holding longer throws harder, and the dotted arc shows where it's headed
- **E** switches ammo, or pick it on the day screen. **P** pauses. **M** mutes
- Only a **direct windshield hit** sends a car off the road. A hit anywhere else just rattles the driver
- **Ammo** trades speed for points: tomatoes are fastest with a quick reload (x0.9 points); apples and eggs are the all-rounders; corn x1.5; watermelons x1.8 and pumpkins x2.2 are slow and heavy but big enough to be easier to land
- Lead the car. Any hit scores, but only a **windshield** hit makes the driver swerve off the road
- Windshield hits, long shots, Camaros and streaks score the most. Crashed cars stay where they land, so keep pelting them
- Three special cars pass twice each round: a grey Cybertruck (2,300), a pink topless Jeep with four girls in it (1,500), and a blue T-top IROC-Z with the tops out and two guys in it (1,500). Each has its own callout when you hit it
- Hitting a police car costs 400 points

## Traffic
Sedans, hatchbacks, SUVs, pickups, sports cars, a third-generation Camaro, a lifted Ram, taxis on the rooftop, the odd cop, and the Cybertruck.

## Seven days
The game is a seven-day campaign. Every day runs the same loop: the Front Garden, the Treehouse, the Highway Overpass, the Rooftop at Dusk, then home. Your day total is the sum of the four rounds, and you can replay a spot to raise it. The in-game menu lists the day's four spots: jump back to any you've reached, or ahead to the next one. Your place in a day is remembered, so the day list offers to continue where you left off. Every day is a tad harder: cars a little faster, traffic a little thinner, and the driver who comes for you a little quicker.

| Day | Cars |
|---|---|
| 1 | ×1.00 speed, full traffic |
| 2 | ×1.06 speed, ×0.93 traffic |
| 3 | ×1.12, ×0.86 |
| 4 | ×1.18, ×0.81 |
| 5 | ×1.24, ×0.76 |
| 6 | ×1.30, ×0.71 |
| 7 | ×1.36, ×0.68 |

After the rooftop you head home, and the driver you hit pulls into your driveway sideways with your apple still on the windshield, hops out, and comes at you shouting. You get **two apples**. Hit them before they reach your door to clear the day and unlock the next one. Miss both and you can try the showdown again. The driver looks different every day. Drop the Day 7 driver and the cops pull in. Two officers walk you to the cruiser and drive off with you. Game over.

Far and fast hits pay more: 7 points a metre of distance, a long-shot bonus past 45 m and a sniper bonus past 70 m, on top of the windshield and streak bonuses.

### The spots
1. **Front Garden**: a quiet two-lane street
2. **The Treehouse**: a farm road seen from up in the oak
3. **Highway Overpass**: six lanes of traffic coming straight at you
4. **Rooftop at Dusk**: a city avenue with headlights on and lots of taxis

Built with [three.js](https://threejs.org) r128. It's one HTML file with no build step.

## Goals
Each spot has a score goal you must reach to move on: 3,000 / 4,000 / 5,000 / 6,000 on Day 1, rising 8% every day (Day 7: 4,500 / 6,000 / 7,500 / 9,000). Reach the rooftop goal to head home for the showdown. Five random special cars show up each round.

## The showdown
At the end of each day the driver you hit pulls into your driveway, gets out and wants revenge. You choose: **Run inside and call your mom** (she comes out with a rolling pin, he apologizes and peels off) or **Take him out** (throw apples until he's down: three hits). Either way, the day is cleared. On Day 7, taking him out ends with the police; Mom keeps you out of it.

## Top scores
Set your name (title screen → Top scores, or Options). When you finish all four spots of a day, your day total is posted to a shared board, one board per day, best score per name. Scores are stored in the `rotten_scores` table in Supabase (anyone can read and add; nobody can edit or delete through the public key).

## Development
It's one HTML file; open it or serve the folder. `npm install && npm test` runs a headless smoke test (hits with every ammo, draw-call budgets on all four spots, both showdown routes and the Day 7 arrest).

Rendering notes: cars are built once per type and merged into a handful of meshes, with every wheel and ground shadow in the scene drawn by one instanced mesh each; static scenery is merged per 150 m of road; splats and flying chunks are instanced. Phones get a 1024 shadow map and start at 1.5x pixel ratio, and the resolution scales down automatically if a second of play averages under ~48 fps.

_Only in the game. Throwing anything at a real car can kill someone._

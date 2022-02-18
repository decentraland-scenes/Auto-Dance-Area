# Auto Dance Area

## Description

Make players dance in a loop when they stand in certain areas of your scene.
When players stand on either of the two checkered platforms, they'll start looping a dance animation.

## Instructions

Open the `danceArea.ts` file. The first thing you'll find is the definition of `danceAreas`, an array with every danceArea definition in the scene. You can customize this to add more areas to this list, or change the size or position of these.

You can also change the `type` of the dance, the following options are available:

- `PredefinedEmote.ROBOT`
- `PredefinedEmote.TIK`
- `PredefinedEmote.TEKTONIK`
- `PredefinedEmote.HAMMER`
- `PredefinedEmote.HEAD_EXPLODDE`
- `PredefinedEmote.HANDS_AIR`
- `PredefinedEmote.DISCO`
- `PredefinedEmote.DAB`
- `all`

> Note: `all` performs random dance animations.

Set the `DEBUG_FLAG` to true to view white cubes where each dance area is at. These are only visible if the scene is in preview mode, not once the scene is deployed.

The `DanceSystem` is active only while a player is inside one of the dance areas. This system loops over a counter that lasts 11 seconds (same length as all the default dance animations). It also sets button event listeners, to trigger the dance animation as soon as the player lets go of any of the movement keys. This is there because dance animations are otherwise interrupted every time the player walks.

## Try it out

**Install the CLI**

Download and install the Decentraland CLI by running the following command:

```
$ npm i -g decentraland
```

**Previewing the scene**

Download this example and navigate to its directory, then run:

```
$  dcl start
```

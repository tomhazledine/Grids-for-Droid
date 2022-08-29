# Grids for Droid

This patch recreates some the functionality of Mutable Instruments' Grids module as a patch for the Droid ecosystem.

1. [Overview](#overview)
2. [Installation](#installation)
3. [The Droid patch](#the-droid-patch)
4. [Customisation](#customisation)

## Overview

The Droid module by [Der Mann Mit Der Machine](https://shop.dermannmitdermaschine.de/pages/droid-universal-cv-processor) is a powerful way to manipulate Control Voltage (CV) in a Eurorack modular synthesiser. It uses scripts (or "circuits") written as a `droid.ini` text file and uploaded to the module via an SD card.

The [Grids](https://mutable-instruments.net/modules/grids/) module, made by Mutable Instruments, is a "Topographic drum sequencer" that outputs three sets of related rhythms (kick/snare/hihat) and switches between different patterns using two pots. The pots combine to create cartesian coordinates used to select patterns in real time.

This is a patch for the Droid that recreates some of the functionality of Grids. Grids is now discontinued and hard to find on the used market. Due to the limitations of both the Droid (RAM becomes a factor when adding too many sequencers) and my own imagination (a.k.a. coding ability), this patch implements a subset of the original Grids' patterns (currently 20 patterns have been included from the original set of 25 in the Grids source code).

## Installation

Copy `droid.ini` onto your Droid's SD card to start.

## The Droid patch

### Inputs

-   `I1`: clock
-   `I2`: reset
-   `I5`: kick density (0v - 5v)
-   `I6`: snare density (0v - 5v)
-   `I7`: hihat density (0v - 5v)

### Outputs

-   `O1`: kick accent
-   `O5`: kick
-   `O2`: snare accent
-   `O6`: snare
-   `O3`: hihat accent
-   `O7`: hihat

### Controls (a.k.a. grid navigation)

-   `P1.1`: selects pattern row (4 options)
-   `P1.2`: selects pattern column (5 options)

```
               ← P1.2 →
      ┌────┬────┬────┬────┬────┐
      │ 01 │ 05 │ 09 │ 13 │ 17 │
      ├────┼────┼────┼────┼────┤
  ↑   │ 02 │ 06 │ 10 │ 14 │ 18 │
 P1.1 ├────┼────┼────┼────┼────┤
  ↓   │ 03 │ 07 │ 11 │ 15 │ 19 │
      ├────┼────┼────┼────┼────┤
      │ 04 │ 08 │ 12 │ 16 │ 20 │
      └────┴────┴────┴────┴────┘
```

## Customisation

> Before you begin make sure you have run the `npm i` command in the project to install all the project depedencies

### Base value customisation

All of the input, output and other control values can be found in the `./droid.config.js` file.

You can change all of these values to ports, controllers or internal patch cables to allow easier integration into your existing Droid patch.

### Patterns

Patterns are stored as an array in `./src/patterns.js`. Each array item is an array of 96 values, ranging from `0` to `255`.

*Note: this patch only uses the first 16 patterns, but all 25 original patterns are included in the array in `patterns.js`.*

The first 32 items of each pattern are the kick beats, the second 32 are the snares, and the final 32 items are the hihat beats.

* A value of `0` means that a trigger will *never* be sent for that step.
* A value of `255` means that a trigger will *always* be sent for that step.
* Values inbetween `0` and `255` will be triggered if they fall above the value of the threshold set by the input CV. I.e. If the CV is 0V then only value of 255 will be played, and if the incoming CV is 5V then every non-zero step will send a trigger.
* Values above `190` (3.75V) will also send an accent trigger.

Once you have made your changes to the patterns or base configuration, you can create a new `droid.ini` file by running the following command:

```
npm start
```

*Note: this will overwrite the existing `droid.ini`*
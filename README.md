# Grids for Droid

This patch recreates some the functionality of Mutable Instruments' "Grids" module.

- [Grids for Droid](#grids-for-droid)
  - [Installation](#installation)
  - [The Droid patch](#the-droid-patch)
    - [Inputs](#inputs)
    - [Outputs](#outputs)
    - [Controls (a.k.a. grid navigation)](#controls-aka-grid-navigation)
  - [Customisation](#customisation)

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

-   `P1.1`: selects pattern column (8 options)
-   `P1.2`: selects pattern column (2 options)

```
                       ← P1.1 →
      ┌────┬────┬────┬────┬────┬────┬────┬────┐
  ↑   │ 01 │ 03 │ 05 │ 07 │ 09 │ 11 │ 13 │ 15 │
 P1.2 ├────┼────┼────┼────┼────┼────┼────┼────┤
  ↓   │ 02 │ 04 │ 06 │ 08 │ 10 │ 12 │ 14 │ 16 │
      └────┴────┴────┴────┴────┴────┴────┴────┘
```

## Customisation

Patterns are stored as an array in `patterns.js`. Each array item is an array of 96 values, ranging from `0` to `255`.

The first 32 items of each pattern are the kick beats, the second 32 are the snares, and the final 32 items are the hihat beats.

* A value of `0` means that a trigger will *never* be sent for that step.
* A value of `255` means that a trigger will *always* be sent for that step.
* Values inbetween `0` and `255` will be triggered if they fall above the value of the threshold set by the input CV. I.e. If the CV is 0V then only value of 255 will be played, and if the incoming CV is 5V then every non-zero step will send a trigger.
* Values above `190` (3.75V) will also send an accent trigger.

Once you have made your changes to the patterns, you can create a new `droid.ini` file by running the following command:

```
node generate-sequences
```

* Note: this will overwrite the existing `droid.ini` *
export const config = {
    inputs: {
        clock: "I1",
        reset: "I2",
        kick_density: "I5",
        snare_density: "I6",
        hihat_density: "I7"
    },
    outputs: {
        kick_accent: "O1",
        kick: "O5",
        snare_accent: "O2",
        snare: "O6",
        hihat_accent: "O3",
        hihat: "O7"
    },
    controls: {
        pattern_row: "P1.1",
        pattern_column: "P1.2"
    },
    max_sequencers: 10
}

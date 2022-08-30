import { patterns } from "./patterns.js";
import { config } from '../droid.config.js'

const { inputs, max_sequencers } = config

export const generate = () => {
    const duplexPatterns = patterns =>
    patterns.reduce((acc, pattern, i) => {
        if (i % 2 === 0) {
            return [...acc, [pattern]];
        }
        const duplex = acc[acc.length - 1];
        const oldAcc = acc.splice(0, acc.length - 1);
        return [...oldAcc, [...duplex, pattern]];
    }, []);

    const extractVoices = pattern => ({
    kick: pattern.slice(0, 32),
    snare: pattern.slice(32, 64),
    hihat: pattern.slice(64, 96),
    });

    const divideVoice = voice =>
    [...Array(Math.ceil(voice.length / 8))].map(_ => voice.splice(0, 8));

    const printSequence = (pattern, slug, n1, n2) => {
    const name = slug.toUpperCase();
    let output = [];
    output.push(`## ${name} ${n1} + ${n2}`);
    output.push(`[sequencer]`);
    output.push(`  clock = ${inputs.clock}`);
    output.push(`  reset = ${inputs.reset}`);
    output.push(`  pitchoutput = _${name}_VALUES_${n1}`);
    output.push(`  cvoutput = _${name}_VALUES_${n2}`);

    const sequencerCount = [0, 1, 2, 3];

    sequencerCount.map(seq => {
        pattern[slug][0][seq].map((beat, step) =>
            output.push(`  pitch${step + 1} = ${beat}`)
        );
        pattern[slug][1][seq].map((beat, step) =>
            output.push(`  cv${step + 1} = ${beat}`)
        );
        if (seq < 3) {
            output.push(`  chaintonext = 1`);
            output.push(`\n[sequencer]`);
        }
    });

    return output.join("\n");
    };

    const printPattern = voices =>
    voices
        .map((pattern, i) => {
            if (i >= max_sequencers) return;
            const patternA = i * 2;
            const patternB = patternA + 1;
            const number1 = patternA.toString().padStart(2, "0");
            const number2 = patternB.toString().padStart(2, "0");
            const patternTitle = `\n# Patterns ${number1} + ${number2}`;
            const kickSequence = printSequence(
                pattern,
                "kick",
                number1,
                number2
            );
            const snareSequence = printSequence(
                pattern,
                "snare",
                number1,
                number2
            );
            const hihatSequence = printSequence(
                pattern,
                "hihat",
                number1,
                number2
            );

            const result = [
                patternTitle,
                kickSequence,
                snareSequence,
                hihatSequence,
            ].join('\n')

            return result;
        })
        .join(`\n`);

    const duplexedPatterns = duplexPatterns(patterns);

    const voicedPatterns = duplexedPatterns.map((duplex, i) =>
    duplex
        .map(pattern => extractVoices(pattern))
        .map(voices => ({
            kick: divideVoice(voices.kick),
            snare: divideVoice(voices.snare),
            hihat: divideVoice(voices.hihat),
        }))
        .reduce(
            (acc, pattern) => {
                acc.kick = [...acc.kick, pattern.kick];
                acc.snare = [...acc.snare, pattern.snare];
                acc.hihat = [...acc.hihat, pattern.hihat];
                return acc;
            },
            { kick: [], snare: [], hihat: [] }
        )
    );

    const patchOutput = printPattern(voicedPatterns);
    return patchOutput
}
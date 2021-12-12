(() => {
    /* segment display map:
    .aaaa
    b    c
    b    c
    .dddd
    e    f
    e    f
    .gggg
    */
    const data = document
        .querySelector("pre")
        .textContent.trim()
        .split("\n")
        .map((l) => l.split("|").map((s) => s.trim().split(" ")));

    console.log(data);
    // associates unique length values with the number behind it (for example: 2 segments on is a 1)
    const uniqueMap = {
        2: 1,
        3: 7,
        4: 4,
        7: 8,
    };
    // associates each segment with a bit in a bit field
    const flags = {
        0: 1 << 0,
        1: 1 << 1,
        2: 1 << 2,
        3: 1 << 3,
        4: 1 << 4,
        5: 1 << 5,
        6: 1 << 6,
    };
    // associates each character with a segment number
    const convert = {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
        e: 4,
        f: 5,
        g: 6,
    };

    /**
     * converts a string to a bit field where 1 means the corresponding segment is on, and off when 0
     *
     * byte map:
     * `0gfedcba`
     *
     * for example, a normal one ('cf') where segment 2 and  5 are on becomes `0b00100100`
     */
    function stringToBinary(s) {
        return s
            .split("")
            .map((c) => convert[c])
            .map((v) => flags[v])
            .reduce((l, r) => l | r);
    }
    /**
     * returns true if all set bits in needle are also set in haystack, false otherwise
     */
    function containsBits(haystack, needle) {
        return (haystack & needle) === needle;
    }
    /**
     * returns an object that associate a configuration of the display represented by a bit
     * field of lit up segments to it's value, string representation and the bit field itself
     */
    function getMappings(input) {
        const knownNumberValues = input.filter((x) => x.length in uniqueMap);
        const resMap = {};
        const revResMap = {};

        function getResOfValue(v) {
            return resMap[revResMap[v]];
        }
        function registerRes({ representation, mask, value }) {
            resMap[mask] = { value, representation, mask };
            revResMap[value] = mask;
        }

        for (const representation of knownNumberValues) {
            const value = uniqueMap[representation.length];
            registerRes({ value, representation, mask: stringToBinary(representation) });
        }
        const unknownNumberValuesByLength = input
            .filter((x) => !(x.length in uniqueMap))
            .reduce(
                (acc, v) => ({
                    ...acc,
                    [v.length]: [...acc[v.length], { representation: v, mask: stringToBinary(v) }],
                }),
                {
                    5: [],
                    6: [],
                },
            );

        /* 
            FINDING OTHER UNKNOWN NUMBERS:
            to find each unknown number, we search some pattern that only the desired 
            digit has that we can build from known numbers and their bit field representation.

            for example, for six, we can see that of all digits represented with 6 segments, 
            six is the only one that doesn't have bit segments of the digit one on as well
            (normally, segment c isn't on in six's 7seg representation).
        */

        // find six
        const six = unknownNumberValuesByLength[6].find(
            ({ mask }) => !containsBits(mask, getResOfValue(1).mask),
        );
        registerRes({ ...six, value: 6 });
        unknownNumberValuesByLength[6] = unknownNumberValuesByLength[6].filter((x) => x !== six);

        // find five
        // pattern: b & d & f
        const fiveSearch = getResOfValue(4).mask & getResOfValue(6).mask;
        const five = unknownNumberValuesByLength[5].find(({ mask }) =>
            containsBits(mask, fiveSearch),
        );
        registerRes({ ...five, value: 5 });
        unknownNumberValuesByLength[5] = unknownNumberValuesByLength[5].filter((x) => x !== five);

        // find three
        const three = unknownNumberValuesByLength[5].find(({ mask }) =>
            containsBits(mask, getResOfValue(1).mask),
        );
        registerRes({ ...three, value: 3 });
        unknownNumberValuesByLength[5] = unknownNumberValuesByLength[5].filter((x) => x !== three);

        // find two
        const two = unknownNumberValuesByLength[5][0];
        registerRes({ ...two, value: 2 });

        // find nine
        // pattern: a & d & g
        const nineSearch = getResOfValue(3).mask ^ getResOfValue(1).mask;
        const nine = unknownNumberValuesByLength[6].find(({ mask }) =>
            containsBits(mask, nineSearch),
        );
        registerRes({ ...nine, value: 9 });
        unknownNumberValuesByLength[6] = unknownNumberValuesByLength[6].filter((x) => x !== nine);

        // find zero
        const zero = unknownNumberValuesByLength[6][0];
        registerRes({ ...zero, value: 0 });

        return resMap;
    }
    const count = data
        .map(([input, output]) => {
            const map = getMappings(input);
            const result = output
                .map(stringToBinary)
                .map((x) => map[x].value)
                .reduce((l, r) => l * 10 + r);
            return result;
        })
        .reduce((l, r) => l + r);
    console.log(count);
})();

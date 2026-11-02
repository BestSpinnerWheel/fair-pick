# fair-pick

Small helpers for building a fair spin wheel in the browser. No dependencies.

- `randInt(n)`: unbiased integer from 0 to n-1, using `crypto.getRandomValues` and rejection sampling, so there is no modulo bias.
- `shuffleBag(n)`: returns a function that gives each index once before any index repeats.
- `landingAngle(index, n)`: canvas rotation that puts a slice under a pointer at the top.

## Use

Copy `fair-pick.js` into your project. It works in modern browsers and Node 20+.

```js
import { randInt, landingAngle } from './fair-pick.js';

const entries = ['Pizza', 'Tacos', 'Sushi'];
const winner = randInt(entries.length);          // choose first
const stopAt = landingAngle(winner, entries.length); // then animate to here
```

## Independent draws or a shuffle bag?

Use `randInt` when each draw must be independent, such as dice or number ranges.

Use `shuffleBag` when repeats would look broken, such as a party wheel. Picks are then not independent: late in a round, the remaining entries are predictable. Don't use it where people may bet on or audit a sequence of draws.

## Test

```
npm test
```

The test checks range, rough evenness over 700,000 draws, bag rounds and landing angles. It finds bugs. It does not prove the absence of tiny bias.

## Where this comes from

These are simplified from the picker in [Best Spinner Wheel](https://bestspinnerwheel.com/), a free online spinner wheel. That wheel tracks its bag by entry text and only uses it on lists of 5 or more.

## License

MIT

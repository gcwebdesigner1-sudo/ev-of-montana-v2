# EV of Montana, site v2 (preview)

A newer, ad-focused version of evofmontana.com. The live site is still the `ev-steam-montana` repo. This one is a preview and has `noindex` so it doesn't compete with the live site in Google.

## What changed from the live site

- Built as a landing page for the Meta ads. Same offer, words and colors as the ads, so it feels like the ad people tapped.
- The hero states the offer and has a room picker (carpet / hard floor / couch / chair) that pre-fills the form.
- "The deal, start to finish" list right under the hero answers "what's the catch" before anyone has to ask.
- A "Hey Montana, I'm Anthony" owner section. The photo slot shows the machine until Anthony sends a photo of himself.
- The booking form asks the same qualifying questions as the Instant Form: what to clean, town, own or rent, best times. Paid jobs and machine quotes sit behind one link.
- Short EV clips (35 seconds or so) instead of a long video library. The full catalog, specs and lineup stay on evofmontana.com.
- Slow, scroll-linked motion that reverses with scroll, all turned off under `prefers-reduced-motion`.

## Before it could go live

- Anthony's photo in `img/` and in the owner section.
- Confirm the phone number (top of `script.js`) and the towns.
- Remove the `noindex` line, add the Meta Pixel block from the live site, and point the domain at it.

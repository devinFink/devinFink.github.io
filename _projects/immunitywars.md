---
title: Immunity Wars
order: 5
category: game
engine: Godot / GDScript
role: Programmer, Sound Design
team: 5
duration: 4 months
platforms: Steam
meta: "Shipped on Steam · Godot · Team of 5"
summary: Hex-based tactics game about how the immune system fights infection, built on a turn-based state machine and a modular ability system.
tagline: A hex-based tactical strategy game that teaches players how the immune system fights infection, one turn at a time.
description: Case study of Immunity Wars, a hex-based strategy game on Steam. Devin Fink built the turn, ability and selection systems in Godot and composed the soundtrack.
tags: [Turn-Based Systems, Godot, GDScript, Ability System, Audio]
cover: /images/immunitywars/cover.webp
image: /images/immunitywars/cover.webp
thumb: /images/immunitywars/shot-1-sm.webp
thumb_alt: /images/immunitywars/cover-sm.webp
hero:
  type: youtube
  id: PFV41kASZh0
  poster: /images/immunitywars/shot-1.webp
links:
  - { label: View on Steam, url: "https://store.steampowered.com/app/2957280/", icon: fab fa-steam }
  - { label: Trailer, url: "https://www.youtube.com/watch?v=PFV41kASZh0", icon: fab fa-youtube }
gallery:
  - { src: /images/immunitywars/shot-1.webp, thumb: /images/immunitywars/shot-1-sm.webp, caption: "Planning a turn: movement range and objectives" }
  - { src: /images/immunitywars/shot-3.webp, thumb: /images/immunitywars/shot-3-sm.webp, caption: "Immune cells engaging an infection" }
  - { src: /images/immunitywars/shot-4.webp, thumb: /images/immunitywars/shot-4-sm.webp, caption: "A late-game board under pressure" }
  - { src: /images/immunitywars/shot-2.webp, thumb: /images/immunitywars/shot-2-sm.webp, caption: "Unit details and ability information" }
  - { src: /images/immunitywars/shot-5.webp, thumb: /images/immunitywars/shot-5-sm.webp, caption: "A level layout on the hex grid" }
  - { todo: "GIF: selecting a unit, choosing an ability, and resolving it on a target hex" }
---

## Overview

Immunity Wars is a hex-based tactical strategy game designed to teach players what happens inside the immune system. You command immune cells across a hex board and use their abilities to contain and defeat an infection, while the game quietly teaches the biology behind each action.

It was built by a **team of five** in **four months** using **Godot**, and released on **Steam**.

## My Role

I was one of the programmers and the team's sound designer. I built the systems that every player action runs through, then gave the game its sound.

<div class="highlights">
<div class="highlight"><strong>Turn system</strong><span>The state machine that drives each round, from the player's turn through the pathogens' turn to the objective checks.</span></div>
<div class="highlight"><strong>Ability framework</strong><span>Data-driven unit actions with targeting and resolution, so new abilities were easy to add.</span></div>
<div class="highlight"><strong>Selection</strong><span>Unit and hex selection with clear highlighting of valid moves and targets.</span></div>
<div class="highlight"><strong>Music, SFX &amp; VFX</strong><span>Composed the soundtrack, produced the sound effects, and built the particle effects for the cells.</span></div>
</div>

## Systems Deep Dive

### The turn loop

Everything in a tactics game hangs off the turn structure, so I built it as an explicit **state machine**. A player turn refreshes available actions. The player selects a unit, chooses an ability, picks a target hex, and resolves it, and that inner loop repeats until they run out of actions or press **End Turn**. Then the pathogens act, objectives are checked, and the next round begins.

Making each state explicit kept the input rules simple: only certain clicks are valid in each state. It also gave the rest of the team clear hooks for UI, AI, and tutorial messaging.

{% include figure.html svg="diagrams/turn-loop.svg" caption="The turn state machine at the heart of every match." %}

{% include todo.html text="Check the diagram's states against the real implementation (for example, whether there was a separate tutorial or event phase), and name the Godot nodes or signals you used to move between states." %}

### Abilities & selection

Abilities are described as data: their range, valid targets, and effect. A single resolution path then executes them. Selecting a unit highlights its legal moves and targets on the hex grid, so players can read their options at a glance, which matters a lot in a game meant to teach.

{% include figure.html src="/images/immunitywars/shot-1.webp" caption="A player turn in progress, with objectives, the active unit, and the End Turn control." %}

{% include todo.html text="Paste a short GDScript snippet: an ability definition or the resolve function, in a ```gdscript code block." %}

### Cell VFX

I built the particle systems for the cells, so that units feel alive and actions have clear, satisfying feedback even though the game is turn-based.

{% include figure.html todo="Short clip or GIF of the cell particle effects in action." %}

### Music & sound

Beyond programming, I composed several of the game's music tracks and produced its sound effects, then implemented them in game.

{% include todo.html text="Embed a track (SoundCloud/Bandcamp iframe or an mp3 in /images/immunitywars/) and add a line about the musical direction." %}

{% include todo.html heading="Challenges & Solutions" text="1–2 real problems. Ideas: keeping the turn and input states consistent when animations run asynchronously, or balancing being educational with being fun." %}

## Results & Learnings

- **Shipped** on Steam after a four-month production.
- Programming and audio both in one person meant fast iteration on game feel.

{% include todo.html text="Add a takeaway or two about scoping a game to four months with five people." %}

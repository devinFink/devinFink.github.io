---
title: Elemental Engagements
order: 3
category: game
engine: Unity / C#
role: Programmer, Sound Design
team: 6
duration: 4 months
platforms: Steam
summary: Competitive split-screen 1v1 real-time strategy. I built the combat and health systems, code-driven pathing visuals, and all of the audio.
tagline: A fast-paced, split-screen 1v1 real-time strategy game in which two Major Gods command armies of elementals across shifting landscapes.
description: Case study of Elemental Engagements, a 1v1 RTS on Steam. Devin Fink built the combat, health and audio systems in Unity / C#.
tags: [Real-Time Combat, Unity, C#, 1v1 Versus, Audio Systems]
cover: /images/elementalengagements/cover.webp
image: /images/elementalengagements/cover.webp
thumb: /images/elementalengagements/cover-sm.webp
thumb_alt: /images/elementalengagements/shot-3-sm.webp
hero:
  type: youtube
  id: Rc-zcAMk64U
  poster: /images/elementalengagements/shot-3.webp
links:
  - { label: View on Steam, url: "https://store.steampowered.com/app/2748400/", icon: fab fa-steam }
  - { label: Trailer, url: "https://www.youtube.com/watch?v=Rc-zcAMk64U", icon: fab fa-youtube }
gallery:
  - { src: /images/elementalengagements/shot-3.webp, thumb: /images/elementalengagements/shot-3-sm.webp, caption: "Fire elementals clash in a split-screen match" }
  - { src: /images/elementalengagements/shot-1.webp, thumb: /images/elementalengagements/shot-1-sm.webp, caption: "Both players building up their armies" }
  - { src: /images/elementalengagements/shot-2.webp, thumb: /images/elementalengagements/shot-2-sm.webp, caption: "Armies on the move across the map" }
  - { src: /images/elementalengagements/shot-4.webp, thumb: /images/elementalengagements/shot-4-sm.webp, caption: "A battle on the frozen map" }
  - { src: /images/elementalengagements/shot-5.webp, thumb: /images/elementalengagements/shot-5-sm.webp, caption: "Commanding units on the grassland map" }
  - { todo: "GIF: the code-driven pathing visuals as you order a group of units" }
---

## Overview

Elemental Engagements is a fast-paced **1v1 real-time strategy** game. Two players, each a Major God, command armies of elementals head-to-head in **split-screen** across several distinct landscapes. Matches are short and aggressive, so combat has to be readable at a glance.

It was built by a **team of six** in **four months** in **Unity**, and released on **Steam**.

## My Role

I was a programmer and the sound designer. I built the systems that decide who wins a fight, plus the feedback that tells both players what's happening.

<div class="highlights">
<div class="highlight"><strong>Combat &amp; health</strong><span>Attack resolution, damage, and health and death handling that every unit in the game runs on.</span></div>
<div class="highlight"><strong>Pathing visuals</strong><span>Code-driven effects that show where units are heading, so orders read clearly in real time.</span></div>
<div class="highlight"><strong>Audio systems</strong><span>Implemented all of the game's SFX and music playback.</span></div>
<div class="highlight"><strong>Bug fixing</strong><span>Fixed bugs across gameplay, balance, and stability throughout production.</span></div>
</div>

## Systems Deep Dive

### Combat & health

Every elemental runs the same combat loop. It finds an enemy in range, attacks on a cooldown, and deals damage through a shared **health** component. When health drops to zero, the unit broadcasts a **death event**, and the systems that care subscribe to it instead of the health code calling them directly: audio, VFX, and game state and UI. That decoupling let me add sound and effects without touching combat logic, and made bugs easy to isolate.

{% include figure.html svg="diagrams/combat-flow.svg" caption="Combat data flow, from target acquisition to the death event and its listeners." %}

{% include todo.html text="Confirm the event approach matches what you built (C# events, UnityEvents, or direct calls?) and paste a short health or attack snippet in a ```csharp block." %}

{% include figure.html src="/images/elementalengagements/shot-3.webp" caption="Fire elementals clashing. Combat has to read clearly at split-screen size." %}

### Pathing visuals

In a fast RTS, players need to see their orders taking effect immediately. I wrote the visual effects for unit pathing **entirely in code**: when a group is ordered to move, its route is drawn on the battlefield and updates as the units travel.

{% include figure.html todo="GIF of pathing visuals: order a group, show the line or effect updating as they move." %}

{% include todo.html text="Explain how the path visual was generated (LineRenderer? mesh? shader?) and how it stayed in sync with the units' NavMesh path." %}

### Audio

I implemented the full audio pipeline: sound effects tied to gameplay events, plus music. Because combat already broadcast events, audio could listen for those events instead of being sprinkled through gameplay code.

{% include todo.html heading="Challenges & Solutions" text="1–2 real problems. Ideas: keeping split-screen combat readable, audio overload when many units fight at once (voice limiting?), or performance with large armies." %}

## Results & Learnings

- **Shipped** on Steam after a four-month production.
- An event-driven combat core made it cheap to layer on feedback (audio, VFX, and UI) late in development.

{% include todo.html text="Add a takeaway or two, for example what you'd change about the combat architecture now." %}

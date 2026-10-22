---
title: Clockwork Sword
order: 1
featured: true
category: game
engine: Unity / C#
role: Gameplay Engineer
team: 37
duration: Ongoing
platforms: Steam, Epic Games Store
summary: Isometric hack-and-slash where gears socketed into your weapon change how you fight. I built the status-effect and gear systems.
tagline: An isometric hack-and-slash set in a dark steampunk museum overrun by corrupted automata. You customize your weapon with gears scavenged from fallen enemies, so every fight is a chance to change how you play.
description: Case study of Clockwork Sword, an isometric hack-and-slash shipped on Steam and Epic. Devin Fink built the status-effect and gear systems in Unity / C#.
tags: [Gameplay Systems, Unity, C#, Status Effects, UI Integration]
cover: /images/clockworksword/cover.webp
image: /images/clockworksword/cover.webp
thumb: /images/clockworksword/cover-sm.webp
thumb_video: /images/clockwork_trailer.mp4
featured_points:
  - Core engineer on a 37-person team
  - Built the status-effect and gear systems
  - Shipped on Steam and the Epic Games Store
hero:
  type: youtube
  id: 2t8JvuDimqQ
  poster: /images/clockworksword/cover.webp
  label: Watch the Early Access trailer
links:
  - { label: View on Steam, url: "https://store.steampowered.com/app/3433330/", icon: fab fa-steam }
  - { label: Trailer, url: "https://www.youtube.com/watch?v=2t8JvuDimqQ", icon: fab fa-youtube }
stats:
  - { value: "37", label: "person team" }
  - { value: "2", label: "core systems built" }
  - { value: "2", label: "storefronts shipped" }
  - { value: "C#", label: "Unity gameplay code" }
gallery:
  - { src: /images/clockworksword/shot-1.webp, thumb: /images/clockworksword/shot-1-sm.webp, caption: "Lightning arcs between enemies after picking up the Pressure Pulse gear" }
  - { src: /images/clockworksword/shot-2.webp, thumb: /images/clockworksword/shot-2-sm.webp, caption: "The workbench where gears are socketed into the weapon" }
  - { src: /images/clockworksword/shot-3.webp, thumb: /images/clockworksword/shot-3-sm.webp, caption: "Mid-combat in the museum halls" }
  - { src: /images/clockworksword/shot-4.webp, thumb: /images/clockworksword/shot-4-sm.webp, caption: "Heavy hits and damage numbers against a crowd" }
  - { src: /images/clockworksword/shot-7.webp, thumb: /images/clockworksword/shot-7-sm.webp, caption: "Area effects leaving lingering fields on the ground" }
  - { src: /images/clockworksword/shot-8.webp, thumb: /images/clockworksword/shot-8-sm.webp, caption: "A charged strike lighting up the arena" }
  - { src: /images/clockworksword/shot-5.webp, thumb: /images/clockworksword/shot-5-sm.webp, caption: "Dashing through a fight" }
  - { src: /images/clockworksword/shot-6.webp, thumb: /images/clockworksword/shot-6-sm.webp, caption: "Ranged attacks across the arena" }
  - { todo: "GIF: stacking several status effects on one enemy, showing ticks and the HUD icons" }
  - { todo: "Screenshot: a status-effect definition asset in the Unity inspector" }
---

## Overview

Clockwork Sword is an isometric hack-and-slash in which you slash, stab, and shoot your way through a multi-tiered museum filled with corrupted automata. The core fantasy is the **weapon itself**. You scavenge gears from fallen enemies and socket them into your sword, and combining weapons with elements changes how every encounter plays out.

The game was built by a **37-person team** in Unity and released on **Steam** and the **Epic Games Store**. It's the largest team I've shipped with, and the project where I learned the most about building systems other people depend on.

## My Role

I was a **core gameplay engineer**. I owned systems that sit underneath almost every fight in the game, and I worked directly with the art team to get UI and animation into the build.

<div class="highlights">
<div class="highlight"><i class="fa-solid fa-bolt"></i><strong>Status Effect system</strong><span>The framework every elemental hit, gear proc, and enemy ability goes through to apply timed, stacking effects.</span></div>
<div class="highlight"><i class="fa-solid fa-gear"></i><strong>Gear system</strong><span>Gears that drop from enemies and socket into the weapon, modifying stats and hooking into combat.</span></div>
<div class="highlight"><i class="fa-solid fa-palette"></i><strong>UI &amp; animation integration</strong><span>Partnered with the lead artist to wire UI art and animation into the game and iterate on feedback.</span></div>
<div class="highlight"><i class="fa-solid fa-bug"></i><strong>Polish &amp; stabilization</strong><span>Bug triage, fixes, and polish through the late stages of production on a shared codebase.</span></div>
</div>

## Systems Deep Dive

### Status effects

Elements are central to Clockwork Sword's combat. A hit from an electrified blade, a gear triggering, or an enemy's attack can all leave something behind on a target, such as damage over time, a slow, or a stat change. I built the system that every one of those effects goes through.

Each entity owns a controller that tracks its **active effect instances**. Applying an effect goes through one entry point, which decides whether to add a new instance, **stack** onto an existing one, or refresh its **duration**, based on rules in the effect's definition. Active effects **tick** at their own rate, push stat modifiers and damage, drive VFX and HUD icons, and clean up after themselves when they expire.

{% include figure.html svg="diagrams/status-effects.svg" caption="How effects flow from a source, through an entity's controller, to gameplay outcomes." %}

{% include todo.html text="Check the diagram against your real implementation: class names, whether definitions were ScriptableObjects, how stacking was configured. Then add 1–2 sentences on the design decision you're proudest of here." %}

{% include figure.html src="/images/clockworksword/shot-1.webp" caption="Lightning chaining between enemies after picking up the Pressure Pulse gear." %}

{% include todo.html text="Paste a short, representative snippet of the effect base class or the Apply/stacking logic in a ```csharp code block (10–25 lines)." %}

### Gears & weapon customization

Gears are the *scraps of the fallen*. They drop from enemies and are socketed into the player's weapon at the workbench. Each gear changes the weapon, either by adjusting stats or by adding behavior that hooks into combat, such as triggering a status effect on hit. Because gears and status effects share the same pipeline, new gear ideas from design could usually be built from pieces that already existed.

{% include figure.html src="/images/clockworksword/shot-2.webp" caption="The workbench, where gears are socketed into the weapon." %}

{% include todo.html text="Describe how a gear is defined and applied. How many gear types shipped? How did gears hook into the status-effect system?" %}

### UI & animation

On a team this size, a lot of engineering is translation between disciplines. I worked closely with the lead artist to get UI art and animation implemented the way it was designed, then iterated quickly as feedback came in.

{% include figure.html todo="Screenshot or GIF of a UI screen or animated element you implemented with the lead artist." %}

{% include todo.html heading="Challenges & Solutions" text="Pick 1–2 real problems and write each as problem, then what you tried, then what worked. Good candidates: effects interacting badly when stacked, performance with many active effects, or keeping the system easy for designers to extend." %}

## Results & Learnings

- **Shipped** on Steam and the Epic Games Store.
- Built systems that the rest of a 37-person team built content on top of.

{% include todo.html text="Add 2–3 takeaways: what working at this team size taught you about APIs, communication, or code review. Add player numbers or reviews if you have them." %}

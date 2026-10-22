---
title: 3D Physarum Simulation
permalink: /physarumSimulator
order: 4
category: graphics
engine: Unity / HLSL
role: Programmer, Rendering
team: 2
platforms: PC
meta: "HLSL compute + ray marching · Team of 2"
summary: Volumetric 3D slime-mold simulation. Agents run in a compute shader, and I rendered the result with GPU ray marching.
tagline: The classic 2D slime-mold simulation taken into three dimensions. A compute shader runs the agents, and a volumetric ray marcher I wrote in HLSL renders a living, explorable cloud.
description: Case study of a 3D physarum (slime mold) simulation rendered with volumetric ray marching in HLSL, by Devin Fink and Liam Healey.
tags: [HLSL, Compute Shaders, Ray Marching, Volumetrics, Unity]
cover: /images/physarum/volume.webp
image: /images/physarum/volume-ui.webp
thumb: /images/physarum/volume-sm.webp
thumb_alt: /images/physarum/volume-ui-sm.webp
hero:
  type: youtube
  id: 5brtbToJBDI
  poster: /images/physarum/volume-ui.webp
links:
  - { label: Try it on itch.io, url: "https://liamhealey.itch.io/slime-mold-simulation", icon: fab fa-itch-io }
  - { label: Video, url: "https://www.youtube.com/watch?v=5brtbToJBDI", icon: fab fa-youtube }
gallery:
  - { src: /images/physarum/volume-ui.webp, thumb: /images/physarum/volume-ui-sm.webp, caption: "The volume with the live parameter controls" }
  - { src: /images/physarum/volume.webp, thumb: /images/physarum/volume-sm.webp, caption: "Colored trail density inside the volume" }
  - { todo: "GIF: flying the camera into the volume" }
  - { todo: "Screenshot: the same scene at two different sensor-angle settings" }
---

## Overview

Physarum, or slime mold, simulations are usually 2D: thousands of simple agents leave trails and follow each other's, and network-like patterns emerge. My partner and I took it into **three dimensions**. That turned an image problem into a **volume rendering** problem.

We split the work cleanly. My partner built the **simulation** in a compute shader, and I built the **rendering**, a **volumetric ray marcher** in a fragment shader that turns the 3D trail data into the fog-like structures you can fly through.

<div class="highlights">
<div class="highlight"><strong>GPU end to end</strong><span>Simulation and rendering both stay on the GPU, connected through a 3D texture.</span></div>
<div class="highlight"><strong>Volumetric ray marching</strong><span>My part: march through the volume, sample density, and accumulate color and opacity.</span></div>
<div class="highlight"><strong>Explorable</strong><span>Correct culling means the camera can enter the box and look around inside.</span></div>
<div class="highlight"><strong>Live parameters</strong><span>Agent speed, sensor angle and distance, diffusion, and colors are all tweakable at runtime.</span></div>
</div>

## Pipeline

Each frame, the compute shader updates every agent: it **senses** trail ahead, **rotates** toward the strongest signal, **moves**, and **deposits** more trail. The trail field then **diffuses and decays**. The result lives in a **3D texture**, which my fragment shader reads to render the volume.

{% include figure.html svg="diagrams/physarum-pipeline.svg" caption="Simulation in a compute shader, then rendering by volumetric ray marching, joined by a 3D texture." %}

## Deep Dive: Volumetric Ray Marching

### Marching the volume

For each pixel, a ray enters the simulation's bounding box and steps through it at a fixed interval. At every step it samples the trail density from the 3D texture, maps it to color, and **accumulates color and opacity front to back**. It stops once the ray leaves the box or the pixel is effectively opaque, which is an easy early-out that saves a lot of work in dense regions.

{% include figure.html src="/images/physarum/volume.webp" caption="Density mapped to color as the ray accumulates through the volume." %}

{% include todo.html text="Paste the core marching loop from the HLSL fragment shader in a ```hlsl block, and mention the step count / step size you settled on and why." %}

### Being able to step inside

A volume drawn on the faces of a box disappears the moment the camera passes through those faces. The renderer handles this with culling: when the camera is inside the box, rays start at the camera instead of at the box's surface, so you can fly into the simulation and inspect it from within.

{% include todo.html text="Confirm the exact technique: did you render back faces (cull front) and start the ray at the camera when inside? Adjust the paragraph above to match." %}

{% include figure.html todo="GIF: flying from outside the box into the volume." %}

### Tuning it live

The simulation exposes its parameters at runtime: agent count, speed, turn speed, sensor angle and distance, diffusion, and two-color gradients. Watching the structures reorganize as you drag a slider is the best part of the project.

{% include figure.html src="/images/physarum/volume-ui.webp" caption="Runtime controls for agents, diffusion, and color." %}

## Results & Learnings

- Released on [itch.io](https://liamhealey.itch.io/slime-mold-simulation) with my partner, Liam Healey.

{% include todo.html text="Add a takeaway on GPU data flow (compute to 3D texture to fragment) and any performance numbers (FPS at 100K agents, texture resolution)." %}

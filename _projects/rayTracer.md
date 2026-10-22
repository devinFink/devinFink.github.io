---
title: Ray Tracer
permalink: /rayTracer
order: 2
category: graphics
engine: C++
role: Sole creator
team: Solo
duration: Aug 2025 – present
platforms: PC
meta: "Modern C++ · Thread pool · BVH · Solo"
summary: Multithreaded CPU ray tracer in modern C++, with a BVH and Möller–Trumbore intersection, Monte-Carlo GI, and photon-mapped caustics.
tagline: A multithreaded CPU ray tracer in modern C++. A thread pool keeps every core busy, a BVH with Möller–Trumbore triangle tests keeps traversal fast, and Monte-Carlo GI with photon and caustics maps handles the light transport.
description: Case study of a multithreaded C++ ray tracer with a thread pool, BVH, Möller–Trumbore intersection, Monte-Carlo global illumination and photon mapping, by Devin Fink.
tags: [Modern C++, Thread Pool, BVH, Monte-Carlo GI, Photon Mapping, Profiling]
cover: /images/raytracer/alchemy.webp
image: /images/raytracer/alchemy.webp
thumb: /images/raytracer/alchemy-sm.webp
thumb_alt: /images/raytracer/scene-sm.webp
hero:
  type: image
  src: /images/raytracer/alchemy.webp
  caption: Glass, liquids and candlelight, with caustics cast onto the table
gallery:
  - { src: /images/raytracer/alchemy.webp, thumb: /images/raytracer/alchemy-sm.webp, caption: "Glass, liquids and candlelight, with colored caustics on the table" }
  - { src: /images/raytracer/scene.webp, thumb: /images/raytracer/scene-sm.webp, caption: "Reflection and refraction with environment lighting" }
  - { src: /images/raytracer/glossiness.webp, thumb: /images/raytracer/glossiness-sm.webp, caption: "Glossy reflections and multi-sampled soft shadows" }
  - { src: /images/raytracer/cornell.webp, thumb: /images/raytracer/cornell-sm.webp, caption: "Cornell box: color bleeding from global illumination" }
  - { todo: "Render: depth of field" }
  - { todo: "Render: textured geometry" }
---

## Overview

I built a CPU ray tracer in modern C++ **from scratch**. It grew from basic shading into a physically inspired renderer with **Monte-Carlo global illumination** and **photon mapping**. Along the way, performance work became as important as the lighting itself. A **thread pool** spreads the render across every core, a **BVH** with **Möller–Trumbore** triangle intersection keeps traversal cheap, and I **profiled the hot paths** and tuned them iteratively to cut render times.

<div class="highlights">
<div class="highlight"><strong>Light transport</strong><span>Monte-Carlo GI for indirect light and color bleeding, and photon mapping for caustics.</span></div>
<div class="highlight"><strong>Performance</strong><span>A BVH with Möller–Trumbore triangle tests, a thread pool across all cores, and profiled, tuned hot paths.</span></div>
<div class="highlight"><strong>Shading</strong><span>Blinn-Phong, reflection, refraction, textures, soft shadows, anti-aliasing, and depth of field.</span></div>
<div class="highlight"><strong>The math</strong><span>Transforms, ray-object intersection, sampling, and light transport, implemented from first principles.</span></div>
</div>

## Architecture

The renderer runs in **two passes**. First, photons are shot from the lights, bounced through the scene, and stored in a photon map. Then camera rays are traced for each pixel. At each hit point, direct light (with soft-shadow sampling), indirect light (Monte-Carlo), and caustics (estimated from nearby photons) are combined, and many samples per pixel are averaged into the final color.

{% include figure.html svg="diagrams/photon-mapping.svg" caption="The two-pass pipeline: photon tracing, then multithreaded rendering." %}

{% include todo.html text="Check the diagram against your renderer, for example whether the photon map is stored in a kd-tree and whether you use it for caustics only or for indirect light too." %}

## Deep Dive

### Acceleration: the BVH

Testing every ray against every object doesn't scale. The scene's geometry is organized into a **bounding volume hierarchy**, a tree of boxes, so each ray only tests the few primitives whose boxes it actually passes through. Both passes rely on it, so it pays off twice. At the leaves, triangles are tested with the **Möller–Trumbore** algorithm, which computes the hit and its barycentric coordinates in one pass without precomputing a plane equation.

I profiled traversal and intersection as the hottest paths in the renderer and tuned them iteratively, measuring each change against render time.

{% include todo.html text="How do you split nodes (midpoint, SAH)? Leaf size? Add a short C++ snippet of the traversal in a ```cpp block." %}

### Global illumination & photon mapping

Indirect lighting is estimated with **Monte-Carlo sampling**: secondary rays bounce in random directions and their contributions are averaged. That's what gives the Cornell box its red and green color bleeding. Caustics, the light focused through glass, are hard to find with random sampling, so **photon and caustics maps** handle them. Photons follow the light forward, and the renderer estimates their density at each hit point.

{% include figure.html src="/images/raytracer/cornell.webp" caption="Color bleeding from Monte-Carlo global illumination in a Cornell box." %}

{% include compare.html todo="Before/after slider: the same scene with direct lighting only vs. with global illumination (export both renders at the same resolution, then set before/after on this include)." %}

### Soft shadows, glossiness & anti-aliasing

Area lights are sampled many times per shading point to produce soft shadow edges. Glossy surfaces scatter their reflection rays, and multiple jittered samples per pixel smooth out aliasing. Depth of field uses the same sampling idea, applied to the camera's lens.

{% include figure.html src="/images/raytracer/glossiness.webp" caption="Glossy reflections and soft shadows from area-light sampling." %}

### Multithreading

Rendering is embarrassingly parallel: each pixel is independent. Render work is fed to a **thread pool** sized to the machine, so every hardware thread stays busy and render time scales with core count.

{% include todo.html text="How is work divided into pool jobs (rows, tiles)? Then fill in the real numbers below." %}

{% include todo.html text="Add a performance table here, e.g. | Configuration | Render time |, with brute force vs BVH and 1 thread vs N threads, for one named scene and resolution." %}

## Results & Learnings

{% include todo.html text="What did building this teach you that you now use in real-time work? What would you add next (BVH on the GPU, importance sampling, a denoiser)?" %}

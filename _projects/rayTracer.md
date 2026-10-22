---
title: Ray Tracer
permalink: /rayTracer
order: 4
category: graphics
engine: C++
role: Programmer
team: Solo
platforms: PC
summary: From-scratch CPU ray tracer in C++ with photon mapping, Monte-Carlo global illumination, soft shadows, a BVH, and multithreading.
tagline: A fully featured CPU ray tracer written from scratch in C++, with photon mapping, Monte-Carlo global illumination, multi-sampled soft shadows, and the acceleration structures and threading that make it practical.
description: Case study of a from-scratch C++ ray tracer with photon mapping, Monte-Carlo global illumination, a BVH and multithreading, by Devin Fink.
tags: [C++, Ray Tracing, Global Illumination, BVH, Multithreading]
cover: /images/raytracer/scene.webp
image: /images/raytracer/scene.webp
thumb: /images/raytracer/scene-sm.webp
thumb_alt: /images/raytracer/glossiness-sm.webp
hero:
  type: image
  src: /images/raytracer/scene.webp
  caption: Reflective and refractive spheres lit by an environment
stats:
  - { value: "C++", label: "from scratch" }
  - { value: "BVH", label: "acceleration structure" }
  - { value: "2-pass", label: "photon mapping" }
  - { value: "Multi", label: "threaded rendering" }
gallery:
  - { src: /images/raytracer/scene.webp, thumb: /images/raytracer/scene-sm.webp, caption: "Reflection and refraction with environment lighting" }
  - { src: /images/raytracer/glossiness.webp, thumb: /images/raytracer/glossiness-sm.webp, caption: "Glossy reflections and multi-sampled soft shadows" }
  - { src: /images/raytracer/cornell.webp, thumb: /images/raytracer/cornell-sm.webp, caption: "Cornell box: color bleeding from global illumination" }
  - { todo: "Render: a caustic under a glass sphere (photon mapping)" }
  - { todo: "Render: depth of field" }
  - { todo: "Render: textured geometry" }
---

## Overview

I built a CPU ray tracer in C++ **from scratch**. It grew from basic shading into a physically inspired renderer with **Monte-Carlo global illumination** and **photon mapping**. Along the way, performance work became as important as the lighting itself: a **BVH** and a **multithreaded** render loop are what keep it usable.

<div class="highlights">
<div class="highlight"><i class="fa-solid fa-sun"></i><strong>Light transport</strong><span>Monte-Carlo GI for indirect light and color bleeding, and photon mapping for caustics.</span></div>
<div class="highlight"><i class="fa-solid fa-gauge-high"></i><strong>Performance</strong><span>Bounding volume hierarchy for intersection tests, and work split across CPU threads.</span></div>
<div class="highlight"><i class="fa-solid fa-circle-half-stroke"></i><strong>Shading</strong><span>Blinn-Phong, reflection, refraction, textures, soft shadows, anti-aliasing, and depth of field.</span></div>
<div class="highlight"><i class="fa-solid fa-square-root-variable"></i><strong>The math</strong><span>Transforms, ray-object intersection, sampling, and light transport, implemented from first principles.</span></div>
</div>

## Architecture

The renderer runs in **two passes**. First, photons are shot from the lights, bounced through the scene, and stored in a photon map. Then camera rays are traced for each pixel. At each hit point, direct light (with soft-shadow sampling), indirect light (Monte-Carlo), and caustics (estimated from nearby photons) are combined, and many samples per pixel are averaged into the final color.

{% include figure.html svg="diagrams/photon-mapping.svg" caption="The two-pass pipeline: photon tracing, then multithreaded rendering." %}

{% include todo.html text="Check the diagram against your renderer, for example whether the photon map is stored in a kd-tree and whether you use it for caustics only or for indirect light too." %}

## Deep Dive

### Acceleration: the BVH

Testing every ray against every object doesn't scale. The scene's geometry is organized into a **bounding volume hierarchy**, a tree of boxes, so each ray only tests the few primitives whose boxes it actually passes through. Both passes rely on it, so it pays off twice.

{% include todo.html text="How do you split nodes (midpoint, SAH)? Leaf size? Add a short C++ snippet of the traversal in a ```cpp block." %}

### Global illumination & photon mapping

Indirect lighting is estimated with **Monte-Carlo sampling**: secondary rays bounce in random directions and their contributions are averaged. That's what gives the Cornell box its red and green color bleeding. Caustics, the light focused through glass, are hard to find with random sampling, so the **photon map** handles them. Photons follow the light forward, and the renderer estimates their density at each hit point.

{% include figure.html src="/images/raytracer/cornell.webp" caption="Color bleeding from Monte-Carlo global illumination in a Cornell box." %}

{% include compare.html todo="Before/after slider: the same scene with direct lighting only vs. with global illumination (export both renders at the same resolution, then set before/after on this include)." %}

### Soft shadows, glossiness & anti-aliasing

Area lights are sampled many times per shading point to produce soft shadow edges. Glossy surfaces scatter their reflection rays, and multiple jittered samples per pixel smooth out aliasing. Depth of field uses the same sampling idea, applied to the camera's lens.

{% include figure.html src="/images/raytracer/glossiness.webp" caption="Glossy reflections and soft shadows from area-light sampling." %}

### Multithreading

Rendering is embarrassingly parallel: each pixel is independent. The image is split into work that is distributed across CPU threads, so render time scales with core count.

{% include todo.html text="How is the work split (rows, tiles, a job queue)? Fill in real numbers below: render time single-threaded vs multithreaded, and with vs without the BVH." %}

{% include todo.html text="Add a performance table here, e.g. | Configuration | Render time |, with brute force vs BVH and 1 thread vs N threads, for one named scene and resolution." %}

## Results & Learnings

{% include todo.html text="What did building this teach you that you now use in real-time work? What would you add next (BVH on the GPU, importance sampling, a denoiser)?" %}

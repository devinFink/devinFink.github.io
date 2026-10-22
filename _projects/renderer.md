---
title: OpenGL Renderer
# Hidden from the site. Delete this line to bring the page back.
published: false
order: 6
category: graphics
engine: OpenGL / C++
role: Sole creator
team: Solo
duration: Jan – May 2025
platforms: PC
summary: Rasterization pipeline built from scratch in C++/OpenGL, with custom GLSL shaders, adaptive tessellation, shadow mapping, and environment mapping.
tagline: A real-time, rasterization-based renderer in C++ and OpenGL, the counterpart to my ray tracer. It implements shadow mapping, environment mapping, and the full programmable pipeline.
description: Case study of a C++ / OpenGL real-time renderer with shadow mapping, environment mapping and tessellation shaders, by Devin Fink.
tags: [C++, OpenGL, GLSL, Tessellation, Shadow Mapping, Render-to-Texture]
cover: /images/renderer/environment-map.webp
image: /images/renderer/environment-map.webp
thumb: /images/renderer/environment-map-sm.webp
thumb_alt: /images/renderer/shadow-map-sm.webp
hero:
  type: image
  src: /images/renderer/environment-map.webp
  caption: A reflective teapot with an environment cube map
gallery:
  - { src: /images/renderer/environment-map.webp, thumb: /images/renderer/environment-map-sm.webp, caption: "Environment mapping: reflections sampled from a cube map" }
  - { src: /images/renderer/shadow-map.webp, thumb: /images/renderer/shadow-map-sm.webp, caption: "Shadow mapping: the teapot casting onto the ground plane" }
  - { todo: "Wireframe screenshot showing tessellation" }
  - { todo: "GIF: a moving light with the shadow updating in real time" }
---

## Overview

This renderer is the real-time counterpart to my [ray tracer](/rayTracer). Instead of tracing rays, it uses the **rasterization pipeline** every game engine relies on each frame. It draws mesh scenes in 3D with **shadow mapping** for shadows, **cube-map environment mapping** for reflections, and custom **geometry and tessellation shaders**. It's written in **C++** on **OpenGL**, with **GLFW** for the window and input.

<div class="highlights">
<div class="highlight"><strong>Shadow mapping</strong><span>A depth pass from the light, then a depth comparison per fragment.</span></div>
<div class="highlight"><strong>Environment mapping</strong><span>Reflections sampled from a cube map by reflecting the view vector.</span></div>
<div class="highlight"><strong>Programmable pipeline</strong><span>Custom vertex, geometry, tessellation, and fragment shaders, including adaptive level-of-detail tessellation.</span></div>
<div class="highlight"><strong>Render targets</strong><span>Render-to-texture passes and GPU resource binding across multiple render targets.</span></div>
</div>

## Architecture

Every stage, from vertex processing through fragment shading, is my own code rather than a prebuilt engine. Each frame renders in **two passes**, each into its own render target. The first renders the scene from the light's point of view and writes only depth, which produces the shadow map. The second renders from the camera. Each fragment is transformed into light space and compared against the shadow map to decide whether it's lit. Reflective surfaces also sample the environment cube map.

{% include figure.html svg="diagrams/shadow-mapping.svg" caption="Two passes per frame: a depth pass from the light, then shading from the camera." %}

## Deep Dive

### Shadow mapping

Shadow mapping turns "is this point visible from the light?" into a texture lookup. The depth pass stores the nearest surface the light can see. In the main pass, a fragment that is farther from the light than that stored depth must be behind something, so it's in shadow.

{% include figure.html src="/images/renderer/shadow-map.webp" caption="The teapot's shadow on the ground plane." %}

{% include todo.html text="Mention how you handled shadow acne and peter-panning (depth bias? front-face culling in the depth pass?) and whether you did any filtering (PCF). Paste the GLSL shadow test in a ```glsl block." %}

### Environment mapping & reflections

The environment is a **cube map**. For reflective surfaces, the fragment shader reflects the view direction about the surface normal and uses the result to sample the cube map. That gives convincing reflections cheaply, without tracing a single ray.

{% include figure.html src="/images/renderer/environment-map.webp" caption="The teapot reflecting its surroundings through cube-map sampling." %}

### Geometry & tessellation shaders

The pipeline includes custom **geometry** and **tessellation** stages. Tessellation is **dynamic**: curved surfaces are subdivided more finely as they need it, giving adaptive level of detail without authoring extra geometry.

{% include figure.html todo="Wireframe screenshot, ideally with two tessellation levels side by side." %}

{% include todo.html text="What drives the tessellation level (camera distance? screen-space size?) and what did the geometry shader do?" %}

## Results & Learnings

{% include todo.html text="One or two takeaways comparing this to the ray tracer: what was easier, what was harder, and what transfers to engine work." %}

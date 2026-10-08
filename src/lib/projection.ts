/** Minimal 3D maths for the hero topology: rotation and perspective projection. */

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface Projected {
  x: number;
  y: number;
  /** Perspective scale factor (1 at the focal plane). */
  scale: number;
  /** Camera-space depth; larger is farther away. */
  depth: number;
}

export function rotateY(p: Vec3, a: number): Vec3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
}

export function rotateX(p: Vec3, a: number): Vec3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
}

export interface Camera {
  width: number;
  height: number;
  /** Distance from the camera to the origin, in scene units. */
  distance: number;
  /** Pixels per scene unit at the focal plane. */
  zoom: number;
}

export function project(p: Vec3, cam: Camera): Projected {
  const depth = cam.distance + p.z;
  const scale = cam.distance / Math.max(depth, 0.01);
  return {
    x: cam.width / 2 + p.x * cam.zoom * scale,
    y: cam.height / 2 - p.y * cam.zoom * scale,
    scale,
    depth,
  };
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

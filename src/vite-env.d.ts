/// <reference types="vite/client" />

// GLB file imports
declare module '*.glb?url' {
  const src: string;
  export default src;
}

declare module '*.glb' {
  const src: string;
  export default src;
}

// GLTF file imports
declare module '*.gltf?url' {
  const src: string;
  export default src;
}

declare module '*.gltf' {
  const src: string;
  export default src;
}

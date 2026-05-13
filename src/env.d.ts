/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

declare const Astro: Readonly<import("astro").AstroGlobal>;

declare global {
  interface SDKTypeMode {
    strict: true;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  interface ImportMetaEnv {
    readonly BASE_NAME?: string;
  }
}

interface PageMetadata {
  pageIdentifier?: string;
  [key: string]: unknown;
}

declare module "react-router-dom" {
  export interface IndexRouteObject {
    routeMetadata?: PageMetadata;
  }
  export interface NonIndexRouteObject {
    routeMetadata?: PageMetadata;
  }
}

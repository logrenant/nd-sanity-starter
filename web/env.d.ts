/// <reference types="vite/client" />
/// <reference types="react-router" />
/// <reference types="@shopify/oxygen-workers-types" />
/// <reference types="@shopify/hydrogen/react-router-types" />

// Enhance TypeScript's built-in typings.
import type {HydrogenEnv} from '@shopify/hydrogen';
import '@total-typescript/ts-reset';

declare global {
  interface Env extends HydrogenEnv {
    PUBLIC_SANITY_PROJECT_ID: string;
    PUBLIC_SANITY_DATASET: string;
    PUBLIC_SANITY_API_VERSION?: string;
    SANITY_API_TOKEN?: string;
  }
}

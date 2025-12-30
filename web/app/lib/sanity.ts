import {createClient} from '@sanity/client'
import type {SanityClient} from '@sanity/client'

export interface SanityConfig {
  projectId: string
  dataset: string
  apiVersion: string
  useCdn: boolean
  token?: string
}

/**
 * Create a Sanity client for server-side usage
 */
export function createSanityClient(config: SanityConfig): SanityClient {
  return createClient({
    projectId: config.projectId,
    dataset: config.dataset,
    apiVersion: config.apiVersion,
    useCdn: config.useCdn,
    token: config.token,
  })
}

/**
 * Get Sanity configuration from environment variables
 */
export function getSanityConfig(env: Env): SanityConfig {
  const projectId = env.PUBLIC_SANITY_PROJECT_ID
  const dataset = env.PUBLIC_SANITY_DATASET
  const apiVersion = env.PUBLIC_SANITY_API_VERSION || '2024-12-25'
  const token = env.SANITY_API_TOKEN

  if (!projectId || !dataset) {
    throw new Error(
      'Missing Sanity configuration. Please set PUBLIC_SANITY_PROJECT_ID and PUBLIC_SANITY_DATASET in your .env file'
    )
  }

  return {
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    token,
  }
}

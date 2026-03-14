import { type CustomToolDefinition } from "@clawpilot/types"

export type StoredCustomTool = CustomToolDefinition & { source?: string }

export interface LoadResult {
	loaded: string[]
	failed: Array<{ file: string; error: string }>
}

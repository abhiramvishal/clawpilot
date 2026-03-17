import { z } from "zod"

export const CLAW_LAST_MODEL_SELECTION_KEY = "evals-claw-last-model-selection"

const modelIdListSchema = z.array(z.string())

function hasLocalStorage(): boolean {
	try {
		return typeof localStorage !== "undefined"
	} catch {
		return false
	}
}

function safeGetItem(key: string): string | null {
	try {
		return localStorage.getItem(key)
	} catch {
		return null
	}
}

function safeSetItem(key: string, value: string): void {
	try {
		localStorage.setItem(key, value)
	} catch {
		// ignore
	}
}

function safeRemoveItem(key: string): void {
	try {
		localStorage.removeItem(key)
	} catch {
		// ignore
	}
}

function tryParseJson(raw: string | null): unknown {
	if (raw === null) return undefined
	try {
		return JSON.parse(raw)
	} catch {
		return undefined
	}
}

function normalizeModelIds(modelIds: string[]): string[] {
	const unique = new Set<string>()
	for (const id of modelIds) {
		const trimmed = id.trim()
		if (trimmed) unique.add(trimmed)
	}
	return Array.from(unique)
}

export function loadClawLastModelSelection(): string[] {
	if (!hasLocalStorage()) return []

	const parsed = modelIdListSchema.safeParse(tryParseJson(safeGetItem(CLAW_LAST_MODEL_SELECTION_KEY)))
	if (!parsed.success) return []

	return normalizeModelIds(parsed.data)
}

export function saveClawLastModelSelection(modelIds: string[]): void {
	if (!hasLocalStorage()) return

	const normalized = normalizeModelIds(modelIds)
	if (normalized.length === 0) {
		safeRemoveItem(CLAW_LAST_MODEL_SELECTION_KEY)
		return
	}

	safeSetItem(CLAW_LAST_MODEL_SELECTION_KEY, JSON.stringify(normalized))
}

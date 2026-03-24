import { z } from "zod"

import { clawPilotSettingsSchema } from "./global-settings.js"

/**
 * Claw CLI stdin commands
 */

export const clawCliCommandNames = ["start", "message", "cancel", "ping", "shutdown"] as const

export const clawCliCommandNameSchema = z.enum(clawCliCommandNames)

export type ClawCliCommandName = z.infer<typeof clawCliCommandNameSchema>

export const clawCliCommandBaseSchema = z.object({
	command: clawCliCommandNameSchema,
	requestId: z.string().min(1),
})

export type ClawCliCommandBase = z.infer<typeof clawCliCommandBaseSchema>

const clawCliSessionIdSchema = z
	.string()
	.trim()
	.regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)

export const clawCliStartCommandSchema = clawCliCommandBaseSchema.extend({
	command: z.literal("start"),
	prompt: z.string(),
	taskId: clawCliSessionIdSchema.optional(),
	images: z.array(z.string()).optional(),
	configuration: clawPilotSettingsSchema.optional(),
})

export type ClawCliStartCommand = z.infer<typeof clawCliStartCommandSchema>

export const clawCliMessageCommandSchema = clawCliCommandBaseSchema.extend({
	command: z.literal("message"),
	prompt: z.string(),
	images: z.array(z.string()).optional(),
})

export type ClawCliMessageCommand = z.infer<typeof clawCliMessageCommandSchema>

export const clawCliCancelCommandSchema = clawCliCommandBaseSchema.extend({
	command: z.literal("cancel"),
})

export type ClawCliCancelCommand = z.infer<typeof clawCliCancelCommandSchema>

export const clawCliPingCommandSchema = clawCliCommandBaseSchema.extend({
	command: z.literal("ping"),
})

export type ClawCliPingCommand = z.infer<typeof clawCliPingCommandSchema>

export const clawCliShutdownCommandSchema = clawCliCommandBaseSchema.extend({
	command: z.literal("shutdown"),
})

export type ClawCliShutdownCommand = z.infer<typeof clawCliShutdownCommandSchema>

export const clawCliInputCommandSchema = z.discriminatedUnion("command", [
	clawCliStartCommandSchema,
	clawCliMessageCommandSchema,
	clawCliCancelCommandSchema,
	clawCliPingCommandSchema,
	clawCliShutdownCommandSchema,
])

export type ClawCliInputCommand = z.infer<typeof clawCliInputCommandSchema>

/**
 * Claw CLI stream-json output
 */

export const clawCliOutputFormats = ["text", "json", "stream-json"] as const

export const clawCliOutputFormatSchema = z.enum(clawCliOutputFormats)

export type ClawCliOutputFormat = z.infer<typeof clawCliOutputFormatSchema>

export const clawCliEventTypes = [
	"system",
	"control",
	"queue",
	"assistant",
	"user",
	"tool_use",
	"tool_result",
	"thinking",
	"error",
	"result",
] as const

export const clawCliEventTypeSchema = z.enum(clawCliEventTypes)

export type ClawCliEventType = z.infer<typeof clawCliEventTypeSchema>

export const clawCliControlSubtypes = ["ack", "done", "error"] as const

export const clawCliControlSubtypeSchema = z.enum(clawCliControlSubtypes)

export type ClawCliControlSubtype = z.infer<typeof clawCliControlSubtypeSchema>

export const clawCliQueueItemSchema = z.object({
	id: z.string().min(1),
	text: z.string().optional(),
	imageCount: z.number().optional(),
	timestamp: z.number().optional(),
})

export type ClawCliQueueItem = z.infer<typeof clawCliQueueItemSchema>

export const clawCliToolUseSchema = z.object({
	name: z.string(),
	input: z.record(z.unknown()).optional(),
})

export type ClawCliToolUse = z.infer<typeof clawCliToolUseSchema>

export const clawCliToolResultSchema = z.object({
	name: z.string(),
	output: z.string().optional(),
	error: z.string().optional(),
	exitCode: z.number().optional(),
})

export type ClawCliToolResult = z.infer<typeof clawCliToolResultSchema>

export const clawCliCostSchema = z.object({
	totalCost: z.number().optional(),
	inputTokens: z.number().optional(),
	outputTokens: z.number().optional(),
	cacheWrites: z.number().optional(),
	cacheReads: z.number().optional(),
})

export type ClawCliCost = z.infer<typeof clawCliCostSchema>

export const clawCliStreamEventSchema = z
	.object({
		type: clawCliEventTypeSchema.optional(),
		subtype: z.string().optional(),
		requestId: z.string().optional(),
		command: clawCliCommandNameSchema.optional(),
		taskId: z.string().optional(),
		code: z.string().optional(),
		content: z.string().optional(),
		success: z.boolean().optional(),
		id: z.number().optional(),
		done: z.boolean().optional(),
		queueDepth: z.number().optional(),
		queue: z.array(clawCliQueueItemSchema).optional(),
		schemaVersion: z.number().optional(),
		protocol: z.string().optional(),
		capabilities: z.array(z.string()).optional(),
		tool_use: clawCliToolUseSchema.optional(),
		tool_result: clawCliToolResultSchema.optional(),
		cost: clawCliCostSchema.optional(),
	})
	.passthrough()

export type ClawCliStreamEvent = z.infer<typeof clawCliStreamEventSchema>

export const clawCliControlEventSchema = clawCliStreamEventSchema.extend({
	type: z.literal("control"),
	subtype: clawCliControlSubtypeSchema,
	requestId: z.string().min(1),
})

export type ClawCliControlEvent = z.infer<typeof clawCliControlEventSchema>

export const clawCliFinalOutputSchema = z.object({
	type: z.literal("result"),
	success: z.boolean(),
	content: z.string().optional(),
	cost: clawCliCostSchema.optional(),
	events: z.array(clawCliStreamEventSchema),
})

export type ClawCliFinalOutput = z.infer<typeof clawCliFinalOutputSchema>

export { clawCliCommandNames as rooCliCommandNames }
export { clawCliCommandNameSchema as rooCliCommandNameSchema }
export type { ClawCliCommandName as RooCliCommandName }
export { clawCliCommandBaseSchema as rooCliCommandBaseSchema }
export type { ClawCliCommandBase as RooCliCommandBase }
export { clawCliStartCommandSchema as rooCliStartCommandSchema }
export type { ClawCliStartCommand as RooCliStartCommand }
export { clawCliMessageCommandSchema as rooCliMessageCommandSchema }
export type { ClawCliMessageCommand as RooCliMessageCommand }
export { clawCliCancelCommandSchema as rooCliCancelCommandSchema }
export type { ClawCliCancelCommand as RooCliCancelCommand }
export { clawCliPingCommandSchema as rooCliPingCommandSchema }
export type { ClawCliPingCommand as RooCliPingCommand }
export { clawCliShutdownCommandSchema as rooCliShutdownCommandSchema }
export type { ClawCliShutdownCommand as RooCliShutdownCommand }
export { clawCliInputCommandSchema as rooCliInputCommandSchema }
export type { ClawCliInputCommand as RooCliInputCommand }
export { clawCliStreamEventSchema as rooCliStreamEventSchema }
export type { ClawCliStreamEvent as RooCliStreamEvent }
export { clawCliControlEventSchema as rooCliControlEventSchema }
export type { ClawCliControlEvent as RooCliControlEvent }
export { clawCliFinalOutputSchema as rooCliFinalOutputSchema }
export type { ClawCliFinalOutput as RooCliFinalOutput }

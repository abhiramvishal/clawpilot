import { z } from "zod"

import { clineMessageSchema, queuedMessageSchema, tokenUsageSchema } from "./message.js"
import { modelInfoSchema } from "./model.js"
import { toolNamesSchema, toolUsageSchema } from "./tool.js"

/**
 * ClawPilotEventName
 */

export enum ClawPilotEventName {
	// Task Provider Lifecycle
	TaskCreated = "taskCreated",

	// Task Lifecycle
	TaskStarted = "taskStarted",
	TaskCompleted = "taskCompleted",
	TaskAborted = "taskAborted",
	TaskFocused = "taskFocused",
	TaskUnfocused = "taskUnfocused",
	TaskActive = "taskActive",
	TaskInteractive = "taskInteractive",
	TaskResumable = "taskResumable",
	TaskIdle = "taskIdle",

	// Subtask Lifecycle
	TaskPaused = "taskPaused",
	TaskUnpaused = "taskUnpaused",
	TaskSpawned = "taskSpawned",
	TaskDelegated = "taskDelegated",
	TaskDelegationCompleted = "taskDelegationCompleted",
	TaskDelegationResumed = "taskDelegationResumed",

	// Task Execution
	Message = "message",
	TaskModeSwitched = "taskModeSwitched",
	TaskAskResponded = "taskAskResponded",
	TaskUserMessage = "taskUserMessage",
	QueuedMessagesUpdated = "queuedMessagesUpdated",

	// Task Analytics
	TaskTokenUsageUpdated = "taskTokenUsageUpdated",
	TaskToolFailed = "taskToolFailed",

	// Configuration Changes
	ModeChanged = "modeChanged",
	ProviderProfileChanged = "providerProfileChanged",

	// Query Responses
	CommandsResponse = "commandsResponse",
	ModesResponse = "modesResponse",
	ModelsResponse = "modelsResponse",

	// Evals
	EvalPass = "evalPass",
	EvalFail = "evalFail",
}

/**
 * ClawPilotEvents
 */

export const clawPilotEventsSchema = z.object({
	[ClawPilotEventName.TaskCreated]: z.tuple([z.string()]),

	[ClawPilotEventName.TaskStarted]: z.tuple([z.string()]),
	[ClawPilotEventName.TaskCompleted]: z.tuple([
		z.string(),
		tokenUsageSchema,
		toolUsageSchema,
		z.object({
			isSubtask: z.boolean(),
		}),
	]),
	[ClawPilotEventName.TaskAborted]: z.tuple([z.string()]),
	[ClawPilotEventName.TaskFocused]: z.tuple([z.string()]),
	[ClawPilotEventName.TaskUnfocused]: z.tuple([z.string()]),
	[ClawPilotEventName.TaskActive]: z.tuple([z.string()]),
	[ClawPilotEventName.TaskInteractive]: z.tuple([z.string()]),
	[ClawPilotEventName.TaskResumable]: z.tuple([z.string()]),
	[ClawPilotEventName.TaskIdle]: z.tuple([z.string()]),

	[ClawPilotEventName.TaskPaused]: z.tuple([z.string()]),
	[ClawPilotEventName.TaskUnpaused]: z.tuple([z.string()]),
	[ClawPilotEventName.TaskSpawned]: z.tuple([z.string(), z.string()]),
	[ClawPilotEventName.TaskDelegated]: z.tuple([
		z.string(), // parentTaskId
		z.string(), // childTaskId
	]),
	[ClawPilotEventName.TaskDelegationCompleted]: z.tuple([
		z.string(), // parentTaskId
		z.string(), // childTaskId
		z.string(), // completionResultSummary
	]),
	[ClawPilotEventName.TaskDelegationResumed]: z.tuple([
		z.string(), // parentTaskId
		z.string(), // childTaskId
	]),

	[ClawPilotEventName.Message]: z.tuple([
		z.object({
			taskId: z.string(),
			action: z.union([z.literal("created"), z.literal("updated")]),
			message: clineMessageSchema,
		}),
	]),
	[ClawPilotEventName.TaskModeSwitched]: z.tuple([z.string(), z.string()]),
	[ClawPilotEventName.TaskAskResponded]: z.tuple([z.string()]),
	[ClawPilotEventName.TaskUserMessage]: z.tuple([z.string()]),
	[ClawPilotEventName.QueuedMessagesUpdated]: z.tuple([z.string(), z.array(queuedMessageSchema)]),

	[ClawPilotEventName.TaskToolFailed]: z.tuple([z.string(), toolNamesSchema, z.string()]),
	[ClawPilotEventName.TaskTokenUsageUpdated]: z.tuple([z.string(), tokenUsageSchema, toolUsageSchema]),

	[ClawPilotEventName.ModeChanged]: z.tuple([z.string()]),
	[ClawPilotEventName.ProviderProfileChanged]: z.tuple([z.object({ name: z.string(), provider: z.string() })]),

	[ClawPilotEventName.CommandsResponse]: z.tuple([
		z.array(
			z.object({
				name: z.string(),
				source: z.enum(["global", "project", "built-in"]),
				filePath: z.string().optional(),
				description: z.string().optional(),
				argumentHint: z.string().optional(),
			}),
		),
	]),
	[ClawPilotEventName.ModesResponse]: z.tuple([z.array(z.object({ slug: z.string(), name: z.string() }))]),
	[ClawPilotEventName.ModelsResponse]: z.tuple([z.record(z.string(), modelInfoSchema)]),
})

export type ClawPilotEvents = z.infer<typeof clawPilotEventsSchema>

/**
 * TaskEvent
 */

export const taskEventSchema = z.discriminatedUnion("eventName", [
	// Task Provider Lifecycle
	z.object({
		eventName: z.literal(ClawPilotEventName.TaskCreated),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.TaskCreated],
		taskId: z.number().optional(),
	}),

	// Task Lifecycle
	z.object({
		eventName: z.literal(ClawPilotEventName.TaskStarted),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.TaskStarted],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(ClawPilotEventName.TaskCompleted),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.TaskCompleted],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(ClawPilotEventName.TaskAborted),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.TaskAborted],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(ClawPilotEventName.TaskFocused),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.TaskFocused],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(ClawPilotEventName.TaskUnfocused),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.TaskUnfocused],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(ClawPilotEventName.TaskActive),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.TaskActive],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(ClawPilotEventName.TaskInteractive),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.TaskInteractive],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(ClawPilotEventName.TaskResumable),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.TaskResumable],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(ClawPilotEventName.TaskIdle),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.TaskIdle],
		taskId: z.number().optional(),
	}),

	// Subtask Lifecycle
	z.object({
		eventName: z.literal(ClawPilotEventName.TaskPaused),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.TaskPaused],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(ClawPilotEventName.TaskUnpaused),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.TaskUnpaused],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(ClawPilotEventName.TaskSpawned),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.TaskSpawned],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(ClawPilotEventName.TaskDelegated),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.TaskDelegated],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(ClawPilotEventName.TaskDelegationCompleted),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.TaskDelegationCompleted],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(ClawPilotEventName.TaskDelegationResumed),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.TaskDelegationResumed],
		taskId: z.number().optional(),
	}),

	// Task Execution
	z.object({
		eventName: z.literal(ClawPilotEventName.Message),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.Message],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(ClawPilotEventName.TaskModeSwitched),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.TaskModeSwitched],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(ClawPilotEventName.TaskAskResponded),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.TaskAskResponded],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(ClawPilotEventName.QueuedMessagesUpdated),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.QueuedMessagesUpdated],
		taskId: z.number().optional(),
	}),

	// Task Analytics
	z.object({
		eventName: z.literal(ClawPilotEventName.TaskToolFailed),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.TaskToolFailed],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(ClawPilotEventName.TaskTokenUsageUpdated),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.TaskTokenUsageUpdated],
		taskId: z.number().optional(),
	}),

	// Query Responses
	z.object({
		eventName: z.literal(ClawPilotEventName.CommandsResponse),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.CommandsResponse],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(ClawPilotEventName.ModesResponse),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.ModesResponse],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(ClawPilotEventName.ModelsResponse),
		payload: clawPilotEventsSchema.shape[ClawPilotEventName.ModelsResponse],
		taskId: z.number().optional(),
	}),

	// Evals
	z.object({
		eventName: z.literal(ClawPilotEventName.EvalPass),
		payload: z.undefined(),
		taskId: z.number(),
	}),
	z.object({
		eventName: z.literal(ClawPilotEventName.EvalFail),
		payload: z.undefined(),
		taskId: z.number(),
	}),
])

export type TaskEvent = z.infer<typeof taskEventSchema>

export { clawPilotEventsSchema as rooCodeEventsSchema }

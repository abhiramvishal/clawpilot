// npx vitest run __tests__/delegation-events.spec.ts

import { ClawPilotEventName, rooCodeEventsSchema, taskEventSchema } from "@clawpilot/types"

describe("delegation event schemas", () => {
	test("rooCodeEventsSchema validates tuples", () => {
		expect(() => (rooCodeEventsSchema.shape as any)[ClawPilotEventName.TaskDelegated].parse(["p", "c"])).not.toThrow()
		expect(() =>
			(rooCodeEventsSchema.shape as any)[ClawPilotEventName.TaskDelegationCompleted].parse(["p", "c", "s"]),
		).not.toThrow()
		expect(() =>
			(rooCodeEventsSchema.shape as any)[ClawPilotEventName.TaskDelegationResumed].parse(["p", "c"]),
		).not.toThrow()

		// invalid shapes
		expect(() => (rooCodeEventsSchema.shape as any)[ClawPilotEventName.TaskDelegated].parse(["p"])).toThrow()
		expect(() =>
			(rooCodeEventsSchema.shape as any)[ClawPilotEventName.TaskDelegationCompleted].parse(["p", "c"]),
		).toThrow()
		expect(() => (rooCodeEventsSchema.shape as any)[ClawPilotEventName.TaskDelegationResumed].parse(["p"])).toThrow()
	})

	test("taskEventSchema discriminated union includes delegation events", () => {
		expect(() =>
			taskEventSchema.parse({
				eventName: ClawPilotEventName.TaskDelegated,
				payload: ["p", "c"],
				taskId: 1,
			}),
		).not.toThrow()

		expect(() =>
			taskEventSchema.parse({
				eventName: ClawPilotEventName.TaskDelegationCompleted,
				payload: ["p", "c", "s"],
				taskId: 1,
			}),
		).not.toThrow()

		expect(() =>
			taskEventSchema.parse({
				eventName: ClawPilotEventName.TaskDelegationResumed,
				payload: ["p", "c"],
				taskId: 1,
			}),
		).not.toThrow()
	})
})

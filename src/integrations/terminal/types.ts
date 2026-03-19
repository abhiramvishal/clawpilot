import EventEmitter from "events"

export type ClawTerminalProvider = "vscode" | "execa"

export interface ClawTerminal {
	provider: ClawTerminalProvider
	id: number
	busy: boolean
	running: boolean
	taskId?: string
	process?: ClawTerminalProcess
	getCurrentWorkingDirectory(): string
	isClosed: () => boolean
	runCommand: (command: string, callbacks: ClawTerminalCallbacks) => ClawTerminalProcessResultPromise
	setActiveStream(stream: AsyncIterable<string> | undefined, pid?: number): void
	shellExecutionComplete(exitDetails: ExitCodeDetails): void
	getProcessesWithOutput(): ClawTerminalProcess[]
	getUnretrievedOutput(): string
	getLastCommand(): string
	cleanCompletedProcessQueue(): void
}

export interface ClawTerminalCallbacks {
	onLine: (line: string, process: ClawTerminalProcess) => void
	onCompleted: (output: string | undefined, process: ClawTerminalProcess) => void | Promise<void>
	onShellExecutionStarted: (pid: number | undefined, process: ClawTerminalProcess) => void
	onShellExecutionComplete: (details: ExitCodeDetails, process: ClawTerminalProcess) => void
	onNoShellIntegration?: (message: string, process: ClawTerminalProcess) => void
}

export interface ClawTerminalProcess extends EventEmitter<ClawTerminalProcessEvents> {
	command: string
	isHot: boolean
	run: (command: string) => Promise<void>
	continue: () => void
	abort: () => void
	hasUnretrievedOutput: () => boolean
	getUnretrievedOutput: () => string
	trimRetrievedOutput: () => void
}

export type ClawTerminalProcessResultPromise = ClawTerminalProcess & Promise<void>

export interface ClawTerminalProcessEvents {
	line: [line: string]
	continue: []
	completed: [output?: string]
	stream_available: [stream: AsyncIterable<string>]
	shell_execution_started: [pid: number | undefined]
	shell_execution_complete: [exitDetails: ExitCodeDetails]
	error: [error: Error]
	no_shell_integration: [message: string]
}

export interface ExitCodeDetails {
	exitCode: number | undefined
	signal?: number | undefined
	signalName?: string
	coreDumpPossible?: boolean
}

export type RooTerminalProvider = ClawTerminalProvider
export type RooTerminal = ClawTerminal
export type RooTerminalCallbacks = ClawTerminalCallbacks
export type RooTerminalProcess = ClawTerminalProcess
export type RooTerminalProcessResultPromise = ClawTerminalProcessResultPromise
export type RooTerminalProcessEvents = ClawTerminalProcessEvents

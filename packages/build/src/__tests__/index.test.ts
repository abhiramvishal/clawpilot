// npx vitest run src/__tests__/index.test.ts

import { generatePackageJson } from "../index.js"

describe("generatePackageJson", () => {
	it("should be a test", () => {
		const generatedPackageJson = generatePackageJson({
			packageJson: {
				name: "clawpilot",
				displayName: "%extension.displayName%",
				description: "%extension.description%",
				publisher: "clawpilot",
				version: "3.17.2",
				icon: "assets/icons/icon.png",
				contributes: {
					viewsContainers: {
						activitybar: [
							{
								id: "clawpilot-ActivityBar",
								title: "%views.activitybar.title%",
								icon: "assets/icons/icon.svg",
							},
						],
					},
					views: {
						"clawpilot-ActivityBar": [
							{
								type: "webview",
								id: "clawpilot.SidebarProvider",
								name: "",
							},
						],
					},
					commands: [
						{
							command: "clawpilot.plusButtonClicked",
							title: "%command.newTask.title%",
							icon: "$(edit)",
						},
						{
							command: "clawpilot.openInNewTab",
							title: "%command.openInNewTab.title%",
							category: "%configuration.title%",
						},
					],
					menus: {
						"editor/context": [
							{
								submenu: "clawpilot.contextMenu",
								group: "navigation",
							},
						],
						"clawpilot.contextMenu": [
							{
								command: "clawpilot.addToContext",
								group: "1_actions@1",
							},
						],
						"editor/title": [
							{
								command: "clawpilot.plusButtonClicked",
								group: "navigation@1",
								when: "activeWebviewPanelId == clawpilot.TabPanelProvider",
							},
							{
								command: "clawpilot.settingsButtonClicked",
								group: "navigation@6",
								when: "activeWebviewPanelId == clawpilot.TabPanelProvider",
							},
							{
								command: "clawpilot.accountButtonClicked",
								group: "navigation@6",
								when: "activeWebviewPanelId == clawpilot.TabPanelProvider",
							},
						],
					},
					submenus: [
						{
							id: "clawpilot.contextMenu",
							label: "%views.contextMenu.label%",
						},
						{
							id: "clawpilot.terminalMenu",
							label: "%views.terminalMenu.label%",
						},
					],
					configuration: {
						title: "%configuration.title%",
						properties: {
							"clawpilot.allowedCommands": {
								type: "array",
								items: {
									type: "string",
								},
								default: ["npm test", "npm install", "tsc", "git log", "git diff", "git show"],
								description: "%commands.allowedCommands.description%",
							},
							"clawpilot.customStoragePath": {
								type: "string",
								default: "",
								description: "%settings.customStoragePath.description%",
							},
						},
					},
				},
				scripts: {
					lint: "eslint **/*.ts",
				},
			},
			overrideJson: {
				name: "clawpilot-nightly",
				displayName: "ClawPilot Nightly",
				publisher: "clawpilot",
				version: "0.0.1",
				icon: "assets/icons/icon-nightly.png",
				scripts: {},
			},
			substitution: ["clawpilot", "clawpilot-nightly"],
		})

		expect(generatedPackageJson).toStrictEqual({
			name: "clawpilot-nightly",
			displayName: "ClawPilot Nightly",
			description: "%extension.description%",
			publisher: "clawpilot",
			version: "0.0.1",
			icon: "assets/icons/icon-nightly.png",
			contributes: {
				viewsContainers: {
					activitybar: [
						{
							id: "clawpilot-nightly-ActivityBar",
							title: "%views.activitybar.title%",
							icon: "assets/icons/icon.svg",
						},
					],
				},
				views: {
					"clawpilot-nightly-ActivityBar": [
						{
							type: "webview",
							id: "clawpilot-nightly.SidebarProvider",
							name: "",
						},
					],
				},
				commands: [
					{
						command: "clawpilot-nightly.plusButtonClicked",
						title: "%command.newTask.title%",
						icon: "$(edit)",
					},
					{
						command: "clawpilot-nightly.openInNewTab",
						title: "%command.openInNewTab.title%",
						category: "%configuration.title%",
					},
				],
				menus: {
					"editor/context": [
						{
							submenu: "clawpilot-nightly.contextMenu",
							group: "navigation",
						},
					],
					"clawpilot-nightly.contextMenu": [
						{
							command: "clawpilot-nightly.addToContext",
							group: "1_actions@1",
						},
					],
					"editor/title": [
						{
							command: "clawpilot-nightly.plusButtonClicked",
							group: "navigation@1",
							when: "activeWebviewPanelId == clawpilot-nightly.TabPanelProvider",
						},
						{
							command: "clawpilot-nightly.settingsButtonClicked",
							group: "navigation@6",
							when: "activeWebviewPanelId == clawpilot-nightly.TabPanelProvider",
						},
						{
							command: "clawpilot-nightly.accountButtonClicked",
							group: "navigation@6",
							when: "activeWebviewPanelId == clawpilot-nightly.TabPanelProvider",
						},
					],
				},
				submenus: [
					{
						id: "clawpilot-nightly.contextMenu",
						label: "%views.contextMenu.label%",
					},
					{
						id: "clawpilot-nightly.terminalMenu",
						label: "%views.terminalMenu.label%",
					},
				],
				configuration: {
					title: "%configuration.title%",
					properties: {
						"clawpilot-nightly.allowedCommands": {
							type: "array",
							items: {
								type: "string",
							},
							default: ["npm test", "npm install", "tsc", "git log", "git diff", "git show"],
							description: "%commands.allowedCommands.description%",
						},
						"clawpilot-nightly.customStoragePath": {
							type: "string",
							default: "",
							description: "%settings.customStoragePath.description%",
						},
					},
				},
			},
			scripts: {},
		})
	})
})

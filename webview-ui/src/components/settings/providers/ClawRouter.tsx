import {
	type ProviderSettings,
	type OrganizationAllowList,
	type RouterModels,
	rooDefaultModelId,
} from "@clawpilot/types"

import { useAppTranslation } from "@src/i18n/TranslationContext"
import { vscode } from "@src/utils/vscode"
import { Button } from "@src/components/ui"

import { ModelPicker } from "../ModelPicker"

type ClawRouterProps = {
	apiConfiguration: ProviderSettings
	setApiConfigurationField: (field: keyof ProviderSettings, value: ProviderSettings[keyof ProviderSettings]) => void
	routerModels?: RouterModels
	cloudIsAuthenticated: boolean
	organizationAllowList: OrganizationAllowList
	modelValidationError?: string
	simplifySettings?: boolean
}

export const ClawRouter = ({
	apiConfiguration,
	setApiConfigurationField,
	routerModels,
	cloudIsAuthenticated,
	organizationAllowList,
	modelValidationError,
	simplifySettings,
}: ClawRouterProps) => {
	const { t } = useAppTranslation()

	return (
		<>
			{cloudIsAuthenticated ? (
				<div className="flex justify-between items-center mb-2">
					<div className="text-sm text-vscode-descriptionForeground">
						{t("settings:providers.claw.authenticatedMessage")}
					</div>
				</div>
			) : (
				<div className="flex flex-col gap-2">
					<Button
						variant="primary"
						onClick={() => vscode.postMessage({ type: "clawCloudSignIn" })}
						className="w-fit">
						{t("settings:providers.roo.connectButton")}
					</Button>
				</div>
			)}
			<ModelPicker
				apiConfiguration={apiConfiguration}
				setApiConfigurationField={setApiConfigurationField}
				defaultModelId={rooDefaultModelId}
				models={routerModels?.claw ?? {}}
				modelIdKey="apiModelId"
				serviceName="ClawPilot Router"
				serviceUrl="https://app.clawpilot.com"
				organizationAllowList={organizationAllowList}
				errorMessage={modelValidationError}
				simplifySettings={simplifySettings}
			/>
		</>
	)
}

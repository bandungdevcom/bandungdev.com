/**
 * EDITME: Auth Config
 *
 * Auth-related configuration
 */

import { type AuthStrategy } from "~/services/auth.server"
import { AuthStrategies } from "~/services/auth_strategies"

export const configAuth: ConfigAuth = {
  forms: [
    { label: "Password", provider: AuthStrategies.FORM, isEnabled: true },
    { label: "Magic Link", provider: AuthStrategies.FORM, isEnabled: false },
  ],
  services: [
    { label: "GitHub", provider: AuthStrategies.GITHUB, isEnabled: true },
    { label: "Google", provider: AuthStrategies.GOOGLE, isEnabled: true },
  ],
}

type ConfigAuth = {
  forms: AuthProvider[]
  services: AuthProvider[]
}

type AuthProvider = {
  label: string
  provider: AuthStrategy
  isEnabled?: boolean
}

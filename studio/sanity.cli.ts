import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'd52o8bfr',
    dataset: 'production',
  },
  studioHost: 'backoffice--modern-days',
  deployment: {
    appId: 's2u5piv8r701mwrq9a58059z',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  },
})

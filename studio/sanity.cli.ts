import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ndzi3vg0',
    dataset: 'production'
  },
  studioHost: 'gasemilauh',
  deployment: {
    appId: 'zira8xywe1xtpx0h5jafm3vm',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})

// https://nuxt.com/docs/api/configuration/nuxt-config
// import VPannellum from 'vue-pannellum'
export default defineNuxtConfig({
	ssr: false,
	modules: [
		'nuxt-quasar-ui'
	],
	quasar: {
		plugins: ["Notify"]
	}
})

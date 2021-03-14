module.exports = {
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
	],
	stories: [
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)',
	],
}

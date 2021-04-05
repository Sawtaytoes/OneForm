const storybookConfig = {
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-links',
	],
	stories: [
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)',
	],
}

module.exports = storybookConfig

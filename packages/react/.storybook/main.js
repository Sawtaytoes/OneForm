const storybookConfig = {
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-links',
		'@whitespace/storybook-addon-html',
	],
	stories: [
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)',
	],
}

module.exports = storybookConfig

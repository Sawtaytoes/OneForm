const storybookConfig = {
	addons: [
		'@storybook/addon-actions',
		'@storybook/addon-essentials',
		'@storybook/addon-links',
		'@whitespace/storybook-addon-html',
		'storybook-addon-outline',
	],
	stories: [
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)',
	],
}

module.exports = storybookConfig

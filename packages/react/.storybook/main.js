const storybookConfig = {
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-actions',
		'@storybook/addon-controls',
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

const storybookConfig = {
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-links',
		'@whitespace/storybook-addon-html',
		'storybook-addon-outline',
	],
	stories: [
		'../stories/**/*.stories.mdx',
		'../stories/**/*.stories.@(js|jsx|ts|tsx)',
	],
}

module.exports = storybookConfig

const storybookConfig = {
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-links',
		'@whitespace/storybook-addon-html',
	],
	stories: [
		'../stories/**/*.stories.mdx',
		'../stories/**/*.stories.@(js|jsx|ts|tsx)',
	],
}

module.exports = storybookConfig

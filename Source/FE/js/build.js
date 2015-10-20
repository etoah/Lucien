({

	baseUrl: 'lib',
	paths: {
        app: '../app'	,
		main:'../main'
    },
   dir: '../public/js',
    modules: [
        {
            name: 'main'
        }
    ],
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: "none",
    removeCombined: true
})
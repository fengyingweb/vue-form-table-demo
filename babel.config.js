module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    [
      '@vue/babel-preset-jsx',
      {
        functional: false
      }
    ]
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}

const babelPreset = [
  '@babel/preset-env',
  {
    targets: '> 0.25%, not dead',
    corejs: 3,
    useBuiltIns: 'usage'
  }
]

module.exports = {
  presets: [babelPreset],
  plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-react-jsx']
}
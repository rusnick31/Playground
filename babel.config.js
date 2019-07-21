const bablePreset = [
  '@babel/preset-env',
  {
    targets: '> 0.25%, not dead',
    corejs: 3,
    useBuiltIns: 'usage'
  }
]

module.exports = {
  presets: [bablePreset],
  plugins: ['@babel/plugin-proposal-class-properties']
}
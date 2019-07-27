const env = [
  '@babel/preset-env',
  {
    targets: '> 0.25%, not dead',
    corejs: 3,
    useBuiltIns: 'usage'
  }
]

module.exports = {
  presets: [env, '@babel/preset-typescript'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread', 
    '@babel/plugin-transform-react-jsx'
  ]
}
/**
 * @type {import('stylelint').Config}
 */
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-property-sort-order-smacss',
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss',
  ],
  plugins: ['stylelint-order'],
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', '**/*.json', '**/*.yaml', '**/*.md'],
  rules: {
    'selector-class-pattern': null,
  },
}

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'build',
      'ci',
      'docs',
      'feat',
      'merge',
      'fix',
      'perf',
      'refactor',
      'style',
      'test',
      'revert',
      'update',
      'chore',
    ]],
    'scope-enum': [2, 'always', [
      'root',
      'utils',
      'hooks',
      'ui',
      'config',
      'docs',
      'test',
      'components',
      'types',
    ]], // 子模块/包名称
    'scope-empty': [2, 'never'], // 可选：如果不允许无 scope，设置为 [2, 'never']；如果允许，可改为 [0, 'always']
    'subject-case': [2, 'always', 'lower-case'], // 可选：保持 subject 为小写
  },
}

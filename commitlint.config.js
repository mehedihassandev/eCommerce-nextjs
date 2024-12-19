module.exports = {
  rules: {
    'type-enum': [2, 'always', ['NE']], // Enforce "NE" type
    'header-max-length': [2, 'always', 50000], // Enforce header length
    'scope-empty': [0], // Disable default scope-empty rule
    'scope-case': [2, 'always', 'lower-case'], // Ensure scope is lowercase
  },
  plugins: [
    {
      rules: {
        'scope-pattern': (parsed) => {
          if (!parsed.scope) {
            return [false, `Scope must not be empty.`];
          }

          const scopePattern = /^[0-9]{3}$/; // Match 3-digit numeric scope
          return [
            scopePattern.test(parsed.scope),
            `Scope must be a 3-digit number (e.g., 000, 123).`,
          ];
        },
      },
    },
  ],
  extends: [],
};

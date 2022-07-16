/**
 * @type {import('postcss').PluginCreator}
 */
const util = require("postcss-plugin-utilities");

function varToLess(_, variable) {
  return "@" + variable.substring(2);
}

module.exports = (opts = {}) => {
  // Work with options here

  return {
    postcssPlugin: "postcss-transform-css-var",
    Root(root, postcss) {
      // Transform CSS AST here
      root.walkRules(":root", (rule) => {
        rule.walkDecls((decl) => {
          rule.before(decl);
        });
        rule.remove();
      });
      root.walkDecls((decl) => {
        if (decl.prop.startsWith("--"))
          decl.prop = "@" + decl.prop.substring(2);
      });
      util.parseFunction(root, "var", varToLess);
    },

    /*
    Declaration (decl, postcss) {
      // The faster way to find Declaration node
    }
    */

    /*
    Declaration: {
      color: (decl, postcss) {
        // The fastest way find Declaration node if you know property name
      }
    }
    */
  };
};

module.exports.postcss = true;


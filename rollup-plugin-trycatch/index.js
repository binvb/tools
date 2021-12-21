"use strict";
exports.__esModule = true;
var parse = require("@babel/parser").parse;
var traverse = require("@babel/traverse")["default"];
var t = require("@babel/types");
var core = require("@babel/core");
var isfunctionNode = function (node) {
    return t.isFunctionDeclaration(node, {
        async: true
    }) ||
        t.isArrowFunctionExpression(node, {
            async: true
        }) ||
        t.isFunctionExpression(node, {
            async: true
        }) ||
        t.isObjectMethod(node, {
            async: true
        });
};
function tryCatchPlugin(options) {
    if (options === void 0) { options = {}; }
    // 默认配置
    var DEFAULT = {
        catchCode: function (identifier) { return "console.error(" + identifier + ")"; },
        identifier: "e",
        finallyCode: null
    };
    options = Object.assign(DEFAULT, options);
    if (typeof options.catchCode === "function") {
        options.catchCode = options.catchCode(options.identifier);
    }
    var catchNode = parse(options.catchCode).program.body;
    var finallyNode = options.finallyCode && parse(options.finallyCode).program.body;
    return {
        name: 'try-catch-plugin',
        renderChunk: function (code, id) {
            var ast = parse(code, {
                sourceType: "module",
                plugins: ["dynamicImport"] // 支持动态 import
            });
            traverse(ast, {
                AwaitExpression: function (path) {
                    // 递归向上找异步函数的 node 节点
                    while (path && path.node) {
                        var parentPath = path.parentPath;
                        if (t.isBlockStatement(path.node) &&
                            isfunctionNode(parentPath.node)) {
                            var tryCatchAst = t.tryStatement(path.node, t.catchClause(t.identifier(options.identifier), t.blockStatement(catchNode)), finallyNode && t.blockStatement(finallyNode));
                            path.replaceWithMultiple([tryCatchAst]);
                            return;
                        }
                        else if (
                        // 已经包含 try 语句则直接退出
                        t.isBlockStatement(path.node) &&
                            t.isTryStatement(parentPath.node)) {
                            return;
                        }
                        path = parentPath;
                    }
                }
            });
            return core.transformFromAstSync(ast, null, {
                configFile: false // 屏蔽 babel.config.js，否则会注入 polyfill 使得调试变得困难
            }).code;
        }
    };
}
exports["default"] = tryCatchPlugin;

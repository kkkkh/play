const plugin = {
  meta: {
    name: 'eslint-plugin-lodash',
    version: '1.0.0',
  },
  configs: {},
  rules: {
    'scope-test':{
      meta: {
        type: 'problem',
        docs: {
          description: `
            根据name不是"_"节点，获取当前节点 node，
            再根据node.parent 获取其作用域，有要求：node 是 function（普通变量获取不到）等，sourceCode.scopeManager.acquire(node.parent)才可以获取作用域
            获取作用域中变量，是否有变量名为"_"，没有则报错`,
          category: 'Best Practices',
          recommended: true,
        },
        schema: [], // no options
      },
      create(context){
        let globalScope, globalVariables;
        const sourceCode = context.getSourceCode()
        return {
          Identifier(node) { // 标识符表达式（变量名、函数名等）
            // if (node.name !== '_') return
            // sourceCode.scopeManager.acquire(...) 是 ESLint 内部用于获取当前 AST 节点作用域的方法。
            // Identifier 等普通节点（变量名、属性名）不是作用域创建节点，因此传给 acquire() 会返回 null。
            const scope = sourceCode.scopeManager.acquire(node.parent) // 是当前标识符的父节点，目的是获取标识符所在的实际作用域
            // console.log("scope",scope)
            if (!scope) {
              // 没作用域，无法判断，安全起见不报错
              return;
            }
            // 查找当前作用域中是否声明了名为 _ 的变量
            const variable = scope.variables.find((v) => v.name === '_')
            // console.log("variable",variable)
            // 沒有声明"_"，那反过来判断是全局有了，就提示，一种很不严谨的处理，仅当熟悉插件api写法，与我想写的插件本意相去甚远
            if (!variable || variable.defs.length === 0) {
              context.report({
                node,
                message: 'Usage of global lodash `_` is forbidden. Please import lodash methods explicitly.',
              })
            }
          },
          Program(node) {
            // 分析全局作用域变量	Program 节点	程序入口，只调用一次，效率最高
            globalScope = context.getSourceCode().scopeManager.globalScope;
            globalVariables = new Set(globalScope.variables.map(v => v.name));
            console.log(globalVariables)
            // 在这里分析顶层变量，进行标识符等批量或者条件过滤逻辑
          }
        }
      },

    },
    'no-global-import-lodash': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Disallow global import of entire lodash',
          category: 'Best Practices',
          recommended: true,
        },
        schema: [], // no options
        messages: {
          noGlobalLodashImport: "禁止从 'lodash' 导入整个库，请按需导入。"
        }
      },
      create(context) {
        return {
          ImportDeclaration(node) {
            // 判断导入源是否是 'lodash'
            if (node.source.value === "lodash") {
              // 检查是否是默认导入（import _ from 'lodash'）
              const hasDefaultImport = node.specifiers.some(
                specifier => specifier.type === "ImportDefaultSpecifier"
              );
              if (hasDefaultImport) {
                // 报告错误提醒
                context.report({
                  node,
                  messageId: "noGlobalLodashImport"
                });
              }
            }
          }
        }
      },
    },
    // 'no-import-global-lodash': {
    //   meta: {
    //     type: 'problem',
    //     docs: {
    //       description: 'Disallow usage of global lodash `_` identifier',
    //       category: 'Best Practices',
    //       recommended: true,
    //     },
    //     schema: [], // no options
    //   },
    // }
  },
  processors: {},
}

// for ESM
export default plugin

// OR for CommonJS
// module.exports = plugin;

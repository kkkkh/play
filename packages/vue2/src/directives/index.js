import Vue from 'vue'
const directives = import.meta.glob(['./*.js','!./index.js'], { eager: true ,import: 'default'})

for (const directive of Object.values(directives)) {
  Vue.directive(directive.name, directive)
}

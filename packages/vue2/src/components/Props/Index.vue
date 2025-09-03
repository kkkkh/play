<template>
  <div>
    <h4>Props 父子组件通信</h4>
    <div><span>Name:</span> <input type="text" v-model="form.name" /></div>
    <div><span>Age:</span> {{ form.age }}</div>
    <div><span>Email:</span> {{ form.email }}</div>
    <div><span>Address:</span> {{ form.address }}</div>
    <div style="text-align: left; margin-top: 20px;">child</div>
    <Child :form="form" />
    <div style="text-align: left; margin-top: 20px;">child2</div>
    <Child2 :form.sync="form" />
    <div style="text-align: left; margin-top: 20px;background:#f0f;">child3 可以作为示例</div>
    <Child3 :form.sync="form" />
    <div style="text-align: left; margin-top: 20px;">child4</div>
    <Child4 :name.sync="form.name"/>
  </div>
</template>

<script>
import Child from './Child.vue'
import Child2 from './Child2.vue'
import Child3 from './Child3.vue'
import Child4 from './Child4.vue'
export default {
  name: 'Props',
  components: {
    Child,
    Child2,
    Child3,
    Child4
  },
  data() {
    return {
      form: {
        name: '1',
        age: 0,
        email: '2',
        address: '3'
      }
    }
  }
}
</script>

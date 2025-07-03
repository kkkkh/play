<script setup lang="ts">
// import Versions from './components/Versions.vue'

const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

const appGetPathHandle = (): void => {
  window.electron.ipcRenderer.send('appGetPath')
}

const printHandle = async (): Promise<void> => {
  const res = await window.electron.ipcRenderer.invoke('print', 'id')
  console.log('res', res)
}
</script>

<template>
  <ul>
    <li>electron</li>
    <ul>
      <li @click="ipcHandle">Send IPC</li>
      <li @click="appGetPathHandle">app getPath</li>
    </ul>
    <li>Car</li>
    <ul>
      <li @click="printHandle">Print</li>
    </ul>
  </ul>
  <!-- <Versions /> -->
</template>

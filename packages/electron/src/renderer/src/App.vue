<script setup lang="ts">
import Versions from './components/Versions.vue'

const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC Print</a>
  <Versions />
</template>

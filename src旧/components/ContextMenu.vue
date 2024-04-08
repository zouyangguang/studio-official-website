<template>
  <div style="display: initial" class="ContextMenu" ref="containerRef">
    <slot></slot>
    <Teleport to="body">
      <div v-if="showMenu" class="context-menu" :style="{left:x+'px',top:y+'px'}">
        <div class="menu-list">
          <div @click="handleClick(item)"
               class="menu-item"
               v-for="(item) in menu"
               :key="item.label">
            {{ item.label }}
          </div>
        </div>
      </div>
    </Teleport>
  </div>

</template>

<script setup>
import {defineProps, defineEmits, ref} from "vue";
import useContextMenu from "@/components/js/useContextMenu.js";

const containerRef = ref(null)
defineProps({
  menu: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(["select"])

const {x, y, showMenu} = useContextMenu(containerRef)
const handleClick = (item) => {
  showMenu.value = false
  emit('select', item)
}
</script>
<style>
.ContextMenu:hover {
  border: 3px solid #f88b35;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2), 1px 1px 5px rgba(0, 0, 0, 0.2);
}

</style>
<style scoped>



.context-menu {
  position: fixed;
  background: rgba(253, 253, 253, 0.8);
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2), 1px 1px 5px rgba(0, 0, 0, 0.2);
  min-width: 100px;
  border-radius: 5px;
  font-size: 12px;
  color: #000000;
  line-height: 1.8;
  white-space: nowrap;
  overflow: hidden;
  padding: 5px;
  z-index: 100;
}

.menu-list {
  text-align: center;
}

.menu-list > div {
  padding: 5px 50px;
  font-size: 1.5em;
  border-radius: 5px;
  transition: 0.4s;
  box-sizing: border-box;
}

.menu-list > div:hover {
  color: white;
  background-color: rgba(116, 134, 137, 1);
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2), 1px 1px 5px rgba(0, 0, 0, 0.2);
  text-shadow: 1px 1px 2px rgba(221, 243, 243, 0.7), 1px 1px 5px rgb(24, 24, 24);
}
</style>
import {onMounted, onUnmounted, ref} from "vue";

export default function (containerRef) {
    const showMenu = ref(false)
    const x = ref(0)
    const y = ref(0)

    const handleContextMenu = (e) => {
        e.preventDefault()
        e.stopPropagation()
        showMenu.value = true
        x.value = e.clientX
        y.value = e.clientY

    }

    function closeMenu() {
        showMenu.value = false
    }

    onMounted(() => {
        const div = containerRef.value
        div?.addEventListener('contextmenu', handleContextMenu)
        window.addEventListener('contextmenu', closeMenu, true)
        window.addEventListener('click', closeMenu, true)

    })
    onUnmounted(() => {
        const div = containerRef.value
        div?.removeEventListener('contextmenu', handleContextMenu)
        window.removeEventListener('contextmenu', closeMenu, true)
        window.removeEventListener('click', closeMenu, true)
    })
    return {showMenu, x, y}
}
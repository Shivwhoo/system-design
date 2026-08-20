import DefaultTheme from 'vitepress/theme'
import './style.css'
import { h, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'

const ProgressTracker = {
  setup() {
    const route = useRoute()
    const isChecked = ref(false)
    const topicId = ref('')

    const loadProgress = () => {
      topicId.value = route.path
      const saved = localStorage.getItem('system-design-progress')
      if (saved) {
        const progress = JSON.parse(saved)
        isChecked.value = !!progress[topicId.value]
      } else {
        isChecked.value = false
      }
    }

    const toggleProgress = () => {
      isChecked.value = !isChecked.value
      const saved = localStorage.getItem('system-design-progress')
      const progress = saved ? JSON.parse(saved) : {}
      progress[topicId.value] = isChecked.value
      localStorage.setItem('system-design-progress', JSON.stringify(progress))
      
      // Dispatch a custom event so index.md can update if needed
      window.dispatchEvent(new CustomEvent('progress-updated'))
    }

    onMounted(() => {
      loadProgress()
    })

    watch(() => route.path, () => {
      loadProgress()
    })

    return () => {
      if (route.path === '/' || route.path === '/index.html') return null
      
      return h('div', { class: 'progress-tracker-wrapper' }, [
        h('label', { class: 'progress-tracker-label' }, [
          h('input', {
            type: 'checkbox',
            checked: isChecked.value,
            onChange: toggleProgress,
            class: 'progress-tracker-checkbox'
          }),
          h('span', { class: 'progress-tracker-text' }, isChecked.value ? 'Marked as Completed' : 'Mark as Completed')
        ])
      ])
    }
  }
}

export default {
  ...DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(ProgressTracker)
    })
  }
}

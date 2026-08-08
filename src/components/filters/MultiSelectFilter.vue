<script setup lang="ts">
import { ref, computed } from 'vue'

type Props = {
  label: string
  placeholder: string
  options: {
    id: number
    name: string
  }[]
  modelValue: number[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: number[]]
}>()

const isOpen = ref(false)

const selectedLabels = computed(() => {
  return props.options
    .filter((option) => props.modelValue.includes(option.id))
    .map((option) => option.name)
    .join(', ')
})

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function toggleSelection(id: number) {
  const selected = [...props.modelValue]
  const index = selected.indexOf(id)

  if (index >= 0) {
    selected.splice(index, 1)
  } else {
    selected.push(id)
  }

  emit('update:modelValue', selected)
}
</script>

<template>
  <div class="catalog-filters__field catalog-filters__dropdown catalog-filters__field--grow">
    {{ label }}

    <div class="catalog-filters__dropdown-trigger" @click="toggleDropdown">
      {{ selectedLabels || placeholder }}
    </div>

    <div v-if="isOpen" class="catalog-filters__dropdown-panel">
      <label v-for="option in options" :key="option.id" class="catalog-filters__dropdown-option">
        <input
          type="checkbox"
          :checked="modelValue.includes(option.id)"
          @change="toggleSelection(option.id)"
        />
        {{ option.name }}
      </label>
    </div>
  </div>
</template>

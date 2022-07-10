<template>
    <div class="bigBox" v-show="list.length > 0">
        <div class="label" :class="label">{{ label }}</div>
        <div class="content">
            <draggable class="wrapper" v-model="list" item-key="index" @start="drag = true" @end="drag = false"
                @sort="handleSort()">
                <template #item="{ element }">
                    <div class="aBlock">
                        <div class="taskName">{{ element.Task }}</div>
                        <div v-html="element.Description" class="description"></div>
                        <div class="other">
                            <div v-show="element.Assignee" class="fl">
                                <span class="icon"></span>
                                <span class="assignee">{{ element.Assignee }}</span>
                            </div>
                            <div class="fr btn" :class="`priority${element.Priority}`">Priority {{ element.Priority }}
                            </div>
                        </div>
                    </div>
                </template>
            </draggable>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { sortChange } from '@/api/api'
import draggable from 'vuedraggable'

let drag = ref(false)

let props = defineProps(['list', 'label'])

let emits = defineEmits(['sortChange'])

// 排序
const handleSort = () => {
    let list = [...props.list]
    list.forEach((item, index) => {
        item.Priority = index - 0 + 1
    })
    sortChangeList(list)
}

// 排序触发接口
const sortChangeList = (list) => {
    sortChange({ list }).then((res) => {
        emits('sortChange')
    })
}
</script>
<style>
</style>
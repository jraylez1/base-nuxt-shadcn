<template>
  <div
    class="bg-[#0C2340] transition-all duration-500 ease-in-out py-4 z-40 h-screen"
    :class="slideStore.showSlide ? 'w-56' : 'w-0 overflow-hidden'"
  >
    <div v-if="showContent">
      <NavigationMenu orientation="vertical">
        <NavigationMenuList class="flex-col items-start space-y-2">
          <div v-for="(item, index) in slideItems" :key="index">
            <NavigationMenuItem class="min-w-56" v-if="item.children.length === 0">
              <NavigationMenuLink
                :href="item.url"
                class="flex items-center p-3"
                :class="isActiveRoute(item.url) ? 'bg-[#00416A] text-white' : 'text-[#ffffff80]'"
              >
                <component :is="item.icon" class="h-6 w-6 mr-2" />
                <span>{{ t(item.name) }}</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem class="min-w-56" v-if="item.children.length > 0">
              <Collapsible v-model:open="isOpen[index]" class="w-full space-y-2 text-[#ffffff80]">
                <div class="flex items-center justify-between px-3">
                  <div class="flex">
                    <component :is="item.icon" class="h-6 w-6 mr-2" />
                    <span>{{ t(item.name) }}</span>
                  </div>
                  <CollapsibleTrigger as-child>
                    <Button variant="ghost" size="sm" class="w-9 p-0">
                      <ChevronRight class="h-4 w-4" v-if="!isOpen[index]" />
                      <ChevronDown class="h-4 w-4" v-else />

                      <span class="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                  <div v-for="(child, childIndex) in item.children" :key="childIndex" class="px-2">
                    <NavigationMenuLink
                      :href="child.url"
                      class="flex items-center py-3 px-4 rounded"
                      :class="isActiveRoute(child.url) ? 'bg-[#00416A] text-white' : 'text-[#ffffff80]'"
                    >
                      <component :is="child.icon" class="h-6 w-6 mr-2" />
                      <span>{{ t(child.name) }}</span>
                    </NavigationMenuLink>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlideStore } from '~/store/slide'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { Trello, ChevronDown, ChartArea, ChevronRight } from 'lucide-vue-next'

const slideStore = useSlideStore()
const route = useRoute()
const isOpen = ref<boolean[]>([])
const showContent = ref(false)
const { t } = useI18n()

const slideItems = ref([
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: Trello,
    children: []
  },
  {
    name: 'Report',
    url: '',
    icon: ChartArea,
    children: [
      {
        name: 'Report',
        url: '/report',
        icon: ChartArea
      }
    ]
  }
])

isOpen.value = slideItems.value.map((item) => {
  if (item.children.length > 0) {
    return item.children.some((child) => child.url === route.path)
  }
  return false
})

const isActiveRoute = (url: string) => {
  return route.path === url
}

watchEffect(() => {
  if (slideStore.showSlide) {
    setTimeout(() => {
      showContent.value = true
    }, 400)
  } else {
    showContent.value = false
  }
})
</script>

<style scoped></style>

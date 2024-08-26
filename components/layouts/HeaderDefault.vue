<template>
  <div class="flex justify-between items-center h-20 py-4 px-12 bg-[#212529] fixed top-0 left-0 right-0 z-50">
    <div class="flex">
      <div class="flex w-48">
        <NuxtLink to="/dashboard" class="text-3xl text-white font-bold">LOGO</NuxtLink>
      </div>
      <div class="flex justify-center items-center cursor-pointer" @click="slideStore.switchSlide">
        <AlignJustify class="text-white h-6 w-6" />
      </div>
    </div>

    <div class="space-x-4 flex justify-center items-center">
      <LangSwitch />
      <DropdownMenu>
        <DropdownMenuTrigger class="flex justify-center items-center">
          <Avatar size="sm2">
            <AvatarImage src="/imgs/avatar.png" alt="@radix-vue" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="min-w-40 space-y-2 mt-2">
          <DropdownMenuLabel>{{ $t('My Account') }}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <NuxtLink to="/profile" class="cursor-pointer flex">
              <UserRound class="mr-2 h-4 w-4" /><span>{{ $t('Profile') }}</span></NuxtLink
            >
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button variant="destructive" class="w-full" @click="logout"
              ><LogOut class="mr-2 h-4 w-4" /> <span>{{ $t('Log out') }}</span></Button
            >
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LogOut, UserRound, AlignJustify } from 'lucide-vue-next'
import { useAuthStore } from '~/store/auth'
import { useSlideStore } from '~/store/slide'

const slideStore = useSlideStore()
const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
}
</script>

<style scoped></style>

import { createWebHistory, createRouter } from 'vue-router'

import SpellList from './src/components/SpellList/SpellList.vue'
import CharacterBuilder from './src/components/CharacterBuilder/CharacterBuilder.vue'

const routes = [
  { path: '/', component: SpellList },
  { path: '/character', component: CharacterBuilder }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
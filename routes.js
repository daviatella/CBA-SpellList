import { createWebHistory, createRouter } from 'vue-router'

import SpellList from './src/SpellList'
import CharacterBuilder from './src/CharacterBuilder'

const routes = [
  { path: '/', component: SpellList },
  { path: '/character', component: CharacterBuilder }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
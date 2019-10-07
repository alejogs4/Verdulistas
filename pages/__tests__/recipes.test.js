import { mount } from '@vue/test-utils'
import recipes from '../recipes'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('Tests básicos del componente recipes', () => {
    describe('Test de renderización', () => {
        it('Debería retornar verdadero al verificar que es una instancia de Vue', () => {
            const wrapper = mount(recipes)
            expect(wrapper.isVueInstance()).toBeTruthy()
        })
    })
})
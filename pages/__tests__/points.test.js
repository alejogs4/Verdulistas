import { mount } from '@vue/test-utils'
import points from '../points'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('Tests básicos del componente points', () => {
    describe('Test de renderización', () => {
        it('Debería retornar verdadero al verificar que es una instancia de Vue', () => {
            const wrapper = mount(points)
            expect(wrapper.isVueInstance()).toBeTruthy()
        })
    })
})
import { mount } from '@vue/test-utils'
import index from '../index'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('Tests básicos del componente index', () => {
    describe('Test de renderización', () => {
        it('Debería retornar verdadero al verificar que es una instancia de Vue', () => {
            const wrapper = mount(index)
            expect(wrapper.isVueInstance()).toBeTruthy()
        })
    })
})
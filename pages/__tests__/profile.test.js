import { mount } from '@vue/test-utils'
import profile from '../profile'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('Tests básicos del componente profile', () => {
    describe('Test de renderización', () => {
        it('Debería retornar verdadero al verificar que es una instancia de Vue', () => {
            const wrapper = mount(profile)
            expect(wrapper.isVueInstance()).toBeTruthy()
        })
    })
})
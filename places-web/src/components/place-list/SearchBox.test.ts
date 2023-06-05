import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchBox from './SearchBox.vue';

describe('<SearchBox>', () => {
    it('should have a text input', () => {
        const wrapper = mount(SearchBox, { props: { modelValue: '' } });

        expect(() => wrapper.get('input[type=text]')).not.toThrow();
    });

    it('should support v-model', async () => {
        const wrapper = mount(SearchBox, {
            props: {
                modelValue: 'initial value',
                'onUpdate:modelValue': (modelValue: string) => {
                    wrapper.setProps({ modelValue });
                },
            },
        });

        expect(
            wrapper.get<HTMLInputElement>('input[type=text]').element.value,
        ).toEqual('initial value');

        await wrapper.get('input[type=text]').setValue('expected new value');

        expect(wrapper.props('modelValue')).toEqual('expected new value');
    });

    it('should emit `search` event when form is submitted', async () => {
        const wrapper = mount(SearchBox, {
            props: {
                modelValue: 'expected query',
            },
        });

        await wrapper.get('form').trigger('submit');

        const searchEmits = wrapper.emitted<string>('search');
        expect(searchEmits).toBeDefined();
        expect(searchEmits).toEqual([['expected query']]);
    });
});

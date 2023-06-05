import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import HelloWorld from './HelloWorld.vue';

describe('<HelloWorld>', () => {
    it('should render message', () => {
        const wrapper = mount(HelloWorld, { props: { msg: 'O HAI!' } });
        expect(wrapper.text()).toContain('O HAI!');
    });
});

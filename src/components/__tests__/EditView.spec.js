import { mount, shallowMount } from '@vue/test-utils';
import EditView from '@/views/EditView.vue';
import { describe, it, expect } from "vitest";

describe('EditView.vue', () => {
    it('renders the components', () => {
        const wrapper = mount(EditView);
        expect(wrapper.exists()).toBe(true);
    });
});

import { shallowMount } from '@vue/test-utils';
import LoginView from '@/views/LoginView.vue';
import { describe, it, expect } from "vitest";
import { mount } from '@vue/test-utils';

describe('LoginView.vue', () => {
    it('renders the component', () => {
        const wrapper = mount(LoginView);
        expect(wrapper.exists()).toBe(true);
    });
});

import Login from '@/components/Login.vue';

describe('Login.vue', () => {
    it('displays the login form and required elements', () => {
        const wrapper = shallowMount(Login);

        // Check if the form element is present
        const form = wrapper.find('form');
        expect(form.exists()).toBe(true);

        // Check if the username input field is present
        const usernameInput = form.find('input');
        expect(usernameInput.exists()).toBe(true);

        // Check if the password input field is present
        const passwordInput = form.find('input');
        expect(passwordInput.exists()).toBe(true);

        // Check if the submit button is present
        const submitButton = form.find('button[type="submit"]');
        expect(submitButton.exists()).toBe(true);
    });
});

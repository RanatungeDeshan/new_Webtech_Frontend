import { describe, it, expect } from "vitest";
import { mount, shallowMount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import App from '@/App.vue';
import Home from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
    it('displays the form and required elements', () => {
        const wrapper = shallowMount(Home);

        // Check if the form element is present
        const form = wrapper.find('form');
        expect(form.exists()).toBe(true);

        // Check if the name input field is present
        const nameInput = form.find('input[type="text"][placeholder="Name"]');
        expect(nameInput.exists()).toBe(true);

        // Check if the birthdate input field is present
        const birthdateInput = form.find('input[type="date"][placeholder="Geburtsdatum"]');
        expect(birthdateInput.exists()).toBe(true);

        // Check if the phone number input field is present
        const phoneNumberInput = form.find('input[type="number"][placeholder="TelNum"]');
        expect(phoneNumberInput.exists()).toBe(true);

        // Check if the health condition textarea is present
        const healthConditionTextarea = form.find('textarea[placeholder="Health Condition"]');
        expect(healthConditionTextarea.exists()).toBe(true);

        // Check if the appointment input field is present
        const appointmentInput = form.find('input[type="date"][placeholder="Appointment"]');
        expect(appointmentInput.exists()).toBe(true);

        // Check if the submit button is present
        const submitButton = form.find('button[type="button"][@click="save"]');
        expect(submitButton.exists()).toBe(true);
    });
});

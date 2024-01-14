import { shallowMount } from '@vue/test-utils';
import PatientTableView from '@/views/PatientTableView.vue';
import { describe, it, expect } from "vitest";

describe('PatientTableView.vue', () => {
    it('renders patient table correctly', () => {
        const patients = [
            { id: 1, name: 'test_pat', birthdate: '1990-03-06', telNum: '1234567890', healthCondition: 'so baaaddd' },
        ];
        const wrapper = shallowMount(PatientTableView, {
            data() {
                return { patients };
            }
        });

        expect(wrapper.findAll('tr').length).toBe(patients.length);
    });
});

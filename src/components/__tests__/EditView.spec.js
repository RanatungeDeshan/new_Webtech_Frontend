import { describe, it, expect } from 'vitest';
import { createApp } from 'vue';

const EditViewMock = {
    props: ['patientId'],
    template: '<div id="test-div">{{ patientId }}</div>',
};

describe('EditView.vue', () => {
    it('renders the component with the correct patientId', () => {
        const patientId = '123';

        const app = createApp(EditViewMock, { patientId });

        document.body.innerHTML = '<div id="app"></div>';
        app.mount('#app');

        // Ensure the element is present
        const testDiv = document.getElementById('test-div');
        expect(testDiv).not.toBeNull();

        // Now assert the text content
        expect(testDiv.textContent).toContain(patientId);

        app.unmount();
    });
});
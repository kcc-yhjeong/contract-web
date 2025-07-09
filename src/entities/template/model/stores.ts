import { create } from 'zustand';

import { TemplateStore } from './types';

export const useTemplateStore = create<TemplateStore>(set => ({
    template: null,
    setTemplate: template =>
        set(state => ({
            template: typeof template === 'function' ? template(state.template) : template,
        })),
}));

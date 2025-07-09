import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { useFieldStore, useFollowinguseFieldStore } from '@/entities/field';
import { useGetTemplate } from '@/entities/template/model/queries';
import { FollowingField } from '@/features/field/add-field';
import { EditorLayout, useInitializeEditor } from '@/widgets/editor-layout';

import { TemplateFooter } from './template-footer';
import { TemplateSidebar } from './template-sidebar';

export function EditTemplate() {
    const { id } = useParams();
    const { data: template } = useGetTemplate(id ?? '');
    const { initializeTemplate } = useInitializeEditor();

    useEffect(() => {
        if (template) {
            initializeTemplate(template);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [template]);

    const addField = useFieldStore(state => state.addField);

    const handlePageClick = ({ page, x, y }: { page: number; x: number; y: number }) => {
        const { type, signerId, clearFollowingField } = useFollowinguseFieldStore.getState();
        if (!type || !signerId) return;
        addField({
            type,
            signerId,
            page,
            x,
            y,
        });
        clearFollowingField();
    };

    return (
        <>
            <EditorLayout
                fileId={template?.templateFileId}
                onPageClick={handlePageClick}
                header={<span className="text-2xl font-bold text-white">템플릿 설정</span>}
                sidebar={<TemplateSidebar />}
                footer={<TemplateFooter />}
            />
            <FollowingField />
        </>
    );
}

import { ChartAreaInteractive } from '@/features/demo/ui/chart-area-interactive';
import { DataTable } from '@/features/demo/ui/data-table';
import { SectionCards } from '@/features/demo/ui/section-cards';

import data from '../model/data.json';

export const Demo = () => {
    return (
        <>
            <SectionCards />
            <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
        </>
    );
};

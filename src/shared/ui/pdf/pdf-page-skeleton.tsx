function PdfPageSkeleton() {
    return (
        <div className="w-[80dvw] max-w-[600px] h-full bg-white p-8 shadow-lg z-50 mx-auto overflow-hidden flex flex-col ">
            <div className="flex-1 overflow-y-hidden space-y-10">
                <div>
                    <div className="h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </div>
                <div className="space-y-6">
                    <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div>
                                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
                                <div className="h-16 bg-gray-200 rounded border-2 border-dashed border-gray-300 animate-pulse"></div>
                            </div>
                            <div>
                                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
                                <div className="h-16 bg-gray-200 rounded border-2 border-dashed border-gray-300 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3 mt-6">
                        <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    </div>
                    <div className="space-y-3 mt-6">
                        <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    </div>
                </div>
            </div>
            <div className="h-20 mt-4 bg-gray-100 rounded flex items-center justify-between px-6">
                <div className="flex flex-col gap-2 flex-1">
                    <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="flex-1 flex justify-end">
                    <div className="h-12 w-40 bg-gray-200 rounded border-2 border-dashed border-gray-300 animate-pulse" />
                </div>
            </div>
        </div>
    );
}

export { PdfPageSkeleton };

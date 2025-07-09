const Z_INDEX = {
    NORMAL: 10,
    DROPDOWN: 20, // 드롭다운, 팝오버
    MODAL: 30, // 모달, 다이얼로그
    LAYOUT: 40, //레이아웃
    OVERLAY: 50, // 로딩, 오버레이
} as const;

export const Z_INDEX_CLASS = {
    NORMAL: `z-${Z_INDEX.NORMAL}`,
    DROPDOWN: `z-${Z_INDEX.DROPDOWN}`,
    MODAL: `z-${Z_INDEX.MODAL}`,
    LAYOUT: `z-${Z_INDEX.LAYOUT}`,
    OVERLAY: `z-${Z_INDEX.OVERLAY}`,
} as const;

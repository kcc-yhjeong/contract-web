const COMMON_RESIZE_HANDLE_STYLE = {
    position: 'absolute' as const,
    boxSizing: 'border-box' as const,
    width: '8px',
    height: '8px',
    border: '1px solid rgb(34, 56, 103)',
    backgroundColor: 'rgb(244, 245, 247)',
};

export const RESIZE_HANDLE_STYLE = {
    bottom: { borderBottom: '2px dashed #959595' },
    bottomLeft: { ...COMMON_RESIZE_HANDLE_STYLE, bottom: '-8px', left: '-8px' },
    bottomRight: { ...COMMON_RESIZE_HANDLE_STYLE, bottom: '-8px', right: '-8px' },
    left: { borderLeft: '2px dashed #959595' },
    right: { borderRight: '2px dashed #959595' },
    top: { borderTop: '2px dashed #959595' },
    topLeft: { ...COMMON_RESIZE_HANDLE_STYLE, top: '-8px', left: '-8px' },
    topRight: { ...COMMON_RESIZE_HANDLE_STYLE, top: '-8px', right: '-8px' },
};

'use client';

type CopyToClipboardProviderProps = {
    children: (props: {copyFn: () => void}) => React.ReactNode;
    code: string;
};

/**
 * The purpose is to be a client component that provides a copy function
 * to its (server or client) children.
 */
export const CopyToClipboardProvider = ({children, code}: CopyToClipboardProviderProps) => {
    const copyCodeClipboard = () => {
        navigator.clipboard.writeText(code);
    };
    return <>{children?.({copyFn: copyCodeClipboard})}</>;
};

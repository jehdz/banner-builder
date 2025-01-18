import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from "@/components/ui/button";

import {Copy, Check} from 'lucide-react';


const CodeDisplay = ({ markup }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        if (markup) {
            navigator.clipboard.writeText(markup).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    return (
        <div className="space-y-4 my-4">
            <Button onClick={handleCopy}>
                {copied ? (
                    <Check />
                ) : (
                    <Copy />
                )}
                Copy
            </Button>
            <div>
                {markup ? (
                    <SyntaxHighlighter language="html" style={oneDark}>
                        {markup}
                    </SyntaxHighlighter>
                ) : (
                    <div>{markup}</div>
                )}
            </div>
        </div>

    );
};

export default CodeDisplay;

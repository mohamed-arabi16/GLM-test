'use client';

import { useEffect } from 'react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html>
            <body>
                <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
                        <button
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                            onClick={() => reset()}
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}

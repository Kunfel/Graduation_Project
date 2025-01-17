import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
    return (
        <div className={cn('animate-spin', className)}>
            {/* Add your spinner SVG or use an existing icon */}
        </div>
    );
}
const StepsIcon = ({ size = 24, color = "#292D32", strokeWidth = 1.5, className = "" }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* First Step */}
            <circle
                cx="7"
                cy="7"
                r="2.5"
                stroke={color}
                strokeWidth={strokeWidth}
            />

            {/* Second Step */}
            <circle
                cx="17"
                cy="12"
                r="2.5"
                stroke={color}
                strokeWidth={strokeWidth}
            />

            {/* Third Step */}
            <circle
                cx="7"
                cy="17"
                r="2.5"
                stroke={color}
                strokeWidth={strokeWidth}
            />

            {/* Connecting Lines */}
            <path
                d="M9.5 7H14.5"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
            />
            <path
                d="M9.5 17H14.5"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
            />
        </svg>
    );
};

export default StepsIcon;
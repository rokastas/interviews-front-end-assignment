export const FullStar: React.FC<{ index: number }> = ({ index }) => (
  <svg
    key={`full-${index}`}
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="gray"
    stroke="gray"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
    />
  </svg>
);

export const HalfStar: React.FC = () => (
  <svg
    key="half"
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="gray"
    stroke="gray"
  >
    <defs>
      <linearGradient id="halfGrad">
        <stop offset="50%" stopColor="gray" />
        <stop offset="50%" stopColor="white" stopOpacity="1" />
      </linearGradient>
    </defs>
    <path
      fill="url(#halfGrad)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
    />
  </svg>
);

export const EmptyStar: React.FC<{ index: number }> = ({ index }) => (
  <svg
    key={`empty-${index}`}
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="gray"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
    />
  </svg>
);

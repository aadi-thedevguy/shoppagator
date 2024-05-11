import { Star, StarHalf } from "lucide-react";
import { FC } from "react";

type Props = {
  rating: number;
};

const Rating: FC<Props> = ({ rating = 0 }) => {
  const fullStars = Math.floor(rating);
  const decimalPart = rating - fullStars;

  const fullStarElements = Array(fullStars).fill(<Star />);

  let halfStarElement = null;

  if (decimalPart > 0) {
    halfStarElement = <StarHalf />;
  }

  return (
    <>
      {fullStarElements} {halfStarElement}
    </>
  );
};

export default Rating;

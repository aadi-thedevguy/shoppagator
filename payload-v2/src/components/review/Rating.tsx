import { Star, StarHalf } from "lucide-react";
import { FC } from "react";

type Props = {
  rating: number;
};

const Rating: FC<Props> = ({ rating }) => {
  if (!rating) rating = 0;
  const fullStars = Math.floor(rating);
  const decimalPart = rating - fullStars;

  const fullStarElements = Array(fullStars)
    .fill("")
    .map((_, i) => <Star strokeWidth={0} fill="orange" key={i} />);

  let halfStarElement = null;

  if (decimalPart > 0) {
    halfStarElement = <StarHalf strokeWidth={0} fill="orange" />;
  }

  return (
    <>
      {fullStarElements} {halfStarElement}
    </>
  );
};

export default Rating;

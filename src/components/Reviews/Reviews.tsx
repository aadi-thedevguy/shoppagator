import Rating from "@/components/Reviews/Rating";

type Review = {
  _id: string;
  text: string;
  userRating: number;
  username: string;
};

const Review = () => {
  const reviews: Review[] = [];

  return (
    <>
      {reviews &&
        reviews.map((review) => (
          <div
            className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg"
            key={review._id}
          >
            <div className="font-semibold mb-2 flex">
              <p>{review.username}</p>
              <div className="ml-4 flex items-center text-tertiary-light text-lg">
                <Rating rating={review.userRating} />
              </div>
            </div>

            <p>{review.text}</p>
          </div>
        ))}
    </>
  );
};

export default Review;

import Rating from "@/components/review/Rating";
import { UserCheck } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Review } from "@/payload-types";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";

type ReviewProps = {
  productId: string;
  averageRating: number;
  reviews: Review[];
  ratingCounts: Record<number, number>;
};

const Reviews = async ({
  productId,
  averageRating,
  reviews,
  ratingCounts,
}: ReviewProps) => {
  const cookieSession = cookies();
  const { user } = await getServerSideUser(cookieSession);
  return (
    <>
      <div
        id="review"
        className="px-4 grid gap-8 lg:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        <div>
          <h3 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Customer Reviews
          </h3>
          <div className="mt-3 flex px-4">
            <Rating rating={averageRating} />
            <p className="font-medium">{averageRating} out of 5</p>
          </div>
          <p className="text-muted-foreground text-sm my-2 px-4">
            {reviews.length} people loved this product!
          </p>
          <div className="bg-zinc-50 mb-6 bg-gradient-to-br bg-opacity-90 w-fit p-4 rounded-md">
            {Object.entries(ratingCounts).map(([key, value]) => (
              <div className="flex items-center my-2" key={key}>
                <Rating rating={averageRating} />
                <p className="text-muted-foreground">{value} Rating(s)</p>
              </div>
            ))}
          </div>
          <hr />
          <h4 className="text-lg mt-4 font-semibold text-gray-900 ">
            Customer Reviews
          </h4>
          <p className="text-muted-foreground text-sm">
            Share your thoughts with other customers
          </p>
          <Button className="my-4">
            <Link
              href={
                user?.id
                  ? `/write-review/${productId}`
                  : `/sign-in?review&product=${productId}`
              }
            >
              Write a Review
            </Link>
          </Button>
        </div>
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            What Our Customers Say
          </h3>

          {reviews &&
            reviews.map((review) => (
              <div className="p-4 rounded-lg" key={review.id}>
                <div className="font-semibold mb-2">
                  <p className="flex gap-2 items-center">
                    <UserCheck size={16} />
                    <span>{user?.name}</span>
                  </p>
                  <div className="ml-4 flex items-center text-primary text-lg">
                    <Rating rating={review.rating} />
                  </div>
                </div>

                <p>{review.comment}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Reviews;

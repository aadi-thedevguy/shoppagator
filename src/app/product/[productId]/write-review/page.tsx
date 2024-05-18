import ReviewForm from "@/components/review/ReviewForm";
import { cookies } from "next/headers";
import { getServerSideUser } from "@/lib/payload-utils";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { productId: string } }) => {
  const { user } = await getServerSideUser(cookies());
  if (!user) {
    redirect(`/sign-in?review&product=${params.productId}`);
  }
  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center mb-8 lg:px-0">
        <ReviewForm user={user} product={params.productId} />
      </div>
    </>
  );
};

export default page;

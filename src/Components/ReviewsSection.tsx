import { reviews } from '../data/reviews';

const ReviewsSection = () => {
  return (
    <div className='mx-4'>
           <div className="mt-12">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Reviews</h2>
  <div className="space-y-4">
    {reviews.map((review) => (
      <div key={review.id} className="border-b pb-4">
        <p className="text-sm text-gray-700"><strong>{review.user}</strong> ⭐ {review.rating}/5</p>
        <p className="text-gray-600 text-sm">{review.comment}</p>
      </div>
    ))}
  </div>
</div>
    </div>
  )
}

export default ReviewsSection

import { Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 card-hover">
      <Quote className="h-8 w-8 text-secondary-400 mb-4" />
      <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
      <div className="flex items-center">
        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-lg">
          {testimonial.name.charAt(0)}
        </div>
        <div className="ml-3">
          <p className="font-semibold text-gray-900">{testimonial.name}</p>
          <p className="text-sm text-gray-600">{testimonial.business}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

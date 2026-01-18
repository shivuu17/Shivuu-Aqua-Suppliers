import { Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="glass-card rounded-2xl p-6 soft-shadow card-hover h-full flex flex-col">
      <Quote className="h-8 w-8 text-secondary-400 mb-4" />
      <p className="text-gray-700 mb-6 italic flex-1">"{testimonial.text}"</p>
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

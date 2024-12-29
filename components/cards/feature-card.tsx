import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<IFeatureCardProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="group flex items-center bg-gray-200 py-6 px-4 rounded-lg shadow-sm">
      <Icon className="w-10 h-10 mr-4 text-primary group-hover:scale-125 transition-transform duration-300" />
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-semibold text-gray-800 font-playfair">
          {title}
        </h3>
        <p className="text-sm text-gray-500 font-noto">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;

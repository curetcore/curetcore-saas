'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const ratings = [
  { stars: 5, count: 456, percentage: 68 },
  { stars: 4, count: 123, percentage: 18 },
  { stars: 3, count: 67, percentage: 10 },
  { stars: 2, count: 20, percentage: 3 },
  { stars: 1, count: 7, percentage: 1 },
];

export function CustomerSatisfaction() {
  const totalReviews = ratings.reduce((sum, item) => sum + item.count, 0);
  const averageRating = ratings.reduce((sum, item) => sum + (item.stars * item.count), 0) / totalReviews;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Satisfacción del Cliente</CardTitle>
        <CardDescription>Basado en {totalReviews} reseñas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-500 mb-2">{averageRating.toFixed(1)}</div>
            <div className="flex items-center justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(averageRating)
                      ? 'fill-yellow-500 text-yellow-500'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          {ratings.map((rating) => (
            <div key={rating.stars} className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 w-16">
                <span className="text-sm font-medium">{rating.stars}</span>
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              </div>
              <div className="flex-1">
                <Progress value={rating.percentage} className="h-2" />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                {rating.percentage}%
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              +0.3 puntos vs. mes anterior
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
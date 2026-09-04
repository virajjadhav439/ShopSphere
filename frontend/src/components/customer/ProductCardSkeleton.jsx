import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      {/* Image */}
      <Skeleton className="w-full aspect-square" />

      {/* Product Information */}
      <CardContent className="p-4">
        {/* Product name */}
        <Skeleton className="h-6 w-3/4" />

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-12" />
        </div>

        {/* Price */}
        <Skeleton className="h-7 w-24 mt-4" />
      </CardContent>

      {/* Button */}
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
};

export default ProductCardSkeleton;
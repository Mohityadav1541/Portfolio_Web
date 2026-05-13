import { forwardRef, type ImgHTMLAttributes } from 'react'
import { cn } from '@/lib/utils';
import './image.css'

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fittingType?: string;
  originWidth?: number;
  originHeight?: number;
  focalPointX?: number;
  focalPointY?: number;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ className, fittingType, originWidth, originHeight, focalPointX, focalPointY, ...props }, ref) => {
    return (
      <img
        ref={ref}
        className={cn('inline-block relative object-cover', className)}
        {...props}
      />
    )
  }
)
Image.displayName = 'Image'

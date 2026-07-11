'use client'
import { Button } from '@/components/ui/button';
import { CheckCircle2, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useRef } from 'react'

    
export type prop =  { id: number, name: string, text: string }

export default function ReviwesCarosoul({reviwes}:{reviwes:prop[]}) {
  const carouselRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("DoctorInsights");
  
   const scrollCarousel = (direction: "right" | "left") => {
      if (carouselRef.current) {
        const scrollAmount = 340; 
        const sign = direction === "left" ? -1 : 1;
        carouselRef.current.scrollBy({ left: sign * scrollAmount, behavior: "smooth" });
      }
    };

  return (
    <div className="space-y-4 md:space-y-6 pt-2">
          
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end px-2 gap-4">
            <h4 className="font-heading font-bold text-xl md:text-2xl text-text-title">
              {t("reviewsTitle")} <span className="text-base md:text-lg font-normal text-text-muted">({reviwes.length})</span>
            </h4>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => scrollCarousel("right")}
                className="rounded-full w-10 h-10 border-border-light text-text-muted hover:text-primary hover:border-primary transition-colors"
              >
                <ChevronRight className="w-5 h-5 rtl:rotate-180" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => scrollCarousel("left")}
                className="rounded-full w-10 h-10 border-border-light text-text-muted hover:text-primary hover:border-primary transition-colors"
              >
                <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
              </Button>
            </div>
          </div>

          <div className="relative w-full">
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto gap-4 md:gap-6 pb-6 pt-2 px-1 snap-x snap-mandatory" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style dangerouslySetInnerHTML={{__html: `::-webkit-scrollbar { display: none; }`}} />
              
              {reviwes.map((review) => (
                <div 
                  key={review.id} 
                  className="min-w-[280px] sm:min-w-[320px] max-w-[280px] sm:max-w-[320px] snap-center bg-white border border-border-light p-5 md:p-6 rounded-3xl shadow-sm flex flex-col gap-4 shrink-0 transition-transform hover:-translate-y-1 duration-300"
                >
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 bg-primary/10 flex justify-center items-center rounded-2xl text-primary font-bold text-lg shrink-0">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm md:text-base font-bold text-text-title">
                        {review.name}
                      </p>
                      <p className="text-[11px] md:text-xs text-success flex items-center gap-1 mt-0.5 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {t("verifiedPatient")}
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative bg-bg-main p-4 rounded-2xl rounded-tr-sm text-sm text-text-muted leading-relaxed flex-1 border border-border-light">
                    <Quote className="w-4 h-4 text-border-main absolute -top-2 -right-2 bg-white rotate-180" />
                    &quot;{review.text}&quot;
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
  )
}

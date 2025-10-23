import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

type Service = {
  title: string | null;
  shortDescription?: string | null;
  icon?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
    };
    hotspot?: unknown;
    crop?: unknown;
    _type: "image";
  } | null;
  features?: (string | null)[] | null;
  pricing?: {
    startingPrice?: number | null;
    priceType?: string | null;
    description?: string | null;
  } | null;
  timeline?: string | null;
};

export type FeaturedServicesGridProps = {
  services: Service[];
};

export function FeaturedServicesGrid({ services }: FeaturedServicesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {services.map((service, index) => (
        <ServiceFeature key={service.title} service={service} index={index} />
      ))}
    </div>
  );
}

const ServiceFeature = ({
  service,
  index,
}: {
  service: Service;
  index: number;
}) => {
  const { title, shortDescription, icon, features, pricing, timeline } =
    service;

  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800",
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}

      {/* Icon */}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon ? (
          <div className="relative w-8 h-8">
            <Image
              src={urlFor(icon).width(32).height(32).url()}
              alt={title || "Service"}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded" />
        )}
      </div>

      {/* Title */}
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10 mb-4">
        {shortDescription}
      </p>

      {/* Features (show first 2-3) */}
      {features && features.length > 0 && (
        <div className="relative z-10 px-10 mb-3">
          <ul className="space-y-1 text-xs text-neutral-500 dark:text-neutral-400">
            {features.slice(0, 3).map(
              (feature) =>
                feature && (
                  <li
                    key={`${title || "service"}-${feature.slice(0, 20)}`}
                    className="flex items-start gap-1"
                  >
                    <span className="text-blue-500 mt-0.5">✓</span>
                    <span className="line-clamp-1">{feature}</span>
                  </li>
                ),
            )}
          </ul>
        </div>
      )}

      {/* Pricing or Timeline */}
      {(pricing || timeline) && (
        <div className="relative z-10 px-10 mt-auto pt-2 border-t border-neutral-200 dark:border-neutral-700">
          {pricing &&
            pricing.priceType !== "custom" &&
            pricing.startingPrice && (
              <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                From ${pricing.startingPrice}
              </div>
            )}
          {pricing && pricing.priceType === "custom" && (
            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              Custom Quote
            </div>
          )}
          {timeline && (
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              {timeline}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

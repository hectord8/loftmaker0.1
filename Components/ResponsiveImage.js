import Image from "next/image";

export default function ResponsiveImage({large , medium, small }) {
  return (
    <picture>
      <source media="(max-width: 640px)" srcSet={small} />
      <source media="(max-width: 1024px)" srcSet={medium} />
    
      <Image
        src={large}
        alt="Hero"
        fill
        sizes="100vw"
        style={{ objectFit: 'fill' }} 
      />
    </picture>
  );
}

import Image from "next/image";

const ContentSection = ({ title, children, imageSrc, imageAlt, imagePosition = "before" }) => {
    return (
        <section className="text-center mb-10">
            {title && (
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{title}</h2>
            )}

            {imagePosition === "before" && imageSrc && imageAlt && (
                <div className="relative w-full max-w-3xl mx-auto mb-10">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        width={1200}
                        height={600}
                        className="rounded-lg shadow-xl object-cover"
                        priority
                    />
                </div>
            )}

            {children && (
                <div className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">{children}</div>
            )}

            {imagePosition === "after" && imageSrc && imageAlt && (
                <div className="relative w-full max-w-3xl mx-auto mb-10">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        width={1200}
                        height={600}
                        className="rounded-lg shadow-xl object-cover"
                        priority
                    />
                </div>
            )}
        </section>
    );
};

export default ContentSection;
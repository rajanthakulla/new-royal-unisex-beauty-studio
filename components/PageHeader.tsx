import Image from "next/image";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  label?: string;
  bgImage?: string;
}

export default function PageHeader({ 
  title, 
  subtitle, 
  label = "REFINEMENT & CARE", 
  bgImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuBAYtcgCEq2X3hpdQg_NhzyJCqRMqR410mson_ZNh00a6mUIQtIrer35_djEolhvAQ8zqTxczGnIWnTgidFHu117Y4pHfr1yedPssAcrqaVE3NNGjGRle7Qx5ZRDNE4FQ7NaBcIwBFJncnGXiWMErDn_f1dtBMcakpHPKvzH9acnYaIN6aYUIxnN-gdLRJpog1ZD0bcClGQzbfwc8PfMkiFkvkjb3aVgs0J00EyUj64XcrZnNyZW0S5kjEseFCDDGWGSCDdiFG-Vbs" 
}: PageHeaderProps) {
  return (
    <section className="relative h-[420px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image 
          alt={title} 
          src={bgImage}
          fill
          className="object-cover opacity-25 grayscale-[0.2]"
          priority
        />
      </div>
      <div className="relative z-10 text-center px-6 max-w-3xl space-y-4 pt-16">
        <span className="text-[12px] font-label-md uppercase tracking-[0.15em] text-[#745a32] block font-bold">
          {label}
        </span>
        <h1 className="font-display-lg text-[36px] md:text-[48px] text-on-surface leading-tight font-semibold">
          {title}
        </h1>
        {subtitle && (
          <p className="font-body-lg text-[16px] text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

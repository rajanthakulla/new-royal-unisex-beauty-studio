"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

interface FAQAccordionsProps {
  sections: FAQSection[];
}

export default function FAQAccordions({ sections }: FAQAccordionsProps) {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);

  const toggleAccordion = (sectionIdx: number, itemIdx: number) => {
    const key = `${sectionIdx}-${itemIdx}`;
    setActiveIndex(activeIndex === key ? null : key);
  };

  return (
    <div className="space-y-12">
      {sections.map((section, sIdx) => (
        <div key={sIdx} className="border-b border-[#d0c4bd]/40 pb-8">
          <h2 className="text-[11px] font-label-md uppercase tracking-widest text-[#745a32] mb-6 font-bold">
            {section.title}
          </h2>
          
          <div className="space-y-2">
            {section.items.map((item, iIdx) => {
              const isOpen = activeIndex === `${sIdx}-${iIdx}`;
              return (
                <div 
                  key={iIdx} 
                  className="bg-white rounded-2xl border border-primary-container/5 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleAccordion(sIdx, iIdx)}
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none hover:bg-surface-container-low transition-colors"
                  >
                    <span className="font-display-lg text-lg font-bold text-on-surface hover:text-[#745a32] transition-colors">
                      {item.question}
                    </span>
                    <span className={`material-symbols-outlined transition-transform duration-300 text-[#7f756f] ${isOpen ? "rotate-180" : ""}`}>
                      expand_more
                    </span>
                  </button>
                  
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden`}
                    style={{
                      maxHeight: isOpen ? "300px" : "0px",
                      opacity: isOpen ? 1 : 0
                    }}
                  >
                    <p className="font-body-md text-[14px] text-on-surface-variant p-6 pt-0 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

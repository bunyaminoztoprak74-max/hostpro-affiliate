interface FAQItem {
  question: string
  answer: string
}

export default function FAQSection({ faqs }: { faqs: FAQItem[] }) {
  if (faqs.length === 0) return null

  return (
    <section className="mt-12 border-t border-gray-100 pt-10">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group border border-gray-200 rounded-xl overflow-hidden"
          >
            <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 transition-colors list-none select-none">
              <span>{faq.question}</span>
              <span className="text-indigo-400 flex-shrink-0 transition-transform group-open:rotate-180 text-lg leading-none">
                ▾
              </span>
            </summary>
            <div className="px-5 pb-5 text-gray-600 leading-relaxed text-sm border-t border-gray-100">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}

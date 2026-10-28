"use client";

import { INDUSTRIES, OTHER_INDUSTRY_ID } from "@/lib/benchmarks/industries";
import { CUSTOM_TEXT_MAX } from "@/lib/calculators/validations";
import { Field, describedBy, inputClass } from "./ui";

export default function IndustrySelector({
  industryId,
  customIndustry,
  error,
  customError,
  onIndustry,
  onCustom,
  onBlurCustom,
}: {
  industryId: string;
  customIndustry: string;
  error?: string;
  customError?: string;
  onIndustry: (id: string) => void;
  onCustom: (value: string) => void;
  onBlurCustom: () => void;
}) {
  const isOther = industryId === OTHER_INDUSTRY_ID;
  return (
    <div className="space-y-4">
      <Field id="calc-industry" label="What industry is your business in?" error={error} required>
        <select
          {...describedBy("calc-industry", error)}
          value={industryId}
          onChange={(e) => onIndustry(e.target.value)}
          className={`${inputClass} select-chevron appearance-none`}
        >
          <option value="" disabled>
            Select your industry
          </option>
          {INDUSTRIES.map((i) => (
            <option key={i.id} value={i.id}>
              {i.name}
            </option>
          ))}
        </select>
      </Field>

      {isOther && (
        <Field
          id="calc-custom-industry"
          label="Enter your industry"
          error={customError}
          hint={`Up to ${CUSTOM_TEXT_MAX} characters. We'll ask for your own assumptions, because no published benchmark matches a custom industry.`}
          required
        >
          <input
            {...describedBy("calc-custom-industry", customError, "hint")}
            type="text"
            required
            maxLength={CUSTOM_TEXT_MAX}
            value={customIndustry}
            onChange={(e) => onCustom(e.target.value)}
            onBlur={onBlurCustom}
            placeholder="e.g. Solar Installation, Furniture Manufacturing, Pet Services"
            autoComplete="off"
            className={inputClass}
          />
        </Field>
      )}
    </div>
  );
}
